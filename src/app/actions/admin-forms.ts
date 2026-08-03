"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { requireCapability } from "@/lib/permissions";
import { logAuditEvent } from "@/lib/audit-log";

function afterFormsChange() {
  revalidatePath("/");
  revalidatePath("/טפסים");
  revalidatePath("/admin/forms");
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optionalStr(formData: FormData, key: string): string | null {
  const v = str(formData, key);
  return v || null;
}

function formFieldsFromForm(formData: FormData) {
  const mediaId = Number(formData.get("mediaId"));
  return {
    title: str(formData, "title"),
    titleAr: optionalStr(formData, "titleAr"),
    titleEn: optionalStr(formData, "titleEn"),
    mediaId: mediaId > 0 ? mediaId : null,
    externalUrl: optionalStr(formData, "externalUrl"),
  };
}

export async function reorderFormsAction(orderedIds: number[]) {
  await requireCapability("content:edit");
  await Promise.all(orderedIds.map((id, position) => db.update(forms).set({ sortOrder: position }).where(eq(forms.id, id))));
  afterFormsChange();
}

export async function createFormAction(formData: FormData) {
  const admin = await requireCapability("content:edit");
  const fields = formFieldsFromForm(formData);
  if (!fields.title) throw new Error("שם הטופס הוא שדה חובה.");
  if (!fields.mediaId && !fields.externalUrl) throw new Error("יש להעלות קובץ או להזין קישור חיצוני.");

  const [row] = await db.insert(forms).values(fields).returning();
  afterFormsChange();
  await logAuditEvent({ action: "content_create", actorAdminId: admin.id, actorEmail: admin.email, targetType: "forms", targetId: row.id });
  redirect(`/admin/forms/${row.id}?status=created`);
}

export async function updateFormAction(id: number, formData: FormData) {
  const admin = await requireCapability("content:edit");
  const fields = formFieldsFromForm(formData);
  if (!fields.title) throw new Error("שם הטופס הוא שדה חובה.");
  if (!fields.mediaId && !fields.externalUrl) throw new Error("יש להעלות קובץ או להזין קישור חיצוני.");

  await db.update(forms).set(fields).where(eq(forms.id, id));
  afterFormsChange();
  revalidatePath(`/admin/forms/${id}`);
  await logAuditEvent({ action: "content_update", actorAdminId: admin.id, actorEmail: admin.email, targetType: "forms", targetId: id });
  redirect(`/admin/forms/${id}?status=saved`);
}

export async function deleteFormAction(id: number) {
  const admin = await requireCapability("content:delete");
  await db.delete(forms).where(eq(forms.id, id));
  afterFormsChange();
  await logAuditEvent({ action: "content_delete", actorAdminId: admin.id, actorEmail: admin.email, targetType: "forms", targetId: id });
  redirect("/admin/forms");
}
