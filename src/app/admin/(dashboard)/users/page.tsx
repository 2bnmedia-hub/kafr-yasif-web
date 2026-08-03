import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { requireCapabilityOrRedirect } from "@/lib/permissions";
import { UsersTable } from "@/components/admin/UsersTable";
import { InviteUserForm } from "@/components/admin/InviteUserForm";

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
        <p className="text-sm text-ink-600">{rows.length} משתמשים.</p>
      </div>
      <InviteUserForm />
      <UsersTable rows={rows} currentAdminId={currentAdmin.id} />
    </div>
  );
}
