"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and, sql } from "drizzle-orm";
import { db } from "@/db";
import { events, eventImages } from "@/db/schema";
import { sanitizeRichHtml } from "@/lib/sanitize-html";
import { uniqueSlug } from "@/lib/slugify";
import { assertContentMutationAllowed, requireCapability } from "@/lib/permissions";

function afterEventsChange() {
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
}

export async function reorderEventsAction(orderedIds: number[]) {
  await requireCapability("content:edit");
  await Promise.all(orderedIds.map((id, position) => db.update(events).set({ sortOrder: position }).where(eq(events.id, id))));
  afterEventsChange();
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optionalStr(formData: FormData, key: string): string | null {
  const v = str(formData, key);
  return v || null;
}

function optionalDate(formData: FormData, key: string): Date | null {
  const v = str(formData, key);
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtHebrewDate(d: Date | null): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("he-IL", { day: "numeric", month: "numeric" });
}

async function eventFieldsFromForm(formData: FormData) {
  const eventDate = optionalDate(formData, "eventDate");
  const openToPublic = formData.get("openToPublic") === "on";
  const registrationRequired = formData.get("registrationRequired") === "on";
  const capacityRaw = str(formData, "capacity");

  return {
    title: str(formData, "title"),
    titleAr: optionalStr(formData, "titleAr"),
    titleEn: optionalStr(formData, "titleEn"),
    subtitle: str(formData, "subtitle"),
    subtitleAr: optionalStr(formData, "subtitleAr"),
    subtitleEn: optionalStr(formData, "subtitleEn"),
    description: str(formData, "description"),
    descriptionAr: optionalStr(formData, "descriptionAr"),
    descriptionEn: optionalStr(formData, "descriptionEn"),
    bodyHtml: sanitizeRichHtml(str(formData, "bodyHtml")),
    bodyHtmlAr: optionalStr(formData, "bodyHtmlAr") ? sanitizeRichHtml(str(formData, "bodyHtmlAr")) : null,
    bodyHtmlEn: optionalStr(formData, "bodyHtmlEn") ? sanitizeRichHtml(str(formData, "bodyHtmlEn")) : null,
    eventDate,
    startTime: optionalStr(formData, "startTime"),
    endTime: optionalStr(formData, "endTime"),
    location: str(formData, "location"),
    address: str(formData, "address"),
    contactName: str(formData, "contactName"),
    contactPhone: optionalStr(formData, "contactPhone"),
    openToPublic,
    registrationRequired,
    registrationUrl: registrationRequired ? optionalStr(formData, "registrationUrl") : null,
    registrationPhone: registrationRequired ? optionalStr(formData, "registrationPhone") : null,
    registrationText: registrationRequired ? optionalStr(formData, "registrationText") : null,
    capacity: capacityRaw ? Number(capacityRaw) : null,
    status: (str(formData, "status") || "published") as (typeof events.$inferInsert)["status"],
    scheduledAt: optionalDate(formData, "scheduledAt"),
    metaTitle: optionalStr(formData, "metaTitle"),
    metaDescription: optionalStr(formData, "metaDescription"),
    ogImageUrl: optionalStr(formData, "ogImageUrl"),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    // Legacy fields kept in sync so the existing homepage EventsSection keeps working unmodified.
    startDate: fmtHebrewDate(eventDate),
    endDate: fmtHebrewDate(eventDate),
    note: openToPublic ? "פתוח לקהל הרחב" : registrationRequired ? "בהרשמה מראש" : "",
  };
}

export async function createEventAction(formData: FormData) {
  const admin = await requireCapability("content:edit");
  const fields = await eventFieldsFromForm(formData);
  assertContentMutationAllowed(admin, { currentlyPublished: false, requestedPublished: fields.status === "published" });
  const existing = await db.select({ slug: events.slug }).from(events);
  const slug = uniqueSlug(fields.title, new Set(existing.map((r) => r.slug).filter((s): s is string => !!s)));

  const [row] = await db
    .insert(events)
    .values({ ...fields, slug, published: fields.status === "published" })
    .returning();
  afterEventsChange();
  revalidatePath(`/events/${slug}`);
  redirect(`/admin/events/${row.id}?status=${fields.status === "published" ? "created" : "created_draft"}`);
}

export async function updateEventAction(id: number, formData: FormData) {
  const admin = await requireCapability("content:edit");
  const fields = await eventFieldsFromForm(formData);
  const [current] = await db.select({ published: events.published }).from(events).where(eq(events.id, id)).limit(1);
  assertContentMutationAllowed(admin, {
    currentlyPublished: current?.published ?? false,
    requestedPublished: fields.status === "published",
  });
  const [updated] = await db
    .update(events)
    .set({ ...fields, published: fields.status === "published" })
    .where(eq(events.id, id))
    .returning({ slug: events.slug });
  afterEventsChange();
  if (updated?.slug) revalidatePath(`/events/${updated.slug}`);
  revalidatePath(`/admin/events/${id}`);
  redirect(`/admin/events/${id}?status=${fields.status === "published" ? "saved" : "saved_draft"}`);
}

export async function deleteEventAction(id: number) {
  await requireCapability("content:delete");
  await db.delete(events).where(eq(events.id, id));
  afterEventsChange();
  redirect("/admin/events");
}

export async function togglePublishEventAction(id: number, nextStatus: "published" | "hidden") {
  await requireCapability("content:publish");
  await db
    .update(events)
    .set({ status: nextStatus, published: nextStatus === "published" })
    .where(eq(events.id, id));
  afterEventsChange();
  revalidatePath(`/admin/events/${id}`);
}

export async function duplicateEventAction(id: number) {
  await requireCapability("content:edit"); // always creates a new draft, never publishes
  const [source] = await db.select().from(events).where(eq(events.id, id)).limit(1);
  if (!source) redirect("/admin/events");

  const existing = await db.select({ slug: events.slug }).from(events);
  const slug = uniqueSlug(`${source.title}-עותק`, new Set(existing.map((r) => r.slug).filter((s): s is string => !!s)));

  const [copy] = await db
    .insert(events)
    .values({
      slug,
      title: `${source.title} (עותק)`,
      titleAr: source.titleAr,
      titleEn: source.titleEn,
      subtitle: source.subtitle,
      subtitleAr: source.subtitleAr,
      subtitleEn: source.subtitleEn,
      description: source.description,
      descriptionAr: source.descriptionAr,
      descriptionEn: source.descriptionEn,
      bodyHtml: source.bodyHtml,
      bodyHtmlAr: source.bodyHtmlAr,
      bodyHtmlEn: source.bodyHtmlEn,
      eventDate: source.eventDate,
      startTime: source.startTime,
      endTime: source.endTime,
      location: source.location,
      address: source.address,
      contactName: source.contactName,
      contactPhone: source.contactPhone,
      openToPublic: source.openToPublic,
      registrationRequired: source.registrationRequired,
      registrationUrl: source.registrationUrl,
      registrationPhone: source.registrationPhone,
      registrationText: source.registrationText,
      capacity: source.capacity,
      status: "draft",
      published: false,
      metaTitle: source.metaTitle,
      metaDescription: source.metaDescription,
      ogImageUrl: source.ogImageUrl,
      sortOrder: source.sortOrder,
      startDate: source.startDate,
      endDate: source.endDate,
      note: source.note,
    })
    .returning();

  const sourceImages = await db.select().from(eventImages).where(eq(eventImages.eventId, id));
  if (sourceImages.length) {
    await db.insert(eventImages).values(
      sourceImages.map((img) => ({ eventId: copy.id, mediaId: img.mediaId, alt: img.alt, sortOrder: img.sortOrder }))
    );
  }

  afterEventsChange();
  redirect(`/admin/events/${copy.id}`);
}

export async function addEventImageAction(formData: FormData) {
  await requireCapability("content:edit");
  const eventId = Number(formData.get("eventId"));
  const mediaId = Number(formData.get("mediaId"));
  const alt = str(formData, "alt");

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(eventImages)
    .where(eq(eventImages.eventId, eventId));
  if (count >= 10) throw new Error("ניתן להעלות עד 10 תמונות לאירוע.");

  await db.insert(eventImages).values({ eventId, mediaId, alt, sortOrder: count });
  afterEventsChange();
  revalidatePath(`/admin/events/${eventId}`);
}

export async function deleteEventImageAction(eventId: number, imageId: number) {
  await requireCapability("content:edit");
  await db.delete(eventImages).where(and(eq(eventImages.id, imageId), eq(eventImages.eventId, eventId)));
  afterEventsChange();
  revalidatePath(`/admin/events/${eventId}`);
}

export async function setEventCoverImageAction(eventId: number, mediaId: number) {
  await requireCapability("content:edit");
  await db.update(events).set({ imageId: mediaId }).where(eq(events.id, eventId));
  afterEventsChange();
  revalidatePath(`/admin/events/${eventId}`);
}

export async function reorderEventImageAction(eventId: number, imageId: number, direction: "up" | "down") {
  await requireCapability("content:edit");
  const images = await db.select().from(eventImages).where(eq(eventImages.eventId, eventId)).orderBy(eventImages.sortOrder);
  const idx = images.findIndex((i) => i.id === imageId);
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (idx === -1 || swapWith < 0 || swapWith >= images.length) return;

  const a = images[idx];
  const b = images[swapWith];
  await db.update(eventImages).set({ sortOrder: b.sortOrder }).where(eq(eventImages.id, a.id));
  await db.update(eventImages).set({ sortOrder: a.sortOrder }).where(eq(eventImages.id, b.id));
  afterEventsChange();
  revalidatePath(`/admin/events/${eventId}`);
}
