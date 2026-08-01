import { db } from "@/db";
import { residents } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function AdminResidentsPage() {
  const rows = await db.select().from(residents).orderBy(desc(residents.createdAt));

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-teal-900">משתמשים רשומים</h2>
        <p className="text-sm text-ink-600">{rows.length} תושבים נרשמו לאזור האישי</p>
      </div>

      {rows.length === 0 ? (
        <div className="admin-shadow-card rounded-2xl bg-white p-10 text-center text-sm text-ink-600">אין עדיין משתמשים רשומים.</div>
      ) : (
        <div className="admin-shadow-card overflow-x-auto rounded-2xl bg-white">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="text-ink-600">
              <tr className="text-right">
                <th className="px-4 py-3 font-semibold">שם</th>
                <th className="px-4 py-3 font-semibold">דוא&quot;ל</th>
                <th className="px-4 py-3 font-semibold">תאריך הרשמה</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-teal-900">{r.name}</td>
                  <td className="px-4 py-3 text-ink-600" dir="ltr">
                    {r.email}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{new Date(r.createdAt).toLocaleString("he-IL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
