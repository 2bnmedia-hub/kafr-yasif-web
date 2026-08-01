import type { MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { getAllSlugs } from "@/content/registry";
import { db } from "@/db";
import { pages, news, tenders, events } from "@/db/schema";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kafr-yasif-web.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/news`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/events`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/events/archive`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const [allPages, publishedNews, publishedTenders, publishedEvents] = await Promise.all([
    db.select({ slug: pages.slug, published: pages.published, updatedAt: pages.updatedAt }).from(pages),
    db.select({ slug: news.slug, publishedAt: news.publishedAt }).from(news).where(eq(news.status, "published")),
    db.select({ slug: tenders.slug, updatedAt: tenders.updatedAt }).from(tenders).where(eq(tenders.status, "published")),
    db.select({ slug: events.slug }).from(events).where(eq(events.status, "published")),
  ]);

  // A slug can exist in the DB as a deliberately-unpublished draft (e.g. section-hub stubs
  // migrated with no real content yet) — exclude those from the legacy static registry too,
  // otherwise they'd be listed here and 404 for every visitor and search engine that follows them.
  const unpublishedSlugs = new Set(allPages.filter((p) => !p.published).map((p) => p.slug));
  const dbPages = allPages.filter((p) => p.published);

  const legacyPageEntries: MetadataRoute.Sitemap = getAllSlugs()
    .filter((slug) => !unpublishedSlugs.has(slug))
    .map((slug) => ({
      url: `${siteUrl}/${encodeURIComponent(slug)}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const dbPageEntries: MetadataRoute.Sitemap = dbPages.map((p) => ({
    url: `${siteUrl}/${encodeURIComponent(p.slug)}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const newsEntries: MetadataRoute.Sitemap = publishedNews.map((n) => ({
    url: `${siteUrl}/news/${encodeURIComponent(n.slug)}`,
    lastModified: n.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const tenderEntries: MetadataRoute.Sitemap = publishedTenders.map((t) => ({
    url: `${siteUrl}/tenders/${encodeURIComponent(t.slug)}`,
    lastModified: t.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const eventEntries: MetadataRoute.Sitemap = publishedEvents
    .filter((e): e is { slug: string } => !!e.slug)
    .map((e) => ({
      url: `${siteUrl}/events/${encodeURIComponent(e.slug)}`,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  // A page can exist both in the legacy static registry and as a migrated DB row under the same
  // slug (e.g. "מכרזים") — dedupe by URL, keeping the DB version since it carries a real lastModified.
  const dedupedByUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [...legacyPageEntries, ...dbPageEntries]) dedupedByUrl.set(entry.url, entry);

  return [...staticEntries, ...dedupedByUrl.values(), ...newsEntries, ...tenderEntries, ...eventEntries];
}
