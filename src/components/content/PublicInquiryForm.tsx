"use client";

import { useActionState } from "react";
import { submitPublicInquiry, type PublicInquiryState } from "@/app/actions/public-inquiry";

const initialState: PublicInquiryState = { status: "idle" };

const departments = [
  "לשכת ראש המועצה",
  'מנכ"ל ומזכירות',
  "הנהלת המועצה",
  "מבקר המועצה",
  "הנדסה, תשתיות ופיתוח",
  "גזברות וגביה",
  "ארנונה",
  "חינוך",
  "הספריה הציבורית",
  "תברואה ורישוי עסקים",
  "רכש",
  "רווחה",
  "מחלקה משפטית",
  "שירות פסיכולוגי",
  "יחידת הנוער",
  "מרכז צעירים",
  "ספורט",
  "שיטור מקומי",
  "ביטחון קהילתי",
  "מזכירות",
];

export function PublicInquiryForm() {
  const [state, formAction, pending] = useActionState(submitPublicInquiry, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 sm:p-8" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-ink-900">
            שם מלא <span aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            aria-required="true"
            className="w-full rounded-lg border border-teal-100 bg-white px-4 py-2.5 text-ink-900 focus:border-teal-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink-900">
            דואר אלקטרוני (אימייל) <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            className="w-full rounded-lg border border-teal-100 bg-white px-4 py-2.5 text-ink-900 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink-900">
            טלפון ליצירת קשר <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            aria-required="true"
            className="w-full rounded-lg border border-teal-100 bg-white px-4 py-2.5 text-ink-900 focus:border-teal-500"
          />
        </div>
        <div>
          <label htmlFor="department" className="mb-1 block text-sm font-medium text-ink-900">
            סוג המחלקה <span aria-hidden="true">*</span>
          </label>
          <select
            id="department"
            name="department"
            required
            aria-required="true"
            defaultValue=""
            className="w-full rounded-lg border border-teal-100 bg-white px-4 py-2.5 text-ink-900 focus:border-teal-500"
          >
            <option value="" disabled>
              בחר מחלקה
            </option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="file" className="mb-1 block text-sm font-medium text-ink-900">
          הוספת קובץ / צילום
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          aria-describedby="file-hint"
          className="w-full rounded-lg border border-teal-100 bg-white px-4 py-2.5 text-sm text-ink-900 file:ml-3 file:rounded-full file:border-0 file:bg-teal-700 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white"
        />
        <p id="file-hint" className="mt-1 text-xs text-ink-600">
          PDF או תמונה (JPG/PNG) בלבד, עד 10MB.
        </p>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-ink-900">
          נושא הפנייה <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="subject"
          name="subject"
          rows={5}
          required
          aria-required="true"
          className="w-full rounded-lg border border-teal-100 bg-white px-4 py-2.5 text-ink-900 focus:border-teal-500"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:opacity-60"
      >
        {pending ? "שולח..." : "שליחת הפניה"}
      </button>

      <div role="status" aria-live="polite">
        {state.status === "success" && (
          <p className="text-sm font-medium text-olive-700">{state.message}</p>
        )}
        {state.status === "error" && (
          <p className="text-sm font-medium text-red-600">{state.message}</p>
        )}
      </div>
    </form>
  );
}
