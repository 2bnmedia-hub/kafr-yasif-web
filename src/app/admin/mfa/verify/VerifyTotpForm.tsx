"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { verifyTotpLoginAction } from "@/app/actions/admin-mfa";

export function VerifyTotpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    const code = String(formData.get("code") ?? "");
    startTransition(async () => {
      const result = await verifyTotpLoginAction(code);
      if (result.ok) {
        router.push("/admin");
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="code" className="mb-1 block text-sm font-medium text-ink-900">
          קוד בן 6 ספרות
        </label>
        <input
          id="code"
          name="code"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          autoComplete="one-time-code"
          autoFocus
          className="w-full rounded-xl border border-teal-100 bg-cream-50/60 px-4 py-2.5 text-center text-lg tracking-[0.3em] text-ink-900 transition-colors focus:border-teal-500 focus:bg-white"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="admin-shadow-card w-full rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-800 hover:shadow-lg disabled:opacity-60"
      >
        {isPending ? "מאמת..." : "אימות"}
      </button>
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
