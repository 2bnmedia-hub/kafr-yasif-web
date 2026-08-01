"use client";

import { useState } from "react";
import { FileText, X } from "lucide-react";
import { UploadWidget, type UploadedMedia } from "./UploadWidget";

type FormValues = {
  title?: string;
  titleAr?: string | null;
  titleEn?: string | null;
  mediaId?: number | null;
  externalUrl?: string | null;
  currentFileName?: string | null;
  currentFileUrl?: string | null;
};

type Props = {
  action: (formData: FormData) => void;
  defaultValues?: FormValues;
  submitLabel: string;
};

const TABS = [
  { code: "he", label: "עברית" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
] as const;

export function FormForm({ action, defaultValues, submitLabel }: Props) {
  const [tab, setTab] = useState<"he" | "ar" | "en">("he");
  const v = defaultValues ?? {};
  const [mediaId, setMediaId] = useState<number | null>(v.mediaId ?? null);
  const [fileName, setFileName] = useState<string | null>(v.currentFileName ?? null);
  const [fileUrl, setFileUrl] = useState<string | null>(v.currentFileUrl ?? null);
  const [submitting, setSubmitting] = useState(false);

  function handleUploaded(files: UploadedMedia[]) {
    const file = files[0];
    if (!file) return;
    setMediaId(file.id);
    setFileName(file.filename);
    setFileUrl(file.url);
  }

  return (
    <form action={action} onSubmit={() => setSubmitting(true)} className="max-w-3xl space-y-6">
      <div className="admin-shadow-card rounded-2xl bg-white p-5">
        <div className="mb-4 flex gap-1 border-b border-teal-100">
          {TABS.map((tb) => (
            <button
              key={tb.code}
              type="button"
              onClick={() => setTab(tb.code)}
              className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
                tab === tb.code ? "border-teal-700 text-teal-900" : "border-transparent text-ink-600 hover:text-teal-700"
              }`}
            >
              {tb.label}
              {tb.code !== "he" && <span className="ms-1 text-xs font-normal text-ink-600">(אופציונלי)</span>}
            </button>
          ))}
        </div>

        <div className={tab === "he" ? "" : "hidden"}>
          <Field label="שם הטופס" required>
            <input name="title" defaultValue={v.title} required dir="rtl" className="input" />
          </Field>
        </div>
        <div className={tab === "ar" ? "" : "hidden"}>
          <Field label="اسم النموذج">
            <input name="titleAr" defaultValue={v.titleAr ?? ""} dir="rtl" className="input" />
          </Field>
        </div>
        <div className={tab === "en" ? "" : "hidden"}>
          <Field label="Form name">
            <input name="titleEn" defaultValue={v.titleEn ?? ""} dir="ltr" className="input" />
          </Field>
        </div>
      </div>

      <div className="admin-shadow-card rounded-2xl bg-white p-5">
        <span className="mb-1 block text-sm font-medium text-ink-900">קובץ הטופס (Word / PDF)</span>
        <p className="mb-3 text-xs text-ink-600">גודל קובץ מרבי: 50MB.</p>

        {fileName && (
          <div className="mb-3 flex items-center justify-between gap-3 rounded-xl bg-cream-50 p-3">
            <a
              href={fileUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-2 text-sm font-medium text-teal-900 hover:underline"
            >
              <FileText size={16} className="shrink-0 text-teal-700" aria-hidden="true" />
              <span className="truncate">{fileName}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMediaId(null);
                setFileName(null);
                setFileUrl(null);
              }}
              aria-label="הסרת קובץ"
              className="shrink-0 rounded-full p-1.5 text-red-600 hover:bg-red-50"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        )}

        <UploadWidget
          group="document"
          multiple={false}
          accept="application/pdf,.doc,.docx"
          hint="PDF, DOC, DOCX — עד 50MB"
          onUploaded={handleUploaded}
        />
        <input type="hidden" name="mediaId" value={mediaId ?? ""} />

        <div className="mt-4">
          <Field label="או קישור חיצוני (למשל טופס באתר משרד ממשלתי)">
            <input name="externalUrl" defaultValue={v.externalUrl ?? ""} dir="ltr" placeholder="https://..." className="input" />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="admin-shadow-card rounded-full bg-teal-700 px-8 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg disabled:opacity-60"
      >
        {submitting ? "שומר..." : submitLabel}
      </button>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.65rem;
          border: 1px solid var(--color-teal-100);
          padding: 0.55rem 0.8rem;
          font-size: 0.875rem;
          background: color-mix(in srgb, var(--color-cream-50) 55%, white);
          transition: border-color 0.15s ease, background-color 0.15s ease;
        }
        .input:focus {
          border-color: var(--color-teal-500);
          background: white;
          outline: none;
        }
      `}</style>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink-900">
        {label} {required && <span aria-hidden="true">*</span>}
      </span>
      {children}
    </label>
  );
}
