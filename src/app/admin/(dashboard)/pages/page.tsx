import Link from "next/link";
import { db } from "@/db";
import { pages } from "@/db/schema";
import { sectionLabels } from "@/content/registry";

export default async function AdminPagesList() {
  const rows = await db.select().from(pages).orderBy(pages.navSection, pages.navLabel);

  return (
    <div>
      <h2 className="mb-1 text-2xl font-bold tracking-tight text-teal-900">עמודי תוכן</h2>
      <p className="mb-6 text-sm text-ink-600">{rows.length} עמודים</p>
      <div className="admin-shadow-card overflow-hidden rounded-2xl bg-white">
        <table className="w-full text-sm">
          <thead className="bg-teal-100 text-teal-900">
            <tr>
              <th className="px-4 py-3 text-start">כותרת</th>
              <th className="px-4 py-3 text-start">מדור</th>
              <th className="px-4 py-3 text-start">קישור</th>
              <th className="px-4 py-3 text-start">סטטוס</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium text-ink-900">{p.title}</td>
                <td className="px-4 py-3 text-ink-600">{sectionLabels[p.navSection]}</td>
                <td className="px-4 py-3 text-ink-600">
                  <a href={`/${p.slug}`} target="_blank" className="text-teal-700 hover:underline">
                    /{p.slug}
                  </a>
                </td>
                <td className="px-4 py-3">
                  {p.published ? (
                    <span className="rounded-full bg-olive-500/20 px-2.5 py-1 text-xs font-medium text-olive-700">
                      פורסם
                    </span>
                  ) : (
                    <span className="rounded-full bg-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600">
                      טיוטה
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-end">
                  <Link href={`/admin/pages/${p.id}`} className="font-medium text-teal-700 hover:underline">
                    עריכה
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
