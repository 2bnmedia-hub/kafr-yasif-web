"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { FileText, Trash2, ExternalLink } from "lucide-react";
import { deleteMediaAction } from "@/app/actions/admin-media";
import { humanFileSize } from "@/lib/upload-validation";

type MediaRow = {
  id: number;
  filename: string;
  url: string;
  kind: string;
  mimeType: string | null;
  sizeBytes: number | null;
  createdAt: Date;
};

export function MediaLibraryGrid({ items }: { items: MediaRow[] }) {
  const [rows, setRows] = useState(items);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: number) {
    if (!confirm("למחוק קובץ זה לצמיתות?")) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteMediaAction(id);
      if (result?.error) {
        setError(result.error);
      } else {
        setRows((prev) => prev.filter((r) => r.id !== id));
      }
    });
  }

  if (rows.length === 0) {
    return <div className="admin-shadow-card rounded-2xl bg-white p-10 text-center text-sm text-ink-600">לא נמצאו קבצים.</div>;
  }

  return (
    <div>
      {error && <div role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {rows.map((m) => (
          <div key={m.id} className="admin-shadow-card overflow-hidden rounded-2xl bg-white transition-transform hover:-translate-y-0.5">
            <div className="relative aspect-square bg-cream-50">
              {m.kind === "image" ? (
                <Image src={m.url} alt="" fill sizes="180px" className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FileText size={32} className="text-teal-700" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="p-2.5">
              <p className="truncate text-xs font-medium text-ink-900" title={m.filename}>{m.filename}</p>
              <p className="text-[10px] text-ink-600">
                {m.sizeBytes ? humanFileSize(m.sizeBytes) : "—"} · {new Date(m.createdAt).toLocaleDateString("he-IL")}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <a href={m.url} target="_blank" rel="noopener noreferrer" aria-label="פתיחה" className="rounded p-1 text-teal-700 hover:bg-teal-100">
                  <ExternalLink size={13} />
                </a>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDelete(m.id)}
                  aria-label="מחיקה"
                  className="rounded p-1 text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
