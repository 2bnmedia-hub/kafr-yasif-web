"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Unauthorized");
}

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
  await requireAdmin();
  await Promise.all(orderedIds.map((id, position) => db.update(forms).set({ sortOrder: position }).where(eq(forms.id, id))));
  afterFormsChange();
}

export async function createFormAction(formData: FormData) {
  await requireAdmin();
  const fields = formFieldsFromForm(formData);
  if (!fields.title) throw new Error("שם הטופס הוא שדה חובה.");
  if (!fields.mediaId && !fields.externalUrl) throw new Error("יש להעלות קובץ או להזין קישור חיצוני.");

  const [row] = await db.insert(forms).values(fields).returning();
  afterFormsChange();
  redirect(`/admin/forms/${row.id}?status=created`);
}

export async function updateFormAction(id: number, formData: FormData) {
  await requireAdmin();
  const fields = formFieldsFromForm(formData);
  if (!fields.title) throw new Error("שם הטופס הוא שדה חובה.");
  if (!fields.mediaId && !fields.externalUrl) throw new Error("יש להעלות קובץ או להזין קישור חיצוני.");

  await db.update(forms).set(fields).where(eq(forms.id, id));
  afterFormsChange();
  revalidatePath(`/admin/forms/${id}`);
  redirect(`/admin/forms/${id}?status=saved`);
}

export async function deleteFormAction(id: number) {
  await requireAdmin();
  await db.delete(forms).where(eq(forms.id, id));
  afterFormsChange();
  redirect("/admin/forms");
}
