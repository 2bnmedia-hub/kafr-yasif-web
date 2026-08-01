"use client";

import { useState } from "react";

type PageValues = {
  navLabel: string;
  navLabelAr?: string | null;
  navLabelEn?: string | null;
  title: string;
  titleAr?: string | null;
  titleEn?: string | null;
  bodyHtml: string;
  bodyHtmlAr?: string | null;
  bodyHtmlEn?: string | null;
  metaDescription?: string | null;
  metaDescriptionAr?: string | null;
  metaDescriptionEn?: string | null;
  published: boolean;
};

const TABS = [
  { code: "he", label: "עברית" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
] as const;

export function PageContentForm({ action, defaultValues }: { action: (formData: FormData) => void; defaultValues: PageValues }) {
  const [tab, setTab] = useState<"he" | "ar" | "en">("he");
  const [submitting, setSubmitting] = useState(false);
  const v = defaultValues;

  return (
    <form action={action} onSubmit={() => setSubmitting(true)} className="space-y-5 admin-shadow-card rounded-2xl bg-white p-6 ">
      <div className="mb-2 flex gap-1 border-b border-teal-100">
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

      <div className={tab === "he" ? "space-y-4" : "hidden space-y-4"}>
        <Field label="שם בתפריט" htmlFor="navLabel">
          <input id="navLabel" name="navLabel" defaultValue={v.navLabel} required dir="rtl" className="input" />
        </Field>
        <Field label="כותרת העמוד" htmlFor="title">
          <input id="title" name="title" defaultValue={v.title} required dir="rtl" className="input" />
        </Field>
        <Field label="תוכן העמוד" htmlFor="bodyHtml">
          <textarea id="bodyHtml" name="bodyHtml" defaultValue={v.bodyHtml} rows={16} dir="rtl" className="input font-mono text-sm leading-6" />
        </Field>
        <Field label="תיאור מטא (SEO)" htmlFor="metaDescription">
          <textarea id="metaDescription" name="metaDescription" defaultValue={v.metaDescription ?? ""} rows={2} dir="rtl" className="input text-sm" />
        </Field>
      </div>

      <div className={tab === "ar" ? "space-y-4" : "hidden space-y-4"}>
        <Field label="اسم القائمة" htmlFor="navLabelAr">
          <input id="navLabelAr" name="navLabelAr" defaultValue={v.navLabelAr ?? ""} dir="rtl" className="input" />
        </Field>
        <Field label="عنوان الصفحة" htmlFor="titleAr">
          <input id="titleAr" name="titleAr" defaultValue={v.titleAr ?? ""} dir="rtl" className="input" />
        </Field>
        <Field label="محتوى الصفحة" htmlFor="bodyHtmlAr">
          <textarea id="bodyHtmlAr" name="bodyHtmlAr" defaultValue={v.bodyHtmlAr ?? ""} rows={16} dir="rtl" className="input font-mono text-sm leading-6" />
        </Field>
        <Field label="وصف Meta (SEO)" htmlFor="metaDescriptionAr">
          <textarea id="metaDescriptionAr" name="metaDescriptionAr" defaultValue={v.metaDescriptionAr ?? ""} rows={2} dir="rtl" className="input text-sm" />
        </Field>
      </div>

      <div className={tab === "en" ? "space-y-4" : "hidden space-y-4"}>
        <Field label="Menu label" htmlFor="navLabelEn">
          <input id="navLabelEn" name="navLabelEn" defaultValue={v.navLabelEn ?? ""} dir="ltr" className="input" />
        </Field>
        <Field label="Page title" htmlFor="titleEn">
          <input id="titleEn" name="titleEn" defaultValue={v.titleEn ?? ""} dir="ltr" className="input" />
        </Field>
        <Field label="Page content" htmlFor="bodyHtmlEn">
          <textarea id="bodyHtmlEn" name="bodyHtmlEn" defaultValue={v.bodyHtmlEn ?? ""} rows={16} dir="ltr" className="input font-mono text-sm leading-6" />
        </Field>
        <Field label="Meta description (SEO)" htmlFor="metaDescriptionEn">
          <textarea id="metaDescriptionEn" name="metaDescriptionEn" defaultValue={v.metaDescriptionEn ?? ""} rows={2} dir="ltr" className="input text-sm" />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-ink-900">
        <input type="checkbox" name="published" defaultChecked={v.published} className="h-4 w-4" />
        פורסם (גלוי באתר)
      </label>

      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
        >
          {submitting ? "שומר..." : "שמירה"}
        </button>
      </div>

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

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-ink-900">
        {label}
      </label>
      {children}
    </div>
  );
}
