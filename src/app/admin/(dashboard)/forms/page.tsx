import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { forms, media } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { FormsAdminTableBody } from "@/components/admin/FormsAdminTableBody";
import { deleteFormAction, reorderFormsAction } from "@/app/actions/admin-forms";

export default async function AdminFormsPage() {
  const all = await db
    .select({ id: forms.id, title: forms.title, externalUrl: forms.externalUrl, fileUrl: media.url })
    .from(forms)
    .leftJoin(media, eq(forms.mediaId, media.id))
    .orderBy(asc(forms.sortOrder));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-teal-900">טפסים</h2>
          <p className="text-sm text-ink-600">{all.length} טפסים</p>
        </div>
        <Link
          href="/admin/forms/new"
          className="admin-shadow-card flex items-center gap-1.5 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg"
        >
          <Plus size={16} aria-hidden="true" />
          טופס חדש
        </Link>
      </div>

      {all.length === 0 ? (
        <div className="admin-shadow-card rounded-2xl bg-white p-10 text-center text-sm text-ink-600">אין טפסים להצגה.</div>
      ) : (
        <div className="admin-shadow-card overflow-x-auto rounded-2xl bg-white">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="text-ink-600">
              <tr className="text-right">
                <th className="w-8 px-2 py-3" />
                <th className="px-4 py-3 font-semibold">שם הטופס</th>
                <th className="px-4 py-3 font-semibold">פעולות</th>
              </tr>
            </thead>
            <FormsAdminTableBody
              allIds={all.map((f) => f.id)}
              reorderAction={reorderFormsAction}
              rows={all.map((f) => ({
                id: f.id,
                title: f.title,
                fileUrl: f.fileUrl ?? f.externalUrl,
                deleteAction: deleteFormAction.bind(null, f.id),
              }))}
            />
          </table>
        </div>
      )}
    </div>
  );
}
