"use client";

import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

type TenderValues = {
  title?: string;
  titleAr?: string | null;
  titleEn?: string | null;
  tenderNumber?: string | null;
  category?: string | null;
  shortDescription?: string;
  shortDescriptionAr?: string | null;
  shortDescriptionEn?: string | null;
  bodyHtml?: string;
  bodyHtmlAr?: string | null;
  bodyHtmlEn?: string | null;
  publishDate?: Date | null;
  submissionDeadline?: Date | null;
  tenderStatus?: string;
  status?: string;
  scheduledAt?: Date | null;
  contactInfo?: string;
  notes?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

type Props = {
  action: (formData: FormData) => void;
  defaultValues?: TenderValues;
  submitLabel: string;
  children?: React.ReactNode;
};

function toDateInputValue(d?: Date | null) {
  if (!d) return "";
  const date = new Date(d);
  return date.toISOString().slice(0, 10);
}

function toDateTimeInputValue(d?: Date | null) {
  if (!d) return "";
  const date = new Date(d);
  return date.toISOString().slice(0, 16);
}

const TABS = [
  { code: "he", label: "עברית" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
] as const;

export function TenderForm({ action, defaultValues, submitLabel, children }: Props) {
  const [tab, setTab] = useState<"he" | "ar" | "en">("he");
  const [submitting, setSubmitting] = useState(false);
  const v = defaultValues ?? {};

  return (
    <form action={action} onSubmit={() => setSubmitting(true)} className="max-w-3xl space-y-6">
      <div className="admin-shadow-card rounded-2xl bg-white p-5 ">
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

        <div className={tab === "he" ? "space-y-4" : "hidden space-y-4"}>
          <Field label="כותרת המכרז" required>
            <input name="title" defaultValue={v.title} required dir="rtl" className="input" />
          </Field>
          <Field label="תיאור קצר">
            <textarea name="shortDescription" defaultValue={v.shortDescription} rows={2} dir="rtl" className="input" />
          </Field>
          <Field label="תוכן מלא">
            <RichTextEditor name="bodyHtml" defaultValue={v.bodyHtml ?? ""} dir="rtl" />
          </Field>
        </div>

        <div className={tab === "ar" ? "space-y-4" : "hidden space-y-4"}>
          <Field label="عنوان المناقصة">
            <input name="titleAr" defaultValue={v.titleAr ?? ""} dir="rtl" className="input" />
          </Field>
          <Field label="وصف قصير">
            <textarea name="shortDescriptionAr" defaultValue={v.shortDescriptionAr ?? ""} rows={2} dir="rtl" className="input" />
          </Field>
          <Field label="المحتوى الكامل">
            <RichTextEditor name="bodyHtmlAr" defaultValue={v.bodyHtmlAr ?? ""} dir="rtl" />
          </Field>
        </div>

        <div className={tab === "en" ? "space-y-4" : "hidden space-y-4"}>
          <Field label="Tender title">
            <input name="titleEn" defaultValue={v.titleEn ?? ""} dir="ltr" className="input" />
          </Field>
          <Field label="Short description">
            <textarea name="shortDescriptionEn" defaultValue={v.shortDescriptionEn ?? ""} rows={2} dir="ltr" className="input" />
          </Field>
          <Field label="Full content">
            <RichTextEditor name="bodyHtmlEn" defaultValue={v.bodyHtmlEn ?? ""} dir="ltr" />
          </Field>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 admin-shadow-card rounded-2xl bg-white p-5  sm:grid-cols-2">
        <Field label="מספר מכרז">
          <input name="tenderNumber" defaultValue={v.tenderNumber ?? ""} className="input" />
        </Field>
        <Field label="קטגוריה">
          <input name="category" defaultValue={v.category ?? ""} className="input" />
        </Field>
        <Field label="תאריך פרסום">
          <input type="date" name="publishDate" defaultValue={toDateInputValue(v.publishDate)} className="input" />
        </Field>
        <Field label="מועד אחרון להגשה">
          <input type="date" name="submissionDeadline" defaultValue={toDateInputValue(v.submissionDeadline)} className="input" />
        </Field>
        <Field label="סטטוס המכרז">
          <select name="tenderStatus" defaultValue={v.tenderStatus ?? "open"} className="input">
            <option value="open">פעיל</option>
            <option value="closed">סגור להגשה</option>
            <option value="awarded">הוכרז זוכה</option>
            <option value="cancelled">בוטל</option>
          </select>
        </Field>
        <Field label="סטטוס פרסום">
          <select name="status" defaultValue={v.status ?? "published"} className="input">
            <option value="published">פרסם מיד באתר</option>
            <option value="draft">שמור כטיוטה</option>
            <option value="hidden">מוסתר</option>
            <option value="scheduled">מתוזמן לפרסום</option>
          </select>
        </Field>
        <Field label="תזמון פרסום (אם נבחר 'מתוזמן')">
          <input type="datetime-local" name="scheduledAt" defaultValue={toDateTimeInputValue(v.scheduledAt)} className="input" />
        </Field>
        <Field label="פרטי קשר">
          <input name="contactInfo" defaultValue={v.contactInfo ?? ""} dir="rtl" className="input" />
        </Field>
        <Field label="הערות" className="sm:col-span-2">
          <textarea name="notes" defaultValue={v.notes ?? ""} rows={2} dir="rtl" className="input" />
        </Field>
      </div>

      <details className="admin-shadow-card rounded-2xl bg-white p-5 ">
        <summary className="cursor-pointer text-sm font-semibold text-teal-900">קידום אתרים (SEO)</summary>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="SEO Title">
            <input name="metaTitle" defaultValue={v.metaTitle ?? ""} className="input" />
          </Field>
          <Field label="Meta Description">
            <input name="metaDescription" defaultValue={v.metaDescription ?? ""} className="input" />
          </Field>
        </div>
        <p className="mt-2 text-xs text-ink-600">אם לא ימולאו, ייווצרו אוטומטית מתוך הכותרת והתיאור הקצר.</p>
      </details>

      {children}

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

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium text-ink-900">
        {label} {required && <span aria-hidden="true">*</span>}
      </span>
      {children}
    </label>
  );
}
