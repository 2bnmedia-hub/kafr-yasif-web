import { db } from "@/db";
import { auditLog } from "@/db/schema";
import { desc } from "drizzle-orm";
import { requireCapabilityOrRedirect } from "@/lib/permissions";

const ACTION_LABELS: Record<string, string> = {
  login_success: "התחברות מוצלחת",
  login_failure: "ניסיון התחברות כושל",
  logout: "התנתקות",
  content_create: "יצירת תוכן",
  content_update: "עריכת תוכן",
  content_delete: "מחיקת תוכן",
  content_publish: "פרסום תוכן",
  content_unpublish: "הסרת תוכן מפרסום",
  permission_change: "שינוי הרשאות",
  user_invite: "הזמנת משתמש",
  submission_view: "צפייה בפניות/משתמשים רשומים",
  attachment_download: "הורדת קובץ מצורף",
};

export default async function AuditLogPage() {
  await requireCapabilityOrRedirect("audit-log:view");
  const rows = await db.select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(500);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-teal-900">יומן ביקורת</h2>
        <p className="text-sm text-ink-600">
          תצוגה בלבד — 500 הרשומות האחרונות. שמירה נדרשת: 24 חודשים. אין אפשרות עריכה או מחיקה מהממשק,
          לכל משתמש, לרבות מנהל אתר.
        </p>
      </div>
      <div className="admin-shadow-card overflow-x-auto rounded-2xl bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="text-ink-600">
            <tr className="text-right">
              <th className="px-4 py-3 font-semibold">מתי</th>
              <th className="px-4 py-3 font-semibold">מי</th>
              <th className="px-4 py-3 font-semibold">מה</th>
              <th className="px-4 py-3 font-semibold">יעד</th>
              <th className="px-4 py-3 font-semibold">IP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="whitespace-nowrap px-4 py-3 text-ink-600">{new Date(row.createdAt).toLocaleString("he-IL")}</td>
                <td className="px-4 py-3 font-medium text-teal-900" dir="ltr">
                  {row.actorEmail ?? "—"}
                </td>
                <td className="px-4 py-3 text-ink-600">{ACTION_LABELS[row.action] ?? row.action}</td>
                <td className="px-4 py-3 text-ink-600">
                  {row.targetType ? `${row.targetType}${row.targetId ? ` #${row.targetId}` : ""}` : "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-600" dir="ltr">
                  {row.ip ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-6 text-center text-sm text-ink-600">אין רשומות ביומן עדיין.</p>}
      </div>
    </div>
  );
}
