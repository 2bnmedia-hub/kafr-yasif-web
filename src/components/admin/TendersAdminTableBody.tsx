"use client";

import { Eye } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { AdminRowActions } from "./AdminRowActions";
import { DragHandle } from "./DragHandle";
import { useReorderableRows } from "./useReorderableRows";

const TENDER_STATUS_LABEL: Record<string, string> = {
  open: "פעיל",
  closed: "סגור להגשה",
  awarded: "הוכרז זוכה",
  cancelled: "בוטל",
};

type TenderRow = {
  id: number;
  title: string;
  tenderNumber: string | null;
  category: string | null;
  publishDate: string;
  submissionDeadline: string;
  status: string;
  tenderStatus: string;
  viewCount: number;
  slug: string;
  deleteAction: (formData: FormData) => void;
};

export function TendersAdminTableBody({
  rows,
  allIds,
  reorderAction,
}: {
  rows: TenderRow[];
  allIds: number[];
  reorderAction: (orderedIds: number[]) => Promise<void>;
}) {
  const { order, rowProps, handleProps } = useReorderableRows(
    rows.map((r) => r.id),
    allIds,
    reorderAction
  );
  const byId = new Map(rows.map((r) => [r.id, r]));

  return (
    <tbody className="divide-y divide-zinc-100">
      {order.map((id) => {
        const t = byId.get(id);
        if (!t) return null;
        const { className: dragClassName, ...dragEvents } = rowProps(t.id);
        return (
          <tr key={t.id} className={`transition-colors hover:bg-cream-50/60 ${dragClassName}`} {...dragEvents}>
            <td className="px-2 py-3">
              <DragHandle {...handleProps(t.id)} />
            </td>
            <td className="px-4 py-3 font-medium text-ink-900">{t.title}</td>
            <td className="px-4 py-3 text-ink-600">{t.tenderNumber ?? "—"}</td>
            <td className="px-4 py-3 text-ink-600">{t.category ?? "—"}</td>
            <td className="px-4 py-3 text-ink-600">{t.publishDate}</td>
            <td className="px-4 py-3 text-ink-600">{t.submissionDeadline}</td>
            <td className="px-4 py-3">
              <div className="flex flex-col gap-1">
                <StatusBadge status={t.status} />
                <span className="text-xs text-ink-600">{TENDER_STATUS_LABEL[t.tenderStatus]}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-ink-600">
              <span className="flex items-center gap-1">
                <Eye size={13} aria-hidden="true" />
                {t.viewCount}
              </span>
            </td>
            <td className="px-4 py-3">
              <AdminRowActions
                editHref={`/admin/tenders/${t.id}`}
                viewHref={`/tenders/${t.slug}`}
                deleteAction={t.deleteAction}
                deleteConfirmMessage="האם אתה בטוח שברצונך למחוק מכרז זה? הפעולה אינה הפיכה."
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
