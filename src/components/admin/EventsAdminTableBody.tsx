"use client";

import { StatusBadge } from "./StatusBadge";
import { AdminRowActions } from "./AdminRowActions";
import { DragHandle } from "./DragHandle";
import { useReorderableRows } from "./useReorderableRows";

type EventRow = {
  id: number;
  title: string;
  date: string;
  location: string;
  registrationRequired: boolean;
  status: string;
  slug: string | null;
  deleteAction: (formData: FormData) => void;
};

export function EventsAdminTableBody({
  rows,
  allIds,
  reorderAction,
}: {
  rows: EventRow[];
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
        const e = byId.get(id);
        if (!e) return null;
        const { className: dragClassName, ...dragEvents } = rowProps(e.id);
        return (
          <tr key={e.id} className={`transition-colors hover:bg-cream-50/60 ${dragClassName}`} {...dragEvents}>
            <td className="px-2 py-3">
              <DragHandle {...handleProps(e.id)} />
            </td>
            <td className="px-4 py-3 font-medium text-ink-900">{e.title}</td>
            <td className="px-4 py-3 text-ink-600">{e.date}</td>
            <td className="px-4 py-3 text-ink-600">{e.location || "—"}</td>
            <td className="px-4 py-3 text-ink-600">{e.registrationRequired ? "נדרשת" : "—"}</td>
            <td className="px-4 py-3">
              <StatusBadge status={e.status} />
            </td>
            <td className="px-4 py-3">
              <AdminRowActions
                editHref={`/admin/events/${e.id}`}
                viewHref={e.slug ? `/events/${e.slug}` : undefined}
                deleteAction={e.deleteAction}
                deleteConfirmMessage="האם אתה בטוח שברצונך למחוק אירוע זה? הפעולה אינה הפיכה."
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
