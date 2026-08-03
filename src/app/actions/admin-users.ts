"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { requireCapability, type AdminRole } from "@/lib/permissions";

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
  await db.update(adminUsers).set({ role }).where(eq(adminUsers.id, id));
  revalidatePath("/admin/users");
}
