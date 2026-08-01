"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { DragHandle } from "./DragHandle";
import { useReorderableRows } from "./useReorderableRows";
import { updateTickerItemAction, deleteTickerItemAction } from "@/app/actions/admin-ticker";

type TickerRow = { id: number; text: string; href: string | null; active: boolean };

export function TickerAdminTable({ rows, reorderAction }: { rows: TickerRow[]; reorderAction: (orderedIds: number[]) => Promise<void> }) {
  const [items, setItems] = useState(rows);
  const allIds = items.map((r) => r.id);
  const { order, rowProps, handleProps } = useReorderableRows(allIds, allIds, reorderAction);
  const byId = new Map(items.map((r) => [r.id, r]));
  const [isPending, startTransition] = useTransition();

  function save(id: number, formData: FormData) {
    startTransition(async () => {
      await updateTickerItemAction(id, formData);
    });
  }

  function remove(id: number) {
    if (!confirm("למחוק פריט זה מהרצועה?")) return;
    startTransition(async () => {
      await deleteTickerItemAction(id);
      setItems((prev) => prev.filter((r) => r.id !== id));
    });
  }

  return (
    <ul className="divide-y divide-zinc-100 overflow-hidden rounded-2xl bg-white admin-shadow-card">
      {order.map((id) => {
        const current = byId.get(id);
        if (!current) return null;
        const { className, ...dragEvents } = rowProps(id);
        return (
          <li key={id} className={`flex flex-wrap items-center gap-3 px-4 py-3 ${className}`} {...dragEvents}>
            <DragHandle {...handleProps(id)} />
            <form action={(fd) => save(id, fd)} className="flex flex-1 flex-wrap items-center gap-2">
              <input
                name="text"
                defaultValue={current.text}
                dir="rtl"
                required
                className="min-w-[220px] flex-1 rounded-lg border border-teal-100 px-3 py-2 text-sm"
                placeholder="טקסט הרצועה"
              />
              <input
                name="href"
                defaultValue={current.href ?? ""}
                className="w-40 rounded-lg border border-teal-100 px-3 py-2 text-sm"
                placeholder="קישור (אופציונלי)"
              />
              <label className="flex items-center gap-1.5 text-xs font-medium text-ink-600">
                <input type="checkbox" name="active" defaultChecked={current.active} className="h-4 w-4" />
                פעיל
              </label>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 disabled:opacity-50"
              >
                שמירה
              </button>
            </form>
            <button
              type="button"
              onClick={() => remove(id)}
              disabled={isPending}
              className="shrink-0 rounded-full p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
              aria-label="מחיקה"
            >
              <Trash2 size={16} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
