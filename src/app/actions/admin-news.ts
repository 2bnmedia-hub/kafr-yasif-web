"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and, sql } from "drizzle-orm";
import { db } from "@/db";
import { news, newsImages } from "@/db/schema";
import { sanitizeRichHtml } from "@/lib/sanitize-html";
import { uniqueSlug } from "@/lib/slugify";
import { assertContentMutationAllowed, requireCapability } from "@/lib/permissions";

function afterNewsChange() {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/admin/news");
}

export async function reorderNewsAction(orderedIds: number[]) {
  await requireCapability("content:edit");
  await Promise.all(orderedIds.map((id, position) => db.update(news).set({ sortOrder: position }).where(eq(news.id, id))));
  afterNewsChange();
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optionalStr(formData: FormData, key: string): string | null {
  const v = str(formData, key);
  return v || null;
}

function optionalDateTime(formData: FormData, key: string): Date | null {
  const v = str(formData, key);
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function newsFieldsFromForm(formData: FormData) {
  const tagsRaw = str(formData, "tags");
  return {
    title: str(formData, "title"),
    titleAr: optionalStr(formData, "titleAr"),
    titleEn: optionalStr(formData, "titleEn"),
    subtitle: str(formData, "subtitle"),
    subtitleAr: optionalStr(formData, "subtitleAr"),
    subtitleEn: optionalStr(formData, "subtitleEn"),
    excerpt: str(formData, "excerpt"),
    excerptAr: optionalStr(formData, "excerptAr"),
    excerptEn: optionalStr(formData, "excerptEn"),
    bodyHtml: sanitizeRichHtml(str(formData, "bodyHtml")),
    bodyHtmlAr: optionalStr(formData, "bodyHtmlAr") ? sanitizeRichHtml(str(formData, "bodyHtmlAr")) : null,
    bodyHtmlEn: optionalStr(formData, "bodyHtmlEn") ? sanitizeRichHtml(str(formData, "bodyHtmlEn")) : null,
    category: optionalStr(formData, "category"),
    tags: tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [],
    imageUrl: optionalStr(formData, "imageUrl"),
    variant: str(formData, "variant") || "logo",
    status: (str(formData, "status") || "published") as (typeof news.$inferInsert)["status"],
    scheduledAt: optionalDateTime(formData, "scheduledAt"),
    metaTitle: optionalStr(formData, "metaTitle"),
    metaDescription: optionalStr(formData, "metaDescription"),
    ogImageUrl: optionalStr(formData, "ogImageUrl"),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

type PendingGalleryItem = { mediaId: number; alt: string; kind: string };

function parsePendingGalleryItems(formData: FormData): PendingGalleryItem[] {
  const raw = str(formData, "pendingGalleryItems");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((it): it is PendingGalleryItem => it && typeof it.mediaId === "number")
      .map((it) => ({ mediaId: it.mediaId, alt: typeof it.alt === "string" ? it.alt : "", kind: typeof it.kind === "string" ? it.kind : "image" }));
  } catch {
    return [];
  }
}

export async function createNewsAction(formData: FormData) {
  const admin = await requireCapability("content:edit");
  const fields = await newsFieldsFromForm(formData);
  assertContentMutationAllowed(admin, { currentlyPublished: false, requestedPublished: fields.status === "published" });
  const existing = await db.select({ slug: news.slug }).from(news);
  const slug = uniqueSlug(fields.title, new Set(existing.map((r) => r.slug)));

  const pendingItems = parsePendingGalleryItems(formData);
  const pendingCoverMediaId = Number(formData.get("pendingCoverMediaId")) || null;
  const coverImageId =
    pendingCoverMediaId && pendingItems.some((it) => it.mediaId === pendingCoverMediaId)
      ? pendingCoverMediaId
      : pendingItems.find((it) => it.kind === "image")?.mediaId ?? null;

  const [row] = await db
    .insert(news)
    .values({ ...fields, slug, coverImageId, published: fields.status === "published" })
    .returning();

  if (pendingItems.length) {
    await db.insert(newsImages).values(
      pendingItems.map((it, index) => ({ newsId: row.id, mediaId: it.mediaId, alt: it.alt, sortOrder: index }))
    );
  }

  afterNewsChange();
  revalidatePath(`/news/${slug}`);
  redirect(`/admin/news/${row.id}?status=${fields.status === "published" ? "created" : "created_draft"}`);
}

export async function updateNewsAction(id: number, formData: FormData) {
  const admin = await requireCapability("content:edit");
  const fields = await newsFieldsFromForm(formData);
  const [current] = await db.select({ published: news.published }).from(news).where(eq(news.id, id)).limit(1);
  assertContentMutationAllowed(admin, {
    currentlyPublished: current?.published ?? false,
    requestedPublished: fields.status === "published",
  });
  const [updated] = await db
    .update(news)
    .set({ ...fields, published: fields.status === "published" })
    .where(eq(news.id, id))
    .returning({ slug: news.slug });
  afterNewsChange();
  if (updated) revalidatePath(`/news/${updated.slug}`);
  revalidatePath(`/admin/news/${id}`);
  redirect(`/admin/news/${id}?status=${fields.status === "published" ? "saved" : "saved_draft"}`);
}

export async function deleteNewsAction(id: number) {
  await requireCapability("content:delete");
  await db.delete(news).where(eq(news.id, id));
  afterNewsChange();
  redirect("/admin/news");
}

export async function togglePublishNewsAction(id: number, nextStatus: "published" | "hidden") {
  await requireCapability("content:publish");
  await db
    .update(news)
    .set({ status: nextStatus, published: nextStatus === "published" })
    .where(eq(news.id, id));
  afterNewsChange();
  revalidatePath(`/admin/news/${id}`);
}

export async function duplicateNewsAction(id: number) {
  await requireCapability("content:edit"); // always creates a new draft, never publishes
  const [source] = await db.select().from(news).where(eq(news.id, id)).limit(1);
  if (!source) redirect("/admin/news");

  const existing = await db.select({ slug: news.slug }).from(news);
  const slug = uniqueSlug(`${source.title}-עותק`, new Set(existing.map((r) => r.slug)));

  const [copy] = await db
    .insert(news)
    .values({
      slug,
      title: `${source.title} (עותק)`,
      titleAr: source.titleAr,
      titleEn: source.titleEn,
      subtitle: source.subtitle,
      subtitleAr: source.subtitleAr,
      subtitleEn: source.subtitleEn,
      excerpt: source.excerpt,
      excerptAr: source.excerptAr,
      excerptEn: source.excerptEn,
      bodyHtml: source.bodyHtml,
      bodyHtmlAr: source.bodyHtmlAr,
      bodyHtmlEn: source.bodyHtmlEn,
      category: source.category,
      tags: source.tags,
      imageUrl: source.imageUrl,
      variant: source.variant,
      status: "draft",
      published: false,
      metaTitle: source.metaTitle,
      metaDescription: source.metaDescription,
      ogImageUrl: source.ogImageUrl,
      sortOrder: source.sortOrder,
    })
    .returning();

  const sourceImages = await db.select().from(newsImages).where(eq(newsImages.newsId, id));
  if (sourceImages.length) {
    await db.insert(newsImages).values(
      sourceImages.map((img) => ({ newsId: copy.id, mediaId: img.mediaId, alt: img.alt, sortOrder: img.sortOrder }))
    );
  }

  afterNewsChange();
  redirect(`/admin/news/${copy.id}`);
}

export async function addNewsImageAction(formData: FormData) {
  await requireCapability("content:edit");
  const newsId = Number(formData.get("newsId"));
  const mediaId = Number(formData.get("mediaId"));
  const alt = str(formData, "alt");
  const kind = str(formData, "kind");

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(newsImages)
    .where(eq(newsImages.newsId, newsId));
  if (count >= 10) throw new Error("ניתן להעלות עד 10 קבצים לכתבה.");

  const [inserted] = await db.insert(newsImages).values({ newsId, mediaId, alt, sortOrder: count }).returning({ id: newsImages.id });

  if (count === 0 && kind === "image") {
    const [current] = await db.select({ coverImageId: news.coverImageId }).from(news).where(eq(news.id, newsId)).limit(1);
    if (current && !current.coverImageId) {
      await db.update(news).set({ coverImageId: mediaId }).where(eq(news.id, newsId));
    }
  }

  afterNewsChange();
  revalidatePath(`/admin/news/${newsId}`);
  return inserted;
}

export async function deleteNewsImageAction(newsId: number, imageId: number) {
  await requireCapability("content:edit");
  await db.delete(newsImages).where(and(eq(newsImages.id, imageId), eq(newsImages.newsId, newsId)));
  afterNewsChange();
  revalidatePath(`/admin/news/${newsId}`);
}

export async function setCoverImageAction(newsId: number, mediaId: number) {
  await requireCapability("content:edit");
  await db.update(news).set({ coverImageId: mediaId }).where(eq(news.id, newsId));
  afterNewsChange();
  revalidatePath(`/admin/news/${newsId}`);
}

export async function reorderNewsImageAction(newsId: number, imageId: number, direction: "up" | "down") {
  await requireCapability("content:edit");
  const images = await db.select().from(newsImages).where(eq(newsImages.newsId, newsId)).orderBy(newsImages.sortOrder);
  const idx = images.findIndex((i) => i.id === imageId);
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (idx === -1 || swapWith < 0 || swapWith >= images.length) return;

  const a = images[idx];
  const b = images[swapWith];
  await db.update(newsImages).set({ sortOrder: b.sortOrder }).where(eq(newsImages.id, a.id));
  await db.update(newsImages).set({ sortOrder: a.sortOrder }).where(eq(newsImages.id, b.id));
  afterNewsChange();
  revalidatePath(`/admin/news/${newsId}`);
}
