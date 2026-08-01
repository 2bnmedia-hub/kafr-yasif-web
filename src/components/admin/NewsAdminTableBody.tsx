"use client";

import { StatusBadge } from "./StatusBadge";
import { AdminRowActions } from "./AdminRowActions";
import { DragHandle } from "./DragHandle";
import { useReorderableRows } from "./useReorderableRows";

type NewsRow = {
  id: number;
  title: string;
  category: string | null;
  variant: string;
  status: string;
  viewCount: number;
  slug: string;
  deleteAction: (formData: FormData) => void;
};

export function NewsAdminTableBody({
  rows,
  allIds,
  reorderAction,
}: {
  rows: NewsRow[];
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
        const n = byId.get(id);
        if (!n) return null;
        const { className: dragClassName, ...dragEvents } = rowProps(n.id);
        return (
          <tr key={n.id} className={`transition-colors hover:bg-cream-50/60 ${dragClassName}`} {...dragEvents}>
            <td className="px-2 py-3">
              <DragHandle {...handleProps(n.id)} />
            </td>
            <td className="px-4 py-3 font-medium text-ink-900">{n.title}</td>
            <td className="px-4 py-3 text-ink-600">{n.category ?? "—"}</td>
            <td className="px-4 py-3 text-ink-600">{n.variant}</td>
            <td className="px-4 py-3">
              <StatusBadge status={n.status} />
            </td>
            <td className="px-4 py-3 text-ink-600">{n.viewCount}</td>
            <td className="px-4 py-3">
              <AdminRowActions
                editHref={`/admin/news/${n.id}`}
                viewHref={`/news/${n.slug}`}
                deleteAction={n.deleteAction}
                deleteConfirmMessage="האם אתה בטוח שברצונך למחוק כתבה זו? הפעולה אינה הפיכה."
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
