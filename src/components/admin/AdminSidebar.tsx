"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gavel,
  Plus,
  Newspaper,
  CalendarDays,
  Archive,
  Settings,
  Inbox,
  Menu,
  X,
  Rss,
  FileText,
  Users,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import type { AdminRole } from "@/lib/permissions";

const SITE_ADMIN_ONLY_HREFS = new Set(["/admin/settings", "/admin/ticker", "/admin/submissions", "/admin/residents", "/admin/users"]);

const NAV_GROUPS = [
  {
    title: "ראשי",
    items: [{ label: "לוח בקרה", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "מכרזים",
    items: [
      { label: "כל המכרזים", href: "/admin/tenders", icon: Gavel },
      { label: "מכרז חדש", href: "/admin/tenders/new", icon: Plus },
    ],
  },
  {
    title: "חדשות ועדכונים",
    items: [
      { label: "כל החדשות", href: "/admin/news", icon: Newspaper },
      { label: "כתבה חדשה", href: "/admin/news/new", icon: Plus },
    ],
  },
  {
    title: "אירועים בכפר",
    items: [
      { label: "כל האירועים", href: "/admin/events", icon: CalendarDays },
      { label: "אירוע חדש", href: "/admin/events/new", icon: Plus },
      { label: "ארכיון אירועים", href: "/admin/events?view=archive", icon: Archive },
    ],
  },
  {
    title: "טפסים",
    items: [
      { label: "כל הטפסים", href: "/admin/forms", icon: FileText },
      { label: "טופס חדש", href: "/admin/forms/new", icon: Plus },
    ],
  },
  {
    title: "הגדרות",
    items: [
      { label: "הגדרות אתר", href: "/admin/settings", icon: Settings },
      { label: "רצועת חדשות", href: "/admin/ticker", icon: Rss },
      { label: "פניות שהתקבלו", href: "/admin/submissions", icon: Inbox },
      { label: "משתמשים רשומים", href: "/admin/residents", icon: Users },
      { label: "משתמשי מערכת", href: "/admin/users", icon: ShieldCheck },
    ],
  },
  {
    title: "החשבון שלי",
    items: [{ label: "אימות דו-שלבי", href: "/admin/mfa/setup", icon: KeyRound }],
  },
];

function NavLinks({ onNavigate, role }: { onNavigate?: () => void; role: AdminRole }) {
  const pathname = usePathname();
  return (
    <div className="space-y-7">
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <h2 className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-white/35">{group.title}</h2>
          <ul className="space-y-0.5 text-sm">
            {group.items
              .filter((item) => role === "site-admin" || !SITE_ADMIN_ONLY_HREFS.has(item.href))
              .map((item) => {
              const active = pathname === item.href.split("?")[0];
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-medium transition-all ${
                      active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white/90"
                    }`}
                  >
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-1 start-0 w-[3px] rounded-full"
                        style={{ background: "linear-gradient(180deg, #d99a3d, #c07f2c)" }}
                      />
                    )}
                    <item.icon size={16} aria-hidden="true" className={`shrink-0 ${active ? "text-gold-500" : ""}`} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function AdminSidebar({ role }: { role: AdminRole }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="פתיחת תפריט ניהול"
          aria-expanded={open}
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-teal-900 shadow-sm ring-1 ring-black/5"
        >
          <Menu size={16} aria-hidden="true" />
          תפריט ניהול
        </button>
      </div>

      <nav
        aria-label="ניווט ניהול"
        className="admin-sidebar-gradient admin-shadow-raised hidden w-60 shrink-0 self-start rounded-2xl p-4 lg:sticky lg:top-6 lg:block"
      >
        <NavLinks role={role} />
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="admin-sidebar-gradient absolute inset-y-0 end-0 w-72 overflow-y-auto p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-white">תפריט ניהול</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="סגירת תפריט" className="rounded-full p-2 text-white/70 hover:bg-white/10">
                <X size={18} />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} role={role} />
          </div>
        </div>
      )}
    </>
  );
}
