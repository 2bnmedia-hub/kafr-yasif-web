import Image from "next/image";
import Link from "next/link";
import { getInviteByToken } from "@/app/actions/admin-invites";
import { AcceptInviteForm } from "./AcceptInviteForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function AcceptInvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invite = await getInviteByToken(token);

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
          <h1 className="text-lg font-bold text-teal-900">הצטרפות למערכת הניהול</h1>
          <p className="mt-1 text-sm text-ink-600">מועצה מקומית כפר יאסיף</p>
        </div>

        {invite ? (
          <AcceptInviteForm token={token} email={invite.email} />
        ) : (
          <div className="space-y-4 text-center">
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              ההזמנה אינה תקפה, פגה תוקפה, או שכבר נוצלה. יש לבקש הזמנה חדשה ממנהל האתר.
            </p>
            <Link href="/admin/login" className="text-sm font-medium text-teal-700 hover:underline">
              חזרה למסך ההתחברות
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
