"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavWithSubmenu } from "@/lib/nav";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { SearchModal } from "./SearchModal";
import { AuthModal } from "./AuthModal";
import { departmentIcon } from "@/components/icons/DepartmentIcons";
import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALES, LOCALE_LABEL } from "@/i18n/config";

const ICON_MENUS = new Set(["מחלקות המועצה", "שירותי תושב", "ביטחון וחירום", "מרכזי מידע"]);

const SITE_NAME: Record<string, string> = {
  he: "מועצה מקומית כפר יאסיף",
  ar: "المجلس المحلي كفر ياسيف",
  en: "Kafr Yasif Local Council",
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const authTriggerRef = useRef<HTMLButtonElement>(null);
  const { locale, setLocale, t, dict } = useLocale();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      {/* 1. thin gradient top bar */}
      <div
        className="h-[3px] w-full"
        style={{
          background: "linear-gradient(to left, #175AE2 0%, #0C2346 50%, #175AE2 100%)",
        }}
        aria-hidden="true"
      />

      {/* 2. main bar */}
      <div
        className="h-[72px] w-full bg-white"
        style={{
          boxShadow: "0 2px 24px rgba(12,35,70,0.08), 0 1px 4px rgba(12,35,70,0.04)",
        }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* 3. logo, right side in RTL */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo-100years.png"
              alt={SITE_NAME[locale]}
              width={118}
              height={69}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* 4. desktop nav */}
          <nav aria-label={dict.header.mainNav} className="hidden lg:flex">
            <ul className="flex items-center gap-1">
              {mainNavWithSubmenu.map((item) => {
                const active = pathname === item.href;
                return (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup={item.submenu && item.submenu.length > 0 ? "true" : undefined}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-200 hover:bg-[#175AE2]/5 hover:text-[#175AE2] ${
                      active ? "text-[#175AE2]" : "text-[#0C2346]"
                    }`}
                  >
                    {item.submenu && item.submenu.length > 0 && (
                      <ChevronIcon className="shrink-0 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    <span className="relative">
                      {t(item.label)}
                      <span className="absolute inset-x-0 -bottom-1 h-[2px] origin-center scale-x-0 bg-[#175AE2] transition-transform duration-[280ms] ease-out group-hover:scale-x-100" />
                    </span>
                  </Link>

                  {item.submenu && item.submenu.length > 0 && (
                    <div
                      className={`invisible absolute right-0 top-full z-20 translate-y-2 scale-95 opacity-0 transition-all duration-[220ms] ease-out group-hover:visible group-hover:translate-y-1 group-hover:scale-100 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:scale-100 group-focus-within:opacity-100 ${
                        item.submenu.length > 8 ? "w-[520px]" : "w-64"
                      }`}
                    >
                      <ul
                        className={`rounded-[14px] bg-white p-2 ${item.submenu.length > 8 ? "grid grid-cols-2 gap-x-2" : ""}`}
                        style={{
                          boxShadow: "0 4px 6px rgba(12,35,70,0.04), 0 12px 40px rgba(12,35,70,0.13)",
                        }}
                      >
                        {item.submenu.map((sub) => {
                          const DeptIcon = ICON_MENUS.has(item.label) ? departmentIcon(sub.label) : null;
                          return (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className="flex items-center gap-2 rounded-lg border-e-2 border-transparent px-3 py-2 text-sm text-[#0C2346] transition-colors duration-150 hover:border-e-[#175AE2] hover:bg-[#F0F5FF]"
                              >
                                {DeptIcon && <DeptIcon className="shrink-0 text-[#175AE2]" />}
                                {t(sub.label)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <WeatherWidget />

            <button
              ref={searchTriggerRef}
              type="button"
              aria-label={dict.search.openLabel}
              onClick={() => setSearchOpen(true)}
              className="rounded-full bg-[#175AE2]/15 p-2.5 text-[#175AE2] hover:bg-[#175AE2]/25"
            >
              <SearchIcon />
            </button>

            {searchOpen && (
              <SearchModal
                onClose={() => {
                  setSearchOpen(false);
                  searchTriggerRef.current?.focus();
                }}
              />
            )}

            <button
              ref={authTriggerRef}
              type="button"
              aria-label={dict.header.personalArea}
              onClick={() => setAuthOpen(true)}
              className="rounded-full bg-[#0C2346]/[0.04] p-2.5 text-[#0C2346] transition-colors hover:bg-[#0C2346]/10"
            >
              <UserIcon />
            </button>

            {authOpen && (
              <AuthModal
                onClose={() => {
                  setAuthOpen(false);
                  authTriggerRef.current?.focus();
                }}
              />
            )}

            <div className="group relative">
              <button
                type="button"
                aria-label={dict.header.languageChooser}
                aria-haspopup="true"
                className="rounded-full bg-[#0C2346]/[0.04] p-2.5 text-[#0C2346] transition-colors hover:bg-[#0C2346]/10"
              >
                <GlobeIcon />
              </button>
              <div
                className="invisible absolute right-0 top-full z-20 w-32 translate-y-2 scale-95 opacity-0 transition-all duration-[220ms] ease-out group-hover:visible group-hover:translate-y-1 group-hover:scale-100 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:scale-100 group-focus-within:opacity-100"
              >
                <ul
                  className="rounded-[14px] bg-white p-2"
                  style={{ boxShadow: "0 4px 6px rgba(12,35,70,0.04), 0 12px 40px rgba(12,35,70,0.13)" }}
                >
                  {LOCALES.map((code) => (
                    <li key={code}>
                      <button
                        type="button"
                        onClick={() => setLocale(code)}
                        aria-current={locale === code ? "true" : undefined}
                        className={`block w-full rounded-lg px-3 py-2 text-start text-sm transition-colors duration-150 hover:bg-[#F0F5FF] ${
                          locale === code ? "font-bold text-[#175AE2]" : "text-[#0C2346]"
                        }`}
                      >
                        {LOCALE_LABEL[code]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? dict.header.closeMenu : dict.header.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-md p-2 text-[#0C2346] hover:bg-[#175AE2]/5 lg:hidden"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* 5. mobile menu panel */}
      {menuOpen && (
        <nav id="mobile-nav" aria-label={dict.header.mobileNav} className="border-t border-black/5 bg-white lg:hidden">
          <ul className="divide-y divide-black/5 text-sm font-medium text-[#0C2346]">
            {mainNavWithSubmenu.map((item) => {
              const hasSubmenu = !!item.submenu && item.submenu.length > 0;
              const isOpen = openMobileSection === item.href;
              return (
                <li key={item.href}>
                  <div className="flex items-center justify-between">
                    {hasSubmenu && (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? dict.header.closeMenu : dict.header.openMenu} ${t(item.label)}`}
                        onClick={() => setOpenMobileSection(isOpen ? null : item.href)}
                        className="px-4 py-3"
                      >
                        <ChevronIcon className={isOpen ? "rotate-180" : ""} />
                      </button>
                    )}
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="block flex-1 px-4 py-3"
                    >
                      {t(item.label)}
                    </Link>
                  </div>
                  {hasSubmenu && isOpen && (
                    <ul className="bg-[#F8FAFF] pb-2">
                      {item.submenu!.map((sub) => {
                        const DeptIcon = ICON_MENUS.has(item.label) ? departmentIcon(sub.label) : null;
                        return (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 px-6 py-2 text-[#0C2346]/90"
                          >
                            {DeptIcon ? (
                              <DeptIcon className="shrink-0 text-[#175AE2]" />
                            ) : (
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#175AE2]" />
                            )}
                            {t(sub.label)}
                          </Link>
                        </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Language switcher, mobile */}
          <div className="border-t border-black/5 px-4 py-3">
            <p className="mb-2 text-xs font-semibold text-ink-600">{dict.header.languageChooser}</p>
            <div className="flex gap-2">
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                    locale === code ? "bg-[#175AE2] text-white" : "bg-[#F0F5FF] text-[#0C2346]"
                  }`}
                >
                  {LOCALE_LABEL[code]}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 12h17M12 3.5a13 13 0 0 1 0 17M12 3.5a13 13 0 0 0 0 17" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
