"use client";

import { useState, useTransition } from "react";
import { FileText, Trash2, Download, Star, Image as ImageIcon } from "lucide-react";
import { UploadWidget, type UploadedMedia } from "./UploadWidget";
import { addTenderDocumentAction, deleteTenderDocumentAction, setTenderCoverImageAction } from "@/app/actions/admin-tenders";
import { humanFileSize } from "@/lib/upload-validation";

type DocRow = {
  key: number;
  mediaId: number;
  url: string;
  filename: string;
  kind: string;
  name: string;
  description: string;
  sizeBytes: number | null;
};

export function TenderDocumentsPanel({
  tenderId,
  initialDocs,
  coverImageId,
}: {
  tenderId?: number;
  initialDocs: DocRow[];
  coverImageId?: number | null;
}) {
  const [docs, setDocs] = useState(initialDocs);
  const [cover, setCover] = useState(coverImageId ?? null);
  const [isPending, startTransition] = useTransition();

  function handleUploaded(files: UploadedMedia[]) {
    if (tenderId) {
      startTransition(async () => {
        for (const f of files) {
          const fd = new FormData();
          fd.append("tenderId", String(tenderId));
          fd.append("mediaId", String(f.id));
          fd.append("name", f.filename);
          fd.append("description", "");
          fd.append("kind", f.kind);
          const inserted = await addTenderDocumentAction(fd);
          setDocs((prev) => [
            ...prev,
            { key: inserted?.id ?? f.id, mediaId: f.id, url: f.url, filename: f.filename, kind: f.kind, name: f.filename, description: "", sizeBytes: f.sizeBytes },
          ]);
          if (!cover && f.kind === "image") setCover(f.id);
        }
      });
    } else {
      setDocs((prev) => [
        ...prev,
        ...files.map((f) => ({ key: f.id, mediaId: f.id, url: f.url, filename: f.filename, kind: f.kind, name: f.filename, description: "", sizeBytes: f.sizeBytes })),
      ]);
      setCover((prev) => prev ?? files.find((f) => f.kind === "image")?.id ?? prev);
    }
  }

  function removeDocument(doc: DocRow) {
    if (tenderId) {
      startTransition(async () => {
        await deleteTenderDocumentAction(tenderId, doc.key);
        setDocs((prev) => prev.filter((d) => d.key !== doc.key));
        if (cover === doc.mediaId) setCover(null);
      });
    } else {
      setDocs((prev) => prev.filter((d) => d.key !== doc.key));
      if (cover === doc.mediaId) setCover(null);
    }
  }

  function makeCover(mediaId: number) {
    if (tenderId) {
      startTransition(async () => {
        await setTenderCoverImageAction(tenderId, mediaId);
        setCover(mediaId);
      });
    } else {
      setCover(mediaId);
    }
  }

  return (
    <div className="admin-shadow-card rounded-2xl bg-white p-5 ">
      <h3 className="mb-1 text-sm font-semibold text-teal-900">מסמכים ותמונות מצורפים</h3>
      <p className="mb-4 text-xs text-ink-600">
        קבצים מצורפים מיד עם ההעלאה. התמונה הראשונה שמועלית נקבעת אוטומטית כתמונה הראשית באתר — ניתן לשנות בסימון הכוכב.
      </p>

      <UploadWidget
        group="any"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
        label="גררו קבצי PDF / Word / תמונה לכאן"
        hint="PDF, DOC, DOCX, JPG, PNG, WEBP — עד 50MB לקובץ"
        onUploaded={handleUploaded}
      />

      {!tenderId && (
        <>
          <input
            type="hidden"
            name="pendingDocuments"
            value={JSON.stringify(docs.map((d) => ({ mediaId: d.mediaId, name: d.name, description: d.description, kind: d.kind })))}
          />
          <input type="hidden" name="pendingCoverMediaId" value={cover ?? ""} />
        </>
      )}

      {docs.length > 0 ? (
        <ul className="mt-4 divide-y divide-zinc-100 overflow-hidden rounded-lg ring-1 ring-zinc-100">
          {docs.map((doc) => (
            <li key={doc.key} className="flex items-center gap-3 px-3 py-2.5">
              {doc.kind === "image" ? (
                <ImageIcon size={16} className="shrink-0 text-teal-700" aria-hidden="true" />
              ) : (
                <FileText size={16} className="shrink-0 text-teal-700" aria-hidden="true" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-900">{doc.name}</p>
                {doc.description && <p className="truncate text-xs text-ink-600">{doc.description}</p>}
                {doc.sizeBytes && <p className="text-xs text-ink-600">{humanFileSize(doc.sizeBytes)}</p>}
              </div>
              {doc.kind === "image" && (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => makeCover(doc.mediaId)}
                  aria-label="קביעה כתמונה ראשית"
                  className={`shrink-0 rounded-full p-2 ${cover === doc.mediaId ? "bg-gold-500 text-white" : "text-ink-600 hover:bg-cream-100"}`}
                >
                  <Star size={15} fill={cover === doc.mediaId ? "currentColor" : "none"} />
                </button>
              )}
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="shrink-0 rounded-full p-2 text-teal-700 hover:bg-teal-100"
                aria-label="הורדה"
              >
                <Download size={15} />
              </a>
              <button
                type="button"
                onClick={() => {
                  if (confirm("למחוק קובץ זה?")) removeDocument(doc);
                }}
                disabled={isPending}
                className="shrink-0 rounded-full p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                aria-label="מחיקה"
              >
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-ink-600">לא צורפו קבצים עדיין.</p>
      )}
    </div>
  );
}
