"use client";

import { AdminRowActions } from "./AdminRowActions";
import { DragHandle } from "./DragHandle";
import { useReorderableRows } from "./useReorderableRows";

type FormRow = {
  id: number;
  title: string;
  fileUrl: string | null;
  deleteAction: (formData: FormData) => void;
};

export function FormsAdminTableBody({
  rows,
  allIds,
  reorderAction,
}: {
  rows: FormRow[];
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
        const f = byId.get(id);
        if (!f) return null;
        const { className: dragClassName, ...dragEvents } = rowProps(f.id);
        return (
          <tr key={f.id} className={`transition-colors hover:bg-cream-50/60 ${dragClassName}`} {...dragEvents}>
            <td className="px-2 py-3">
              <DragHandle {...handleProps(f.id)} />
            </td>
            <td className="px-4 py-3 font-medium text-ink-900">{f.title}</td>
            <td className="px-4 py-3">
              <AdminRowActions
                editHref={`/admin/forms/${f.id}`}
                viewHref={f.fileUrl ?? undefined}
                deleteAction={f.deleteAction}
                deleteConfirmMessage="האם אתה בטוח שברצונך למחוק טופס זה? הפעולה אינה הפיכה."
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
