import Link from "next/link";
import NextImage from "next/image";
import type { ReactNode } from "react";
import { FileText, Download, ExternalLink, Phone, Printer, Mail, User, type LucideIcon } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export function PageArticle({ children }: { children: ReactNode }) {
  return <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">{children}</article>;
}

export function Breadcrumb({ title, locale = "he" }: { title: string; locale?: Locale }) {
  const dict = getDictionary(locale);
  return (
    <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-teal-700 hover:underline">
            {dict.common.backHome}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-medium text-teal-900">
          {title}
        </li>
      </ol>
    </nav>
  );
}

export function Hero({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="mb-8 rounded-2xl px-6 py-10 sm:px-10 sm:py-12"
      style={{ background: "linear-gradient(135deg, #12323d 0%, #1e5266 100%)" }}
    >
      <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 text-lg font-medium text-teal-100">{subtitle}</p>}
      {children && <div className="mt-4 max-w-2xl leading-7 text-teal-100/90">{children}</div>}
    </div>
  );
}

/** Wide banner image that links out to an external site (opens in a new tab). */
export function LinkedBanner({ src, alt, href }: { src: string; alt: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 mb-6 block overflow-hidden rounded-2xl shadow-sm ring-1 ring-zinc-100 transition-opacity hover:opacity-90"
    >
      <div className="relative aspect-[840/252] w-full">
        <NextImage src={src} alt={alt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
      </div>
    </a>
  );
}

export function SectionCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

export function IconBadge({ icon: Icon, color = "#1e5266" }: { icon: LucideIcon; color?: string }) {
  return (
    <span
      className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `linear-gradient(155deg, ${color}22 0%, ${color}0a 100%)`,
        boxShadow: `0 4px 14px ${color}26, inset 0 0 0 1px ${color}29`,
      }}
    >
      <Icon size={22} strokeWidth={1.75} color={color} aria-hidden="true" />
    </span>
  );
}

export function NumberedSection({
  index,
  icon: Icon,
  title,
  children,
}: {
  index: number;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <SectionCard>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700/10 font-bold text-teal-700">
          {index}
        </span>
        <h2 className="flex items-center gap-2 text-lg font-bold text-teal-900">
          <Icon size={18} className="text-teal-700" aria-hidden="true" />
          {title}
        </h2>
      </div>
      <div className="space-y-3 ps-12">{children}</div>
    </SectionCard>
  );
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm leading-6 text-ink-600">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export type HoursRow = { days: string; hours: string | null; note: string; open: boolean };

export function HoursTable({ rows }: { rows: HoursRow[] }) {
  return (
    <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl ring-1 ring-zinc-100">
      {rows.map((h) => (
        <li key={h.days} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
          <span className="font-medium text-ink-900">{h.days}</span>
          <span className="flex items-center gap-2">
            {h.hours && <span className="text-ink-600">{h.hours}</span>}
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                h.open ? "bg-olive-500/15 text-olive-700" : "bg-zinc-100 text-ink-600"
              }`}
            >
              {h.note}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export type StaffInfo = {
  name: string;
  role?: string;
  phone?: string;
  fax?: string;
  email?: string;
};

/** Compact card for a named contact (department head, office manager, etc.) */
export function StaffCard({ name, role, phone, fax, email }: StaffInfo) {
  return (
    <div className="rounded-xl bg-cream-50 p-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700/10">
          <User size={18} className="text-teal-700" aria-hidden="true" />
        </span>
        <div>
          <p className="font-bold text-teal-900">{name}</p>
          {role && <p className="text-xs text-ink-600">{role}</p>}
        </div>
      </div>
      <div className="space-y-1.5 text-sm text-ink-600">
        {phone && (
          <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-teal-700 hover:underline">
            <Phone size={14} className="shrink-0" aria-hidden="true" />
            {phone}
          </a>
        )}
        {fax && (
          <span className="flex items-center gap-2">
            <Printer size={14} className="shrink-0" aria-hidden="true" />
            {fax}
          </span>
        )}
        {email && (
          <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-teal-700 hover:underline">
            <Mail size={14} className="shrink-0" aria-hidden="true" />
            {email}
          </a>
        )}
      </div>
    </div>
  );
}

export type DocumentItem = { title: string; href?: string };

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

/** href omitted when the source file hasn't been supplied/uploaded yet — renders a "coming soon" pill instead of a dead link. External (http) hrefs open in a new tab with an "open" action instead of forcing a file download. */
export function DocumentList({ items, locale = "he" }: { items: DocumentItem[]; locale?: Locale }) {
  const dict = getDictionary(locale);
  return (
    <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl ring-1 ring-zinc-100">
      {items.map((it) => {
        const external = it.href ? isExternalHref(it.href) : false;
        return (
          <li key={it.title} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
            {it.href ? (
              <a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-ink-900 hover:text-teal-700 hover:underline"
              >
                <FileText size={16} className="shrink-0 text-teal-700" aria-hidden="true" />
                {it.title}
              </a>
            ) : (
              <span className="flex items-center gap-2 text-sm font-medium text-ink-900">
                <FileText size={16} className="shrink-0 text-teal-700" aria-hidden="true" />
                {it.title}
              </span>
            )}
            {it.href ? (
              <a
                href={it.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-teal-700 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-800"
              >
                {external ? <ExternalLink size={14} aria-hidden="true" /> : <Download size={14} aria-hidden="true" />}
                {external ? dict.common.open : dict.common.download}
              </a>
            ) : (
              <span className="shrink-0 rounded-full bg-zinc-100 px-4 py-1.5 text-xs font-medium text-ink-600">
                {dict.common.comingSoon}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
