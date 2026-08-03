import { redirect } from "next/navigation";
import Image from "next/image";
import { getCurrentAdmin, getPendingMfaSession } from "@/lib/auth";
import { SetupTotpForm } from "./SetupTotpForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function SetupMfaPage() {
  const verified = await getCurrentAdmin();
  const pending = verified ? null : await getPendingMfaSession();
  const admin = verified ?? pending?.user;
  if (!admin) redirect("/admin/login");
  if (admin.totpEnabled && pending) redirect("/admin/mfa/verify");

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
          <h1 className="text-lg font-bold text-teal-900">הגדרת אימות דו-שלבי</h1>
          <p className="mt-1 text-sm text-ink-600">
            {pending && !verified
              ? "חובה לתפקיד מנהל אתר — יש להשלים לפני המשך השימוש במערכת."
              : "יש לסרוק את הקוד עם אפליקציית אימות (Google Authenticator, Authy וכדומה)."}
          </p>
        </div>
        <SetupTotpForm isForced={!!pending && !verified} />
      </div>
    </div>
  );
}
