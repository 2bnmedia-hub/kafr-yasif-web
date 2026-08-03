"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings, footerLinks } from "@/db/schema";
import { requireCapability } from "@/lib/permissions";

function afterHomepageChange() {
  revalidatePath("/");
}

// ---- Site settings ----
export async function updateSiteSettingsAction(formData: FormData) {
  await requireCapability("settings:manage");
  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const hours = dayNames.map((days) => ({
    days,
    hours: String(formData.get(`hours_${days}`) ?? ""),
  }));

  await db
    .update(siteSettings)
    .set({
      address: String(formData.get("address") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      hours,
      updatedAt: new Date(),
    })
    .where(eq(siteSettings.id, 1));
  afterHomepageChange();
  revalidatePath("/admin/settings");
}

// ---- Footer links ----
export async function createFooterLinkAction(formData: FormData) {
  await requireCapability("content:edit");
  await db.insert(footerLinks).values({
    columnTitle: String(formData.get("columnTitle") ?? ""),
    label: String(formData.get("label") ?? ""),
    href: String(formData.get("href") ?? ""),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  });
  afterHomepageChange();
  revalidatePath("/admin/footer");
}

export async function deleteFooterLinkAction(id: number) {
  await requireCapability("content:delete");
  await db.delete(footerLinks).where(eq(footerLinks.id, id));
  afterHomepageChange();
  revalidatePath("/admin/footer");
}
