import Image from "next/image";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { getCurrentAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="admin-content-gradient min-h-screen">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/80 px-4 py-3.5 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-primary.png" alt="" width={34} height={34} className="rounded-full" />
            <div>
              <h1 className="text-sm font-bold text-teal-900 sm:text-base">ניהול האתר</h1>
              <p className="hidden text-xs text-ink-600 sm:block">מועצה מקומית כפר יאסיף</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-xs text-ink-600 sm:inline">{admin.email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-teal-900 transition-colors hover:bg-teal-100"
              >
                <LogOut size={14} aria-hidden="true" />
                התנתקות
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:flex-row lg:gap-8">
        <AdminSidebar role={admin.role} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
