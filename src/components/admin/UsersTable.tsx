"use client";

import { useTransition } from "react";
import { updateAdminRoleAction } from "@/app/actions/admin-users";
import type { AdminRole } from "@/lib/permissions";

const ROLE_LABELS: Record<AdminRole, string> = {
  "site-admin": "מנהל אתר",
  "content-editor": "עורך תוכן",
};

type Row = { id: number; email: string; role: AdminRole; createdAt: Date };

export function UsersTable({ rows, currentAdminId }: { rows: Row[]; currentAdminId: number }) {
  const [isPending, startTransition] = useTransition();

  function handleRoleChange(id: number, role: AdminRole) {
    startTransition(async () => {
      await updateAdminRoleAction(id, role);
    });
  }

  return (
    <div className="admin-shadow-card overflow-x-auto rounded-2xl bg-white">
      <table className="w-full min-w-[520px] text-sm">
        <thead className="text-ink-600">
          <tr className="text-right">
            <th className="px-4 py-3 font-semibold">דוא&quot;ל</th>
            <th className="px-4 py-3 font-semibold">תפקיד</th>
            <th className="px-4 py-3 font-semibold">נוצר בתאריך</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="px-4 py-3 font-medium text-teal-900" dir="ltr">
                {r.email}
              </td>
              <td className="px-4 py-3">
                {r.id === currentAdminId ? (
                  <span className="text-ink-600">{ROLE_LABELS[r.role]} (המשתמש שלך)</span>
                ) : (
                  <select
                    defaultValue={r.role}
                    disabled={isPending}
                    onChange={(e) => handleRoleChange(r.id, e.target.value as AdminRole)}
                    className="rounded-lg border border-zinc-200 px-2 py-1 text-sm"
                  >
                    {Object.entries(ROLE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              <td className="px-4 py-3 text-ink-600">{new Date(r.createdAt).toLocaleString("he-IL")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
