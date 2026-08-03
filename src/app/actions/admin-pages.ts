"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { pages } from "@/db/schema";
import { sanitizeRichHtml } from "@/lib/sanitize-html";
import { assertContentMutationAllowed, requireCapability } from "@/lib/permissions";

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
  const admin = await requireCapability("content:edit");

  const [current] = await db.select({ published: pages.published }).from(pages).where(eq(pages.id, id)).limit(1);
  const published = formData.get("published") === "on";
  assertContentMutationAllowed(admin, { currentlyPublished: current?.published ?? false, requestedPublished: published });

  const title = str(formData, "title");
  const navLabel = str(formData, "navLabel");
  const bodyHtml = sanitizeRichHtml(str(formData, "bodyHtml"));
  const metaDescription = optionalStr(formData, "metaDescription");

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
  await requireCapability("content:delete");
  const [deleted] = await db.delete(pages).where(eq(pages.id, id)).returning({ slug: pages.slug });
  if (deleted) revalidatePath(`/${deleted.slug}`);
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}
