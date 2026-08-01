import { eq, and, or, isNull, lte, desc, asc, sql, getTableColumns, inArray } from "drizzle-orm";
import { db } from "./index";
import { pages, news, newsImages, events, eventImages, siteSettings, footerLinks, tenders, tenderDocuments, media, tickerItems, forms } from "./schema";

export async function getPageBySlug(slug: string) {
  const rows = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
  return rows[0];
}

export async function getAllPageSlugs() {
  const rows = await db.select({ slug: pages.slug }).from(pages);
  return rows.map((r) => r.slug);
}

/** Falls back to each row's first uploaded gallery image when coverImageId wasn't set (e.g. older rows, or a gallery image added before a cover existed). */
async function fillMissingCoverUrls<T extends { id: number; coverUrl: string | null }>(rows: T[]): Promise<T[]> {
  const missingIds = rows.filter((r) => !r.coverUrl).map((r) => r.id);
  if (!missingIds.length) return rows;

  const fallbackImages = await db
    .select({ newsId: newsImages.newsId, url: media.url })
    .from(newsImages)
    .innerJoin(media, and(eq(newsImages.mediaId, media.id), eq(media.kind, "image")))
    .where(inArray(newsImages.newsId, missingIds))
    .orderBy(asc(newsImages.sortOrder));

  const firstByNewsId = new Map<number, string>();
  for (const row of fallbackImages) {
    if (!firstByNewsId.has(row.newsId)) firstByNewsId.set(row.newsId, row.url);
  }

  return rows.map((r) => (r.coverUrl ? r : { ...r, coverUrl: firstByNewsId.get(r.id) ?? null }));
}

/** Same fallback as fillMissingCoverUrls, but for events: uses the first uploaded gallery photo when no image was explicitly starred as the cover. */
async function fillMissingEventCoverUrls<T extends { id: number; coverUrl: string | null }>(rows: T[]): Promise<T[]> {
  const missingIds = rows.filter((r) => !r.coverUrl).map((r) => r.id);
  if (!missingIds.length) return rows;

  const fallbackImages = await db
    .select({ eventId: eventImages.eventId, url: media.url })
    .from(eventImages)
    .innerJoin(media, and(eq(eventImages.mediaId, media.id), eq(media.kind, "image")))
    .where(inArray(eventImages.eventId, missingIds))
    .orderBy(asc(eventImages.sortOrder));

  const firstByEventId = new Map<number, string>();
  for (const row of fallbackImages) {
    if (!firstByEventId.has(row.eventId)) firstByEventId.set(row.eventId, row.url);
  }

  return rows.map((r) => (r.coverUrl ? r : { ...r, coverUrl: firstByEventId.get(r.id) ?? null }));
}

export async function getPublishedNews() {
  const rows = await db
    .select({ ...getTableColumns(news), coverUrl: media.url })
    .from(news)
    .leftJoin(media, eq(news.coverImageId, media.id))
    .where(eq(news.status, "published"))
    .orderBy(news.sortOrder);

  return fillMissingCoverUrls(rows);
}

export async function getNewsBySlug(slug: string) {
  const rows = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
  return rows[0];
}

export async function getNewsGallery(newsId: number) {
  return db
    .select({ image: newsImages, media: media })
    .from(newsImages)
    .innerJoin(media, eq(newsImages.mediaId, media.id))
    .where(eq(newsImages.newsId, newsId))
    .orderBy(asc(newsImages.sortOrder));
}

export async function getPublishedEvents() {
  const rows = await db
    .select({ ...getTableColumns(events), coverUrl: media.url })
    .from(events)
    .leftJoin(media, eq(events.imageId, media.id))
    .where(eq(events.status, "published"))
    .orderBy(events.sortOrder);

  return fillMissingEventCoverUrls(rows);
}

export async function getEventBySlug(slug: string) {
  const rows = await db.select().from(events).where(eq(events.slug, slug)).limit(1);
  return rows[0];
}

