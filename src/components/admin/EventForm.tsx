"use client";

import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

type EventValues = {
  title?: string;
  titleAr?: string | null;
  titleEn?: string | null;
  subtitle?: string;
  subtitleAr?: string | null;
  subtitleEn?: string | null;
  description?: string;
  descriptionAr?: string | null;
  descriptionEn?: string | null;
  bodyHtml?: string;
  bodyHtmlAr?: string | null;
  bodyHtmlEn?: string | null;
  eventDate?: Date | null;
  startTime?: string | null;
  endTime?: string | null;
  location?: string;
  address?: string;
  contactName?: string;
  contactPhone?: string | null;
  openToPublic?: boolean;
  registrationRequired?: boolean;
  registrationUrl?: string | null;
  registrationPhone?: string | null;
  registrationText?: string | null;
  capacity?: number | null;
  status?: string;
  scheduledAt?: Date | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

type Props = {
  action: (formData: FormData) => void;
  defaultValues?: EventValues;
  submitLabel: string;
};

function toDateInputValue(d?: Date | null) {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}

function toDateTimeInputValue(d?: Date | null) {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 16);
}

const TABS = [
  { code: "he", label: "עברית" },
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
] as const;

export function EventForm({ action, defaultValues, submitLabel }: Props) {
  const [tab, setTab] = useState<"he" | "ar" | "en">("he");
  const [registrationRequired, setRegistrationRequired] = useState(defaultValues?.registrationRequired ?? false);
  const v = defaultValues ?? {};

  return (
    <form action={action} className="max-w-3xl space-y-6">
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
          <Field label="שם האירוע" required>
            <input name="title" defaultValue={v.title} required dir="rtl" className="input" />
          </Field>
          <Field label="כותרת משנה">
            <input name="subtitle" defaultValue={v.subtitle} dir="rtl" className="input" />
          </Field>
          <Field label="תיאור קצר">
            <textarea name="description" defaultValue={v.description} rows={2} dir="rtl" className="input" />
          </Field>
          <Field label="תוכן מלא">
            <RichTextEditor name="bodyHtml" defaultValue={v.bodyHtml ?? ""} dir="rtl" />
          </Field>
        </div>

        <div className={tab === "ar" ? "space-y-4" : "hidden space-y-4"}>
          <Field label="اسم الفعالية">
            <input name="titleAr" defaultValue={v.titleAr ?? ""} dir="rtl" className="input" />
          </Field>
          <Field label="العنوان الفرعي">
            <input name="subtitleAr" defaultValue={v.subtitleAr ?? ""} dir="rtl" className="input" />
          </Field>
          <Field label="وصف قصير">
            <textarea name="descriptionAr" defaultValue={v.descriptionAr ?? ""} rows={2} dir="rtl" className="input" />
          </Field>
          <Field label="المحتوى الكامل">
            <RichTextEditor name="bodyHtmlAr" defaultValue={v.bodyHtmlAr ?? ""} dir="rtl" />
          </Field>
        </div>

        <div className={tab === "en" ? "space-y-4" : "hidden space-y-4"}>
          <Field label="Event name">
            <input name="titleEn" defaultValue={v.titleEn ?? ""} dir="ltr" className="input" />
          </Field>
          <Field label="Subtitle">
            <input name="subtitleEn" defaultValue={v.subtitleEn ?? ""} dir="ltr" className="input" />
          </Field>
          <Field label="Short description">
            <textarea name="descriptionEn" defaultValue={v.descriptionEn ?? ""} rows={2} dir="ltr" className="input" />
          </Field>
          <Field label="Full content">
            <RichTextEditor name="bodyHtmlEn" defaultValue={v.bodyHtmlEn ?? ""} dir="ltr" />
          </Field>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 admin-shadow-card rounded-2xl bg-white p-5  sm:grid-cols-2">
        <Field label="תאריך האירוע">
          <input type="date" name="eventDate" defaultValue={toDateInputValue(v.eventDate)} className="input" />
        </Field>
        <Field label="מיקום האירוע">
          <input name="location" defaultValue={v.location ?? ""} dir="rtl" className="input" />
        </Field>
        <Field label="שעת התחלה">
          <input type="time" name="startTime" defaultValue={v.startTime ?? ""} className="input" />
        </Field>
        <Field label="שעת סיום">
          <input type="time" name="endTime" defaultValue={v.endTime ?? ""} className="input" />
        </Field>
        <Field label="כתובת" className="sm:col-span-2">
          <input name="address" defaultValue={v.address ?? ""} dir="rtl" className="input" />
        </Field>
        <Field label="איש קשר">
          <input name="contactName" defaultValue={v.contactName ?? ""} dir="rtl" className="input" />
        </Field>
        <Field label="טלפון">
          <input name="contactPhone" defaultValue={v.contactPhone ?? ""} className="input" />
        </Field>
      </div>

      <div className="space-y-4 admin-shadow-card rounded-2xl bg-white p-5 ">
        <label className="flex items-center gap-2 text-sm font-medium text-ink-900">
          <input type="checkbox" name="openToPublic" defaultChecked={v.openToPublic ?? true} />
          האירוע פתוח לקהל
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-ink-900">
          <input
            type="checkbox"
            name="registrationRequired"
            defaultChecked={registrationRequired}
            onChange={(e) => setRegistrationRequired(e.target.checked)}
          />
          נדרשת הרשמה מראש
        </label>

        {registrationRequired && (
          <div className="grid grid-cols-1 gap-4 border-t border-teal-100 pt-4 sm:grid-cols-2">
            <Field label="קישור להרשמה">
              <input name="registrationUrl" defaultValue={v.registrationUrl ?? ""} className="input" />
            </Field>
            <Field label="טלפון להרשמה">
              <input name="registrationPhone" defaultValue={v.registrationPhone ?? ""} className="input" />
            </Field>
            <Field label="מספר מקומות">
              <input type="number" name="capacity" defaultValue={v.capacity ?? ""} className="input" />
            </Field>
            <Field label="טקסט הסבר להרשמה" className="sm:col-span-2">
              <textarea name="registrationText" defaultValue={v.registrationText ?? ""} rows={2} dir="rtl" className="input" />
            </Field>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 admin-shadow-card rounded-2xl bg-white p-5  sm:grid-cols-2">
        <Field label="סטטוס פרסום">
          <select name="status" defaultValue={v.status ?? "published"} className="input">
            <option value="draft">טיוטה</option>
            <option value="published">פורסם</option>
            <option value="hidden">מוסתר</option>
            <option value="scheduled">מתוזמן לפרסום</option>
          </select>
        </Field>
        <Field label="תזמון פרסום (אם נבחר 'מתוזמן')">
          <input type="datetime-local" name="scheduledAt" defaultValue={toDateTimeInputValue(v.scheduledAt)} className="input" />
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
      </details>

      <button
        type="submit"
        className="admin-shadow-card rounded-full bg-teal-700 px-8 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg"
      >
        {submitLabel}
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
