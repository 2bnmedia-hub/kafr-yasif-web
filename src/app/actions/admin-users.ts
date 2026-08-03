"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { requireCapability, type AdminRole } from "@/lib/permissions";
import { logAuditEvent } from "@/lib/audit-log";

export async function listAdminUsersAction() {
  await requireCapability("users:manage");
  return db
    .select({ id: adminUsers.id, email: adminUsers.email, role: adminUsers.role, createdAt: adminUsers.createdAt })
    .from(adminUsers)
    .orderBy(adminUsers.createdAt);
}

export async function updateAdminRoleAction(id: number, role: AdminRole) {
  const admin = await requireCapability("users:manage");
  if (admin.id === id) {
    throw new Error("לא ניתן לשנות את התפקיד של המשתמש המחובר כרגע (כדי למנוע נעילה עצמית).");
  }
  const [target] = await db.select({ email: adminUsers.email, role: adminUsers.role }).from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  await db.update(adminUsers).set({ role }).where(eq(adminUsers.id, id));
  await logAuditEvent({
    action: "permission_change",
    actorAdminId: admin.id,
    actorEmail: admin.email,
    targetType: "admin_users",
    targetId: id,
    detail: { targetEmail: target?.email, previousRole: target?.role, newRole: role },
  });
  revalidatePath("/admin/users");
}
