"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSettings, footerLinks } from "@/db/schema";
import { requireCapability } from "@/lib/permissions";
import { logAuditEvent } from "@/lib/audit-log";

function afterHomepageChange() {
  revalidatePath("/");
}

// ---- Site settings ----
export async function updateSiteSettingsAction(formData: FormData) {
  const admin = await requireCapability("settings:manage");
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
  await logAuditEvent({ action: "content_update", actorAdminId: admin.id, actorEmail: admin.email, targetType: "site_settings", targetId: 1 });
  revalidatePath("/admin/settings");
}

// ---- Footer links ----
export async function createFooterLinkAction(formData: FormData) {
  const admin = await requireCapability("content:edit");
  const [row] = await db
    .insert(footerLinks)
    .values({
      columnTitle: String(formData.get("columnTitle") ?? ""),
      label: String(formData.get("label") ?? ""),
      href: String(formData.get("href") ?? ""),
      sortOrder: Number(formData.get("sortOrder") ?? 0),
    })
    .returning({ id: footerLinks.id });
  afterHomepageChange();
  await logAuditEvent({ action: "content_create", actorAdminId: admin.id, actorEmail: admin.email, targetType: "footer_links", targetId: row.id });
  revalidatePath("/admin/footer");
}

export async function deleteFooterLinkAction(id: number) {
  const admin = await requireCapability("content:delete");
  await db.delete(footerLinks).where(eq(footerLinks.id, id));
  afterHomepageChange();
  await logAuditEvent({ action: "content_delete", actorAdminId: admin.id, actorEmail: admin.email, targetType: "footer_links", targetId: id });
  revalidatePath("/admin/footer");
}
