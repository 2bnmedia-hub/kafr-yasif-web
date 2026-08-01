"use client";

import { Trash2 } from "lucide-react";

export function ConfirmDeleteForm({
  action,
  label = "מחיקה",
  confirmMessage = "האם אתה בטוח שברצונך למחוק? הפעולה אינה הפיכה.",
  className = "flex items-center gap-1.5 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100",
}: {
  action: (formData: FormData) => void;
  label?: string;
  confirmMessage?: string;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button type="submit" className={className}>
        <Trash2 size={14} aria-hidden="true" />
        {label}
      </button>
    </form>
  );
}
