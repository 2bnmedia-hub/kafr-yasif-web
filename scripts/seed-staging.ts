/**
 * One-directional content seed: production -> staging. Manual run only — never wired into any
 * automated pipeline, and there is no reverse direction.
 *
 * Usage:
 *   PRODUCTION_DATABASE_URL=... \
 *   STAGING_DATABASE_URL=... \
 *   STAGING_BLOB_READ_WRITE_TOKEN=... \
 *   STAGING_CONFIRM_TARGET=I-UNDERSTAND-THIS-WRITES-TO-STAGING \
 *   npx tsx scripts/seed-staging.ts --confirm
 *
 * WHAT THIS COPIES (public CMS content — no resident personal data, ever):
 *   pages, news (+ news_images), events (+ event_images), tenders (+ tender_documents), forms,
 *   departments, services, ticker_items, banners, site_settings, footer_links, media — plus the
 *   actual image/PDF bytes behind every Blob URL those rows reference, re-uploaded into the
 *   staging Blob store so nothing 404s.
 *
 * WHAT THIS NEVER COPIES, AND WHY:
 *   - form_submissions (public inquiries) — a resident's inquiry body is itself identifying even
 *     with the name/email stripped ("my water meter at unit 4B on <street> is broken since..."
 *     narrows to one household). Partial anonymization of free-text submissions is a known-broken
 *     pattern, not a safe middle ground. If inquiry data is needed to test the admin submissions
 *     UI, this script generates SYNTHETIC_INQUIRY_COUNT fake rows instead (see below) — real
 *     inquiries are never read from production at all, so there's nothing to leak.
 *   - form_rate_limits, page_views — operational/analytics logs, not content, not needed in
 *     staging, carry no upside for copying.
 *   - admin_users, admin_sessions, login_attempts, residents, resident_sessions — account
 *     credentials and session state. Staging accounts are created fresh via the invite flow
 *     (see C3), never copied from production.
 *
 * SAFETY GUARDS (a script that writes to the wrong database is worse than no script):
 *   1. Source and target must come from distinctly-named env vars (PRODUCTION_DATABASE_URL /
 *      STAGING_DATABASE_URL) — never the ambient DATABASE_URL, which in most local shells and in
 *      CI is production's, so a copy-paste mistake can't silently target it.
 *   2. Aborts if the two connection strings share a host (same physical database).
 *   3. Requires STAGING_CONFIRM_TARGET to equal an exact literal string — a second, unrelated
 *      value that a prod-URL copy-paste mistake wouldn't accidentally also satisfy.
 *   4. Requires the --confirm CLI flag; without it, prints what would happen and exits 0.
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

const REQUIRED_CONFIRM_TARGET = "I-UNDERSTAND-THIS-WRITES-TO-STAGING";
const SYNTHETIC_INQUIRY_COUNT = 25;

function hostOf(connectionString: string): string {
  try {
    return new URL(connectionString).host;
  } catch {
    return connectionString; // fall back to raw comparison if it's not a well-formed URL
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`✗ Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

async function main() {
  const confirmed = process.argv.includes("--confirm");

  const productionUrl = requireEnv("PRODUCTION_DATABASE_URL");
  const stagingUrl = requireEnv("STAGING_DATABASE_URL");
  const stagingBlobToken = requireEnv("STAGING_BLOB_READ_WRITE_TOKEN");
  const confirmTarget = requireEnv("STAGING_CONFIRM_TARGET");

  if (confirmTarget !== REQUIRED_CONFIRM_TARGET) {
    console.error(`✗ STAGING_CONFIRM_TARGET does not match the expected literal. Refusing to run.`);
    process.exit(1);
  }

  if (hostOf(productionUrl) === hostOf(stagingUrl)) {
    console.error(`✗ PRODUCTION_DATABASE_URL and STAGING_DATABASE_URL point at the same host (${hostOf(stagingUrl)}). Refusing to run.`);
    process.exit(1);
  }

  console.log(`Source (production, read-only): ${hostOf(productionUrl)}`);
  console.log(`Target (staging, will be written to): ${hostOf(stagingUrl)}`);

  if (!confirmed) {
    console.log("\nDry run only (pass --confirm to actually write). Would copy:");
    console.log("  pages, news, news_images, events, event_images, tenders, tender_documents,");
    console.log("  forms, departments, services, ticker_items, banners, site_settings,");
    console.log("  footer_links, media (+ re-upload every referenced Blob object to staging)");
    console.log(`  + ${SYNTHETIC_INQUIRY_COUNT} synthetic form_submissions rows (fake data, never from production)`);
    return;
  }

  const source = drizzle(neon(productionUrl), { schema });
  const target = drizzle(neon(stagingUrl), { schema });

  // --- 1. Copy Blob-backed media, rewriting URLs to the new staging store -------------------
  const { put } = await import("@vercel/blob");
  const urlRewrite = new Map<string, string>();

  async function copyBlobUrl(url: string | null | undefined): Promise<string | null | undefined> {
    if (!url || !url.includes(".public.blob.vercel-storage.com")) return url;
    if (urlRewrite.has(url)) return urlRewrite.get(url);

    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ! could not fetch ${url} (${res.status}), leaving reference as-is`);
      return url;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const pathname = new URL(url).pathname.replace(/^\//, "");
    const blob = await put(pathname, buffer, {
      access: "public",
      contentType: res.headers.get("content-type") ?? undefined,
      token: stagingBlobToken,
    });
    urlRewrite.set(url, blob.url);
    return blob.url;
  }

  console.log("\nCopying media...");
  const mediaRows = await source.select().from(schema.media);
  for (const row of mediaRows) {
    const newUrl = await copyBlobUrl(row.url);
    await target
      .insert(schema.media)
      .values({ ...row, url: newUrl ?? row.url })
      .onConflictDoNothing();
  }
  console.log(`  ${mediaRows.length} media row(s)`);

  // --- 2. Copy content tables, rewriting any inline Blob URLs (images[], ogImageUrl, etc.) --
  async function copyTable<T extends Record<string, unknown>>(
    label: string,
    table: Parameters<typeof target.insert>[0],
    rows: T[],
    urlFields: (keyof T)[] = []
  ) {
    for (const row of rows) {
      const patched = { ...row } as T;
      for (const field of urlFields) {
        const value = patched[field];
        if (typeof value === "string") {
          patched[field] = (await copyBlobUrl(value)) as T[typeof field];
        } else if (Array.isArray(value)) {
          patched[field] = (await Promise.all(value.map((u: string) => copyBlobUrl(u)))) as T[typeof field];
        }
      }
      await target.insert(table).values(patched).onConflictDoNothing();
    }
    console.log(`  ${rows.length} ${label} row(s)`);
  }

  console.log("\nCopying content tables...");
  await copyTable("pages", schema.pages, await source.select().from(schema.pages), ["images", "ogImageUrl"]);
  await copyTable("news", schema.news, await source.select().from(schema.news), ["imageUrl", "ogImageUrl"]);
  await copyTable("news_images", schema.newsImages, await source.select().from(schema.newsImages));
  await copyTable("events", schema.events, await source.select().from(schema.events), ["ogImageUrl"]);
  await copyTable("event_images", schema.eventImages, await source.select().from(schema.eventImages));
  await copyTable("tenders", schema.tenders, await source.select().from(schema.tenders), ["ogImageUrl"]);
  await copyTable("tender_documents", schema.tenderDocuments, await source.select().from(schema.tenderDocuments));
  await copyTable("forms", schema.forms, await source.select().from(schema.forms), ["externalUrl"]);
  await copyTable("departments", schema.departments, await source.select().from(schema.departments));
  await copyTable("services", schema.services, await source.select().from(schema.services), ["iconUrl"]);
  await copyTable("ticker_items", schema.tickerItems, await source.select().from(schema.tickerItems));
  await copyTable("banners", schema.banners, await source.select().from(schema.banners));
  await copyTable("site_settings", schema.siteSettings, await source.select().from(schema.siteSettings));
  await copyTable("footer_links", schema.footerLinks, await source.select().from(schema.footerLinks));

  // --- 3. Synthetic public-inquiry rows, entirely fabricated — never read from production ---
  console.log(`\nGenerating ${SYNTHETIC_INQUIRY_COUNT} synthetic public-inquiry rows...`);
  const departments = ["הנדסה ותכנון", "גזברות וגביה", "רווחה", "חינוך", "תברואה"];
  const subjects = ["בקשה למידע כללי", "תקלת תשתית", "בירור חיוב ארנונה", "בקשה לטופס", "פנייה כללית"];
  for (let i = 0; i < SYNTHETIC_INQUIRY_COUNT; i++) {
    await target.insert(schema.formSubmissions).values({
      formType: "public-inquiry",
      data: {
        fullName: `תושב בדיקה ${i + 1}`,
        email: `resident${i + 1}@example.com`,
        phone: `050000${String(1000 + i).slice(-4)}`,
        department: departments[i % departments.length],
        subject: subjects[i % subjects.length],
        attachment: null,
      },
    });
  }

  console.log("\n✓ Seed complete.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
