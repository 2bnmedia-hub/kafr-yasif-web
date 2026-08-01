import { db } from "@/db";
import { formSubmissions } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function AdminSubmissionsPage() {
  const rows = await db.select().from(formSubmissions).orderBy(desc(formSubmissions.createdAt));

  return (
    <div>
      <h2 className="mb-1 text-2xl font-bold tracking-tight text-teal-900">פניות שהתקבלו דרך האתר</h2>
      <p className="mb-6 text-sm text-ink-600">{rows.length} פניות</p>
      <div className="space-y-3">
        {rows.map((s) => {
          const data = s.data as Record<string, string>;
          return (
            <div key={s.id} className="admin-shadow-card rounded-2xl bg-white p-4 text-sm">
              <div className="mb-1 flex items-center justify-between text-ink-600">
                <span className="font-medium text-teal-900">{s.formType}</span>
                <time>{new Date(s.createdAt).toLocaleString("he-IL")}</time>
              </div>
              <dl className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {Object.entries(data).map(([key, value]) => (
                  <div key={key}>
                    <dt className="inline font-medium text-ink-900">{key}: </dt>
                    <dd className="inline text-ink-600">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
        {rows.length === 0 && <p className="text-sm text-ink-600">עדיין לא התקבלו פניות.</p>}
      </div>
    </div>
  );
}
