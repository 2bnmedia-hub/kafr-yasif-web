import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { requireCapabilityOrRedirect } from "@/lib/permissions";
import { UsersTable } from "@/components/admin/UsersTable";

export default async function AdminUsersPage() {
  const currentAdmin = await requireCapabilityOrRedirect("users:manage");
  const rows = await db
    .select({ id: adminUsers.id, email: adminUsers.email, role: adminUsers.role, createdAt: adminUsers.createdAt })
    .from(adminUsers)
    .orderBy(adminUsers.createdAt);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-teal-900">משתמשי מערכת</h2>
        <p className="text-sm text-ink-600">
          {rows.length} משתמשים. יצירת חשבון חדש נעשית דרך זרימת ההזמנה (עדיין לא זמינה בממשק) — כאן ניתן רק לשנות
          תפקיד למשתמש קיים.
        </p>
      </div>
      <UsersTable rows={rows} currentAdminId={currentAdmin.id} />
    </div>
  );
}
