"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and, sql } from "drizzle-orm";
import { db } from "@/db";
import { tenders, tenderDocuments } from "@/db/schema";
import { sanitizeRichHtml } from "@/lib/sanitize-html";
import { uniqueSlug } from "@/lib/slugify";
import { assertContentMutationAllowed, requireCapability } from "@/lib/permissions";
import { logAuditEvent } from "@/lib/audit-log";

function afterTendersChange() {
  revalidatePath("/מכרזים");
  revalidatePath("/admin/tenders");
}

export async function reorderTendersAction(orderedIds: number[]) {
  await requireCapability("content:edit");
  await Promise.all(orderedIds.map((id, position) => db.update(tenders).set({ sortOrder: position }).where(eq(tenders.id, id))));
  afterTendersChange();
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

async function tenderFieldsFromForm(formData: FormData) {
  return {
    tenderNumber: optionalStr(formData, "tenderNumber"),
    category: optionalStr(formData, "category"),
    title: str(formData, "title"),
    titleAr: optionalStr(formData, "titleAr"),
    titleEn: optionalStr(formData, "titleEn"),
    shortDescription: str(formData, "shortDescription"),
    shortDescriptionAr: optionalStr(formData, "shortDescriptionAr"),
    shortDescriptionEn: optionalStr(formData, "shortDescriptionEn"),
    bodyHtml: sanitizeRichHtml(str(formData, "bodyHtml")),
    bodyHtmlAr: optionalStr(formData, "bodyHtmlAr") ? sanitizeRichHtml(str(formData, "bodyHtmlAr")) : null,
    bodyHtmlEn: optionalStr(formData, "bodyHtmlEn") ? sanitizeRichHtml(str(formData, "bodyHtmlEn")) : null,
    publishDate: optionalDate(formData, "publishDate"),
    submissionDeadline: optionalDate(formData, "submissionDeadline"),
    tenderStatus: (str(formData, "tenderStatus") || "open") as (typeof tenders.$inferInsert)["tenderStatus"],
    status: (str(formData, "status") || "published") as (typeof tenders.$inferInsert)["status"],
    scheduledAt: optionalDate(formData, "scheduledAt"),
    contactInfo: str(formData, "contactInfo"),
    notes: str(formData, "notes"),
    metaTitle: optionalStr(formData, "metaTitle"),
    metaDescription: optionalStr(formData, "metaDescription"),
    ogImageUrl: optionalStr(formData, "ogImageUrl"),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

type PendingDocument = { mediaId: number; name: string; description: string; kind: string };

function parsePendingDocuments(formData: FormData): PendingDocument[] {
  const raw = str(formData, "pendingDocuments");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((it): it is PendingDocument => it && typeof it.mediaId === "number")
      .map((it) => ({
        mediaId: it.mediaId,
        name: typeof it.name === "string" ? it.name : "",
        description: typeof it.description === "string" ? it.description : "",
        kind: typeof it.kind === "string" ? it.kind : "document",
      }));
  } catch {
    return [];
  }
}

export async function createTenderAction(formData: FormData) {
  const admin = await requireCapability("content:edit");
  const fields = await tenderFieldsFromForm(formData);
  assertContentMutationAllowed(admin, { currentlyPublished: false, requestedPublished: fields.status === "published" });

  const existing = await db.select({ slug: tenders.slug }).from(tenders);
  const slug = uniqueSlug(fields.title, new Set(existing.map((r) => r.slug)));

  const pendingDocs = parsePendingDocuments(formData);
  const pendingCoverMediaId = Number(formData.get("pendingCoverMediaId")) || null;
  const coverImageId =
    pendingCoverMediaId && pendingDocs.some((d) => d.mediaId === pendingCoverMediaId)
      ? pendingCoverMediaId
      : pendingDocs.find((d) => d.kind === "image")?.mediaId ?? null;

  const [row] = await db.insert(tenders).values({ ...fields, slug, coverImageId }).returning();

  if (pendingDocs.length) {
    await db.insert(tenderDocuments).values(
      pendingDocs.map((d, index) => ({ tenderId: row.id, mediaId: d.mediaId, name: d.name, description: d.description, sortOrder: index }))
    );
  }

  afterTendersChange();
  revalidatePath(`/tenders/${slug}`);
  await logAuditEvent({ action: "content_create", actorAdminId: admin.id, actorEmail: admin.email, targetType: "tenders", targetId: row.id, detail: { slug } });
  if (fields.status === "published") {
    await logAuditEvent({ action: "content_publish", actorAdminId: admin.id, actorEmail: admin.email, targetType: "tenders", targetId: row.id });
  }
  redirect(`/admin/tenders/${row.id}?status=${fields.status === "published" ? "created" : "created_draft"}`);
}

export async function updateTenderAction(id: number, formData: FormData) {
  const admin = await requireCapability("content:edit");
  const fields = await tenderFieldsFromForm(formData);
  const [current] = await db.select({ status: tenders.status }).from(tenders).where(eq(tenders.id, id)).limit(1);
  assertContentMutationAllowed(admin, {
    currentlyPublished: current?.status === "published",
    requestedPublished: fields.status === "published",
  });
  await db.update(tenders).set({ ...fields, updatedAt: new Date() }).where(eq(tenders.id, id));
  afterTendersChange();
  revalidatePath(`/tenders/${(await db.select({ slug: tenders.slug }).from(tenders).where(eq(tenders.id, id)))[0]?.slug}`);
  revalidatePath(`/admin/tenders/${id}`);
  await logAuditEvent({ action: "content_update", actorAdminId: admin.id, actorEmail: admin.email, targetType: "tenders", targetId: id });
  if (current && current.status !== fields.status && (current.status === "published" || fields.status === "published")) {
    await logAuditEvent({
      action: fields.status === "published" ? "content_publish" : "content_unpublish",
      actorAdminId: admin.id,
      actorEmail: admin.email,
      targetType: "tenders",
      targetId: id,
    });
  }
  redirect(`/admin/tenders/${id}?status=${fields.status === "published" ? "saved" : "saved_draft"}`);
}

export async function deleteTenderAction(id: number) {
  const admin = await requireCapability("content:delete");
  await db.delete(tenders).where(eq(tenders.id, id));
  afterTendersChange();
  await logAuditEvent({ action: "content_delete", actorAdminId: admin.id, actorEmail: admin.email, targetType: "tenders", targetId: id });
  redirect("/admin/tenders");
}

export async function togglePublishTenderAction(id: number, nextStatus: "published" | "hidden") {
  const admin = await requireCapability("content:publish");
  await db.update(tenders).set({ status: nextStatus, updatedAt: new Date() }).where(eq(tenders.id, id));
  afterTendersChange();
  await logAuditEvent({
    action: nextStatus === "published" ? "content_publish" : "content_unpublish",
    actorAdminId: admin.id,
    actorEmail: admin.email,
    targetType: "tenders",
    targetId: id,
  });
  revalidatePath(`/admin/tenders/${id}`);
}

export async function duplicateTenderAction(id: number) {
  const admin = await requireCapability("content:edit"); // always creates a new draft, never publishes
  const [source] = await db.select().from(tenders).where(eq(tenders.id, id)).limit(1);
  if (!source) redirect("/admin/tenders");

  const existing = await db.select({ slug: tenders.slug }).from(tenders);
  const slug = uniqueSlug(`${source.title}-עותק`, new Set(existing.map((r) => r.slug)));

  const [copy] = await db
    .insert(tenders)
    .values({
      slug,
      tenderNumber: source.tenderNumber,
      category: source.category,
      title: `${source.title} (עותק)`,
      titleAr: source.titleAr,
      titleEn: source.titleEn,
      shortDescription: source.shortDescription,
      shortDescriptionAr: source.shortDescriptionAr,
      shortDescriptionEn: source.shortDescriptionEn,
      bodyHtml: source.bodyHtml,
      bodyHtmlAr: source.bodyHtmlAr,
      bodyHtmlEn: source.bodyHtmlEn,
      publishDate: source.publishDate,
      submissionDeadline: source.submissionDeadline,
      tenderStatus: source.tenderStatus,
      status: "draft",
      contactInfo: source.contactInfo,
      notes: source.notes,
      metaTitle: source.metaTitle,
      metaDescription: source.metaDescription,
      ogImageUrl: source.ogImageUrl,
      sortOrder: source.sortOrder,
    })
    .returning();

  const sourceDocs = await db.select().from(tenderDocuments).where(eq(tenderDocuments.tenderId, id));
  if (sourceDocs.length) {
    await db.insert(tenderDocuments).values(
      sourceDocs.map((d) => ({
        tenderId: copy.id,
        mediaId: d.mediaId,
        name: d.name,
        description: d.description,
        sortOrder: d.sortOrder,
      }))
    );
  }

  afterTendersChange();
  await logAuditEvent({ action: "content_create", actorAdminId: admin.id, actorEmail: admin.email, targetType: "tenders", targetId: copy.id, detail: { duplicatedFrom: id } });
  redirect(`/admin/tenders/${copy.id}`);
}

export async function addTenderDocumentAction(formData: FormData) {
  await requireCapability("content:edit");
  const tenderId = Number(formData.get("tenderId"));
  const mediaId = Number(formData.get("mediaId"));
  const name = str(formData, "name");
  const description = str(formData, "description");
  const kind = str(formData, "kind");

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(tenderDocuments)
    .where(eq(tenderDocuments.tenderId, tenderId));

  const [inserted] = await db
    .insert(tenderDocuments)
    .values({ tenderId, mediaId, name, description, sortOrder: count })
    .returning({ id: tenderDocuments.id });

  if (count === 0 && kind === "image") {
    const [current] = await db.select({ coverImageId: tenders.coverImageId }).from(tenders).where(eq(tenders.id, tenderId)).limit(1);
    if (current && !current.coverImageId) {
      await db.update(tenders).set({ coverImageId: mediaId }).where(eq(tenders.id, tenderId));
    }
  }

  afterTendersChange();
  revalidatePath(`/admin/tenders/${tenderId}`);
  return inserted;
}

export async function setTenderCoverImageAction(tenderId: number, mediaId: number) {
  await requireCapability("content:edit");
  await db.update(tenders).set({ coverImageId: mediaId }).where(eq(tenders.id, tenderId));
  afterTendersChange();
  revalidatePath(`/admin/tenders/${tenderId}`);
}

export async function deleteTenderDocumentAction(tenderId: number, docId: number) {
  await requireCapability("content:edit");
  await db.delete(tenderDocuments).where(and(eq(tenderDocuments.id, docId), eq(tenderDocuments.tenderId, tenderId)));
  afterTendersChange();
  revalidatePath(`/admin/tenders/${tenderId}`);
}
