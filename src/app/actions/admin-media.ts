"use server";

import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { eq, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { media, pages, news, newsImages, events, eventImages, tenderDocuments, banners } from "@/db/schema";
import { validateUploadedFile, VALID_KIND_GROUPS, type UploadKind } from "@/lib/upload-validation";
import { requireCapability } from "@/lib/permissions";

/**
 * Called by UploadWidget right after a file finishes uploading directly to Vercel Blob (client-side,
 * bypassing the ~4.5MB Serverless Function body limit). We only need the first few KB of the blob to
 * sniff its real file type via magic bytes — not the whole file — so this stays cheap even for a 50MB PDF.
 */
export async function finalizeMediaUploadAction(input: {
  url: string;
  filename: string;
  group: "image" | "document" | "any";
  sizeBytes: number;
}): Promise<{ media: typeof media.$inferSelect } | { error: string }> {
  await requireCapability("media:upload");

  const allowedKinds: UploadKind[] = VALID_KIND_GROUPS[input.group] ?? VALID_KIND_GROUPS.any;

  let headBuffer: Buffer;
  try {
    const headResponse = await fetch(input.url, { headers: { Range: "bytes=0-4100" } });
    headBuffer = Buffer.from(await headResponse.arrayBuffer());
  } catch {
    await del(input.url).catch(() => {});
    return { error: "לא ניתן היה לאמת את הקובץ שהועלה. נסו שוב." };
  }

  const validation = await validateUploadedFile(headBuffer, input.filename, allowedKinds);
  if (!validation.ok) {
    await del(input.url).catch(() => {});
    return { error: validation.reason };
  }

  let width: number | undefined;
  let height: number | undefined;
  if (validation.kind === "image") {
    try {
      const fullResponse = await fetch(input.url);
      const fullBuffer = Buffer.from(await fullResponse.arrayBuffer());
      const sharp = (await import("sharp")).default;
      const meta = await sharp(fullBuffer).metadata();
      width = meta.width;
      height = meta.height;
    } catch {
      // Non-fatal — dimensions are informational only.
    }
  }

  const [row] = await db
    .insert(media)
    .values({
      filename: input.filename,
      url: input.url,
      kind: validation.kind,
      mimeType: validation.mimeType,
      sizeBytes: input.sizeBytes,
      width,
      height,
    })
    .returning();

  return { media: row };
}

/** Finds every place a given media row is referenced, across all content tables. */
export async function getMediaUsage(mediaId: number, mediaUrl: string) {
  await requireCapability("content:edit"); // exported "use server" action — needs its own gate, not just the deleteMediaAction caller's
  const usages: string[] = [];

  const pageRows = await db.select({ title: pages.title }).from(pages).where(sql`${pages.images} @> ${JSON.stringify([mediaUrl])}::jsonb`);
  usages.push(...pageRows.map((p) => `עמוד: ${p.title}`));

  const newsRows = await db
    .select({ title: news.title })
    .from(news)
    .where(or(eq(news.coverImageId, mediaId), eq(news.imageUrl, mediaUrl)));
  usages.push(...newsRows.map((n) => `כתבה: ${n.title}`));

  const newsImgRows = await db
    .select({ title: news.title })
    .from(newsImages)
    .innerJoin(news, eq(newsImages.newsId, news.id))
    .where(eq(newsImages.mediaId, mediaId));
  usages.push(...newsImgRows.map((n) => `גלריית כתבה: ${n.title}`));

  const eventRows = await db.select({ title: events.title }).from(events).where(eq(events.imageId, mediaId));
  usages.push(...eventRows.map((e) => `אירוע: ${e.title}`));

  const eventImgRows = await db
    .select({ title: events.title })
    .from(eventImages)
    .innerJoin(events, eq(eventImages.eventId, events.id))
    .where(eq(eventImages.mediaId, mediaId));
  usages.push(...eventImgRows.map((e) => `גלריית אירוע: ${e.title}`));

  const { tenders } = await import("@/db/schema");
  const tenderDocRows = await db
    .select({ title: tenders.title })
    .from(tenderDocuments)
    .innerJoin(tenders, eq(tenderDocuments.tenderId, tenders.id))
    .where(eq(tenderDocuments.mediaId, mediaId));
  usages.push(...tenderDocRows.map((t) => `מסמך מכרז: ${t.title}`));

  const bannerRows = await db.select({ title: banners.title }).from(banners).where(eq(banners.imageId, mediaId));
  usages.push(...bannerRows.map((b) => `באנר: ${b.title || "ללא כותרת"}`));

  return usages;
}

export async function deleteMediaAction(mediaId: number) {
  await requireCapability("content:delete");
  const [row] = await db.select().from(media).where(eq(media.id, mediaId)).limit(1);
  if (!row) return { error: "הקובץ לא נמצא." };

  const usages = await getMediaUsage(mediaId, row.url);
  if (usages.length > 0) {
    return { error: `לא ניתן למחוק — הקובץ בשימוש ב-${usages.length} מקומות: ${usages.slice(0, 3).join(", ")}${usages.length > 3 ? "..." : ""}` };
  }

  try {
    await del(row.url);
  } catch {
    // Already gone from storage — proceed with removing the DB record regardless.
  }
  await db.delete(media).where(eq(media.id, mediaId));
  revalidatePath("/admin/media");
  return { ok: true };
}