export async function getPublishedForms() {
  return db
    .select({ ...getTableColumns(forms), fileUrl: media.url })
    .from(forms)
    .leftJoin(media, eq(forms.mediaId, media.id))
    .orderBy(asc(forms.sortOrder));
}

export async function getFormById(id: number) {
  const rows = await db
    .select({ ...getTableColumns(forms), fileName: media.filename, fileUrl: media.url })
    .from(forms)
    .leftJoin(media, eq(forms.mediaId, media.id))
    .where(eq(forms.id, id))
    .limit(1);
  return rows[0];
}

export async function getEventGallery(eventId: number) {
  return db
    .select({ image: eventImages, media: media })
    .from(eventImages)
    .innerJoin(media, eq(eventImages.mediaId, media.id))
    .where(eq(eventImages.eventId, eventId))
    .orderBy(asc(eventImages.sortOrder));
}

export async function getSiteSettings() {
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);
  return rows[0];
}

export async function getFooterLinks() {
  return db.select().from(footerLinks).orderBy(footerLinks.columnTitle, footerLinks.sortOrder);
}

// ---- Tenders ----

/** Published tenders whose scheduled publish time (if any) has already passed. */
async function fillMissingTenderCoverUrls<T extends { id: number; coverUrl: string | null }>(rows: T[]): Promise<T[]> {
  const missingIds = rows.filter((r) => !r.coverUrl).map((r) => r.id);
  if (!missingIds.length) return rows;

  const fallbackImages = await db
    .select({ tenderId: tenderDocuments.tenderId, url: media.url })
    .from(tenderDocuments)
    .innerJoin(media, and(eq(tenderDocuments.mediaId, media.id), eq(media.kind, "image")))
    .where(inArray(tenderDocuments.tenderId, missingIds))
    .orderBy(asc(tenderDocuments.sortOrder));

  const firstByTenderId = new Map<number, string>();
  for (const row of fallbackImages) {
    if (!firstByTenderId.has(row.tenderId)) firstByTenderId.set(row.tenderId, row.url);
  }

  return rows.map((r) => (r.coverUrl ? r : { ...r, coverUrl: firstByTenderId.get(r.id) ?? null }));
}

export async function getPublishedTenders() {
  const now = new Date();
  const rows = await db
    .select({ ...getTableColumns(tenders), coverUrl: media.url })
    .from(tenders)
    .leftJoin(media, eq(tenders.coverImageId, media.id))
    .where(and(eq(tenders.status, "published"), or(isNull(tenders.scheduledAt), lte(tenders.scheduledAt, now))))
    .orderBy(asc(tenders.sortOrder), desc(tenders.publishDate), desc(tenders.createdAt));

  return fillMissingTenderCoverUrls(rows);
}

export async function getTenderBySlug(slug: string) {
  const rows = await db.select().from(tenders).where(eq(tenders.slug, slug)).limit(1);
  return rows[0];
}

export async function getTenderById(id: number) {
  const rows = await db.select().from(tenders).where(eq(tenders.id, id)).limit(1);
  return rows[0];
}

export async function getTenderDocuments(tenderId: number) {
  return db
    .select({ doc: tenderDocuments, media: media })
    .from(tenderDocuments)
    .innerJoin(media, eq(tenderDocuments.mediaId, media.id))
    .where(eq(tenderDocuments.tenderId, tenderId))
    .orderBy(asc(tenderDocuments.sortOrder));
}

export async function getAllTenders() {
  return db.select().from(tenders).orderBy(asc(tenders.sortOrder), asc(tenders.id));
}

export async function getActiveTickerItems() {
  return db.select().from(tickerItems).where(eq(tickerItems.active, true)).orderBy(asc(tickerItems.sortOrder));
}

export async function incrementTenderViews(id: number) {
  await db
    .update(tenders)
    .set({ viewCount: sql`${tenders.viewCount} + 1` })
    .where(eq(tenders.id, id));
}
