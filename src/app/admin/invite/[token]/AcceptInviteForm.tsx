"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { acceptInviteAction } from "@/app/actions/admin-invites";

export function AcceptInviteForm({ token, email }: { token: string; email: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirmPassword") ?? "");
    if (password !== confirm) {
      setError("הסיסמאות אינן תואמות.");
      return;
    }
    startTransition(async () => {
      const result = await acceptInviteAction(token, password);
      if (result.ok) {
        router.push("/admin/login?status=account_created");
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4" noValidate>
      <div>
        <span className="mb-1 block text-sm font-medium text-ink-900">אימייל</span>
        <p dir="ltr" className="w-full rounded-xl border border-teal-100 bg-cream-50/60 px-4 py-2.5 text-ink-600">
          {email}
        </p>
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink-900">
          סיסמה חדשה
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
          className="w-full rounded-xl border border-teal-100 bg-cream-50/60 px-4 py-2.5 text-ink-900 transition-colors focus:border-teal-500 focus:bg-white"
        />
        <p className="mt-1 text-xs text-ink-600">לפחות 12 תווים, ולא סיסמה שהופיעה בדליפות מידע ידועות.</p>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-ink-900">
          אימות סיסמה
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
          className="w-full rounded-xl border border-teal-100 bg-cream-50/60 px-4 py-2.5 text-ink-900 transition-colors focus:border-teal-500 focus:bg-white"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="admin-shadow-card w-full rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-800 hover:shadow-lg disabled:opacity-60"
      >
        {isPending ? "יוצר חשבון..." : "יצירת חשבון"}
      </button>
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
