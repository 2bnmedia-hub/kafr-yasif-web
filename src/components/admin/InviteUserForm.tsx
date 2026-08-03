"use client";

import { useState, useTransition } from "react";
import { createInviteAction } from "@/app/actions/admin-invites";
import type { AdminRole } from "@/lib/permissions";

const ROLE_LABELS: Record<AdminRole, string> = {
  "site-admin": "מנהל אתר",
  "content-editor": "עורך תוכן",
};

export function InviteUserForm() {
  const [error, setError] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    setInviteUrl(null);
    const email = String(formData.get("email") ?? "");
    const role = formData.get("role") as AdminRole;
    startTransition(async () => {
      try {
        const { inviteUrl } = await createInviteAction(email, role);
        setInviteUrl(inviteUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "אירעה שגיאה.");
      }
    });
  }

  return (
    <div className="admin-shadow-card mb-6 rounded-2xl bg-white p-4">
      <h3 className="mb-3 text-sm font-bold text-teal-900">הזמנת משתמש חדש</h3>
      <form action={handleSubmit} className="flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="invite-email" className="mb-1 block text-xs font-medium text-ink-900">
            דוא&quot;ל
          </label>
          <input
            id="invite-email"
            name="email"
            type="email"
            required
            dir="ltr"
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm"
          />
        </div>
        <div>
          <label htmlFor="invite-role" className="mb-1 block text-xs font-medium text-ink-900">
            תפקיד
          </label>
          <select id="invite-role" name="role" defaultValue="content-editor" className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm">
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-teal-700 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
        >
          {isPending ? "יוצר הזמנה..." : "יצירת קישור הזמנה"}
        </button>
      </form>

      {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>}

      {inviteUrl && (
        <div className="mt-3 rounded-lg bg-teal-50 px-3 py-2 text-sm">
          <p className="mb-1 font-medium text-teal-900">
            ההזמנה נוצרה. יש להעתיק ולשלוח את הקישור להזמנה בעצמכם (מייל/וואטסאפ) — המערכת אינה שולחת דוא&quot;ל
            באופן אוטומטי. הקישור תקף ל-72 שעות.
          </p>
          <code dir="ltr" className="block break-all rounded bg-white px-2 py-1 text-xs text-teal-800">
            {inviteUrl}
          </code>
        </div>
      )}
    </div>
  );
}
