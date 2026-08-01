"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { pages } from "@/db/schema";
import { getCurrentAdmin } from "@/lib/auth";
import { sanitizeRichHtml } from "@/lib/sanitize-html";

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Unauthorized");
  return admin;
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optionalStr(formData: FormData, key: string): string | null {
  return str(formData, key) || null;
}

function optionalHtml(formData: FormData, key: string): string | null {
  const raw = str(formData, key);
  return raw ? sanitizeRichHtml(raw) : null;
}

export async function updatePageAction(id: number, formData: FormData) {
  await requireAdmin();

  const title = str(formData, "title");
  const navLabel = str(formData, "navLabel");
  const bodyHtml = sanitizeRichHtml(str(formData, "bodyHtml"));
  const metaDescription = optionalStr(formData, "metaDescription");
  const published = formData.get("published") === "on";

  const titleAr = optionalStr(formData, "titleAr");
  const titleEn = optionalStr(formData, "titleEn");
  const navLabelAr = optionalStr(formData, "navLabelAr");
  const navLabelEn = optionalStr(formData, "navLabelEn");
  const bodyHtmlAr = optionalHtml(formData, "bodyHtmlAr");
  const bodyHtmlEn = optionalHtml(formData, "bodyHtmlEn");
  const metaDescriptionAr = optionalStr(formData, "metaDescriptionAr");
  const metaDescriptionEn = optionalStr(formData, "metaDescriptionEn");

  const [updated] = await db
    .update(pages)
    .set({
      title,
      navLabel,
      bodyHtml,
      metaDescription,
      published,
      titleAr,
      titleEn,
      navLabelAr,
      navLabelEn,
      bodyHtmlAr,
      bodyHtmlEn,
      metaDescriptionAr,
      metaDescriptionEn,
      updatedAt: new Date(),
    })
    .where(eq(pages.id, id))
    .returning({ slug: pages.slug });

  if (updated) {
    revalidatePath(`/${updated.slug}`);
  }
  revalidatePath("/admin/pages");
}

export async function deletePageAction(id: number) {
  await requireAdmin();
  const [deleted] = await db.delete(pages).where(eq(pages.id, id)).returning({ slug: pages.slug });
  if (deleted) revalidatePath(`/${deleted.slug}`);
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}
