import { redirect } from "next/navigation";
import Image from "next/image";
import { getPendingMfaSession } from "@/lib/auth";
import { VerifyTotpForm } from "./VerifyTotpForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function VerifyMfaPage() {
  const pending = await getPendingMfaSession();
  if (!pending) redirect("/admin/login");
  if (!pending.user.totpEnabled) redirect("/admin/mfa/setup");

  return (
    <div className="admin-sidebar-gradient relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 500px at 15% 15%, rgba(217,154,61,0.16), transparent), radial-gradient(700px 500px at 85% 85%, rgba(30,82,102,0.35), transparent)",
        }}
      />
      <div className="admin-shadow-raised relative w-full max-w-sm rounded-3xl bg-white p-8">
        <div className="mb-7 flex flex-col items-center text-center">
          <Image src="/images/logo-primary.png" alt="מועצה מקומית כפר יאסיף" width={64} height={64} className="mb-4 rounded-full" />
          <h1 className="text-lg font-bold text-teal-900">אימות דו-שלבי</h1>
          <p className="mt-1 text-sm text-ink-600">יש להזין את הקוד מאפליקציית האימות</p>
        </div>
        <VerifyTotpForm />
      </div>
    </div>
  );
}
