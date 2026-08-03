"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { beginTotpEnrollmentAction, confirmTotpEnrollmentAction } from "@/app/actions/admin-mfa";

export function SetupTotpForm({ isForced }: { isForced: boolean }) {
  const router = useRouter();
  const [secret, setSecret] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    beginTotpEnrollmentAction()
      .then(({ secret, qrDataUrl }) => {
        setSecret(secret);
        setQrDataUrl(qrDataUrl);
      })
      .catch(() => setError("שגיאה ביצירת קוד ההגדרה. יש לרענן את הדף."));
  }, []);

  function handleSubmit(formData: FormData) {
    setError(null);
    const code = String(formData.get("code") ?? "");
    startTransition(async () => {
      const result = await confirmTotpEnrollmentAction(code);
      if (result.ok) {
        router.push("/admin");
      } else {
        setError(result.error);
      }
    });
  }

  if (!secret || !qrDataUrl) {
    return <p className="text-center text-sm text-ink-600">{error ?? "טוען..."}</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        {/* Data URL generated server-side by the qrcode package — not a remote image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt="קוד QR להגדרת אימות דו-שלבי" width={200} height={200} className="rounded-xl" />
      </div>
      <div className="rounded-lg bg-cream-50/60 px-3 py-2 text-center text-xs text-ink-600">
        <p className="mb-1">לא ניתן לסרוק? יש להזין ידנית:</p>
        <code dir="ltr" className="break-all font-mono text-ink-900">
          {secret}
        </code>
      </div>
      <form action={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="code" className="mb-1 block text-sm font-medium text-ink-900">
            קוד אימות מהאפליקציה
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
            className="w-full rounded-xl border border-teal-100 bg-cream-50/60 px-4 py-2.5 text-center text-lg tracking-[0.3em] text-ink-900 transition-colors focus:border-teal-500 focus:bg-white"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="admin-shadow-card w-full rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-800 hover:shadow-lg disabled:opacity-60"
        >
          {isPending ? "מאמת..." : isForced ? "אישור והמשך" : "הפעלת אימות דו-שלבי"}
        </button>
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
