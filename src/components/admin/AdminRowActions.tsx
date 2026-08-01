import Link from "next/link";
import { Pencil, Eye } from "lucide-react";
import { ConfirmDeleteForm } from "./ConfirmDeleteForm";

export function AdminRowActions({
  editHref,
  viewHref,
  deleteAction,
  deleteConfirmMessage,
}: {
  editHref: string;
  viewHref?: string;
  deleteAction: (formData: FormData) => void;
  deleteConfirmMessage: string;
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      {viewHref && (
        <a
          href={viewHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="צפייה באתר"
          className="rounded-full p-2 text-teal-700 transition-colors hover:bg-teal-100"
        >
          <Eye size={15} aria-hidden="true" />
        </a>
      )}
      <Link href={editHref} aria-label="עריכה" className="rounded-full p-2 text-teal-700 transition-colors hover:bg-teal-100">
        <Pencil size={15} aria-hidden="true" />
      </Link>
      <ConfirmDeleteForm
        action={deleteAction}
        label=""
        confirmMessage={deleteConfirmMessage}
        className="rounded-full p-2 text-red-600 transition-colors hover:bg-red-50"
      />
    </div>
  );
}
