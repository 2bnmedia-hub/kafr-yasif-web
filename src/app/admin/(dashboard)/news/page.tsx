import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { news } from "@/db/schema";
import { asc } from "drizzle-orm";
import { NewsAdminTableBody } from "@/components/admin/NewsAdminTableBody";
import { deleteNewsAction, reorderNewsAction } from "@/app/actions/admin-news";

export default async function AdminNewsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const { q = "", status = "" } = await searchParams;
  const all = await db.select().from(news).orderBy(asc(news.sortOrder), asc(news.id));

  const filtered = all.filter((n) => {
    if (status && n.status !== status) return false;
    if (q && !`${n.title} ${n.category ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-teal-900">חדשות ועדכונים</h2>
          <p className="text-sm text-ink-600">{filtered.length} כתבות</p>
        </div>
        <Link
          href="/admin/news/new"
          className="admin-shadow-card flex items-center gap-1.5 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg"
        >
          <Plus size={16} aria-hidden="true" />
          כתבה חדשה
        </Link>
      </div>

      <form className="admin-shadow-card mb-4 flex flex-wrap gap-3 rounded-2xl bg-white p-3" method="get">
        <input type="search" name="q" defaultValue={q} placeholder="חיפוש לפי כותרת או קטגוריה..." className="min-w-[240px] flex-1 rounded-lg border border-teal-100 px-3 py-2 text-sm" />
        <select name="status" defaultValue={status} className="rounded-lg border border-teal-100 px-3 py-2 text-sm">
          <option value="">כל הסטטוסים</option>
          <option value="draft">טיוטה</option>
          <option value="published">פורסם</option>
          <option value="hidden">מוסתר</option>
          <option value="scheduled">מתוזמן</option>
        </select>
        <button type="submit" className="rounded-lg bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-900 hover:bg-teal-200">סינון</button>
      </form>

      {filtered.length === 0 ? (
        <div className="admin-shadow-card rounded-2xl bg-white p-10 text-center text-sm text-ink-600">לא נמצאו כתבות.</div>
      ) : (
        <div className="admin-shadow-card overflow-x-auto rounded-2xl bg-white">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="text-ink-600">
              <tr className="text-right">
                <th className="w-8 px-2 py-3" />
                <th className="px-4 py-3 font-semibold">כותרת</th>
                <th className="px-4 py-3 font-semibold">קטגוריה</th>
                <th className="px-4 py-3 font-semibold">וריאנט</th>
                <th className="px-4 py-3 font-semibold">סטטוס</th>
                <th className="px-4 py-3 font-semibold">צפיות</th>
                <th className="px-4 py-3 font-semibold">פעולות</th>
              </tr>
            </thead>
            <NewsAdminTableBody
              allIds={all.map((n) => n.id)}
              reorderAction={reorderNewsAction}
              rows={filtered.map((n) => ({
                id: n.id,
                title: n.title,
                category: n.category,
                variant: n.variant,
                status: n.status,
                viewCount: n.viewCount,
                slug: n.slug,
                deleteAction: deleteNewsAction.bind(null, n.id),
              }))}
            />
          </table>
        </div>
      )}
    </div>
  );
}
