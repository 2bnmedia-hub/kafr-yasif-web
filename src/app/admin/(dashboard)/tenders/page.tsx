import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllTenders } from "@/db/queries";
import { TendersAdminTableBody } from "@/components/admin/TendersAdminTableBody";
import { deleteTenderAction, reorderTendersAction } from "@/app/actions/admin-tenders";

function fmtDate(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("he-IL");
}

export default async function AdminTendersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;
  const all = await getAllTenders();

  const filtered = all.filter((t) => {
    if (status && t.status !== status) return false;
    if (q) {
      const hay = `${t.title} ${t.tenderNumber ?? ""} ${t.category ?? ""}`.toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-teal-900">מכרזים</h2>
          <p className="text-sm text-ink-600">{filtered.length} מכרזים</p>
        </div>
        <Link
          href="/admin/tenders/new"
          className="admin-shadow-card flex items-center gap-1.5 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg"
        >
          <Plus size={16} aria-hidden="true" />
          מכרז חדש
        </Link>
      </div>

      <form className="admin-shadow-card mb-4 flex flex-wrap gap-3 rounded-2xl bg-white p-3" method="get">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="חיפוש לפי שם, מספר מכרז או קטגוריה..."
          className="min-w-[240px] flex-1 rounded-lg border border-teal-100 px-3 py-2 text-sm"
        />
        <select name="status" defaultValue={status} className="rounded-lg border border-teal-100 px-3 py-2 text-sm">
          <option value="">כל הסטטוסים</option>
          <option value="draft">טיוטה</option>
          <option value="published">פורסם</option>
          <option value="hidden">מוסתר</option>
          <option value="scheduled">מתוזמן</option>
        </select>
        <button type="submit" className="rounded-lg bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-900 hover:bg-teal-200">
          סינון
        </button>
      </form>

      {filtered.length === 0 ? (
        <div className="admin-shadow-card rounded-2xl bg-white p-10 text-center text-sm text-ink-600">
          לא נמצאו מכרזים התואמים את החיפוש.
        </div>
      ) : (
        <div className="admin-shadow-card overflow-x-auto rounded-2xl bg-white">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="text-ink-600">
              <tr className="text-right">
                <th className="w-8 px-2 py-3" />
                <th className="px-4 py-3 font-semibold">שם המכרז</th>
                <th className="px-4 py-3 font-semibold">מספר</th>
                <th className="px-4 py-3 font-semibold">קטגוריה</th>
                <th className="px-4 py-3 font-semibold">פרסום</th>
                <th className="px-4 py-3 font-semibold">מועד אחרון</th>
                <th className="px-4 py-3 font-semibold">סטטוס</th>
                <th className="px-4 py-3 font-semibold">צפיות</th>
                <th className="px-4 py-3 font-semibold">פעולות</th>
              </tr>
            </thead>
            <TendersAdminTableBody
              allIds={all.map((t) => t.id)}
              reorderAction={reorderTendersAction}
              rows={filtered.map((t) => ({
                id: t.id,
                title: t.title,
                tenderNumber: t.tenderNumber,
                category: t.category,
                publishDate: fmtDate(t.publishDate),
                submissionDeadline: fmtDate(t.submissionDeadline),
                status: t.status,
                tenderStatus: t.tenderStatus,
                viewCount: t.viewCount,
                slug: t.slug,
                deleteAction: deleteTenderAction.bind(null, t.id),
              }))}
            />
          </table>
        </div>
      )}
    </div>
  );
}
