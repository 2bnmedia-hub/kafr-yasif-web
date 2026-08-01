import Image from "next/image";
import Link from "next/link";
import { getFooterLinks, getSiteSettings } from "@/db/queries";
import { FacebookIcon, WhatsAppIcon, TikTokIcon, InstagramIcon } from "./SocialIcons";
import { InfoCenterIcon, DepartmentsIcon, ResidentServiceIcon, SecurityIcon } from "@/components/icons/FooterCategoryIcons";
import { getServerLocale } from "@/i18n/get-locale";
import { tNav } from "@/i18n/nav-translations";
import { CookieSettingsTrigger } from "@/components/cookies/CookieSettingsTrigger";

// DOM order = visual order right-to-left (first child renders rightmost in this RTL layout).
const COLUMN_ORDER = ["מרכזי מידע", "מחלקות המועצה", "שירות לתושב", "ביטחון וחירום"];

const COLUMN_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "מרכזי מידע": InfoCenterIcon,
  "מחלקות המועצה": DepartmentsIcon,
  "שירות לתושב": ResidentServiceIcon,
  "ביטחון וחירום": SecurityIcon,
};

function ColumnHeading({ title, locale }: { title: string; locale: Parameters<typeof tNav>[1] }) {
  const Icon = COLUMN_ICONS[title];
  return (
    <h2 className="mb-3 flex items-center gap-1.5 text-xs font-bold text-teal-900">
      {tNav(title, locale)}
      {Icon && <Icon size={15} className="shrink-0 text-teal-700" />}
    </h2>
  );
}

const SOCIAL_ICONS: Record<string, React.ComponentType> = {
  Facebook: FacebookIcon,
  WhatsApp: WhatsAppIcon,
  TikTok: TikTokIcon,
  Instagram: InstagramIcon,
};

export async function Footer() {
  const [settings, links, locale] = await Promise.all([getSiteSettings(), getFooterLinks(), getServerLocale()]);

  const columns = COLUMN_ORDER.map((title) => ({
    title,
    links: links.filter((l) => l.columnTitle === title),
  }));

  const heading = tNav("מועצה מקומית כפר יאסיף תמיד כאן לשירותך!", locale);
  const emailLabel = tNav("לפניות הציבור - נא לשלוח מייל לכתובת:", locale);

  return (
    <footer className="mt-16 bg-white px-4 pt-10 pb-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-white ring-1 ring-zinc-100">
        <div className="grid grid-cols-1 gap-6 px-6 py-8 text-xs sm:grid-cols-2 sm:px-8 sm:py-10 lg:grid-cols-5">
          {columns.slice(0, 3).map((col) => (
            <div key={col.title}>
              <ColumnHeading title={col.title} locale={locale} />
              <ul className="space-y-1.5 text-xs text-ink-600">
                {col.links.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className="hover:text-teal-700 hover:underline">
                      {tNav(link.label, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            {columns.slice(3, 4).map((col) => (
              <div key={col.title}>
                <ColumnHeading title={col.title} locale={locale} />
                <ul className="space-y-1.5 text-xs text-ink-600">
                  {col.links.map((link) => (
                    <li key={link.id}>
                      <Link href={link.href} className="hover:text-teal-700 hover:underline">
                        {tNav(link.label, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <h3 className="mt-4 mb-1.5 text-xs font-bold text-teal-900">{tNav("שעות פעילות", locale)}</h3>
            <ul className="space-y-0.5 text-xs text-ink-600">
              {settings.hours.map((h) => (
                <li key={h.days}>
                  {tNav(h.days, locale)} : {h.hours}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-bold text-teal-900">{heading}</h2>
            <address className="not-italic text-xs leading-6 text-ink-600">
              {settings.address}
              <br />
              <a href={`tel:${settings.phone}`} className="hover:text-teal-700">
                {settings.phone}
              </a>
            </address>
            <p className="mt-3 text-xs text-ink-600">
              {emailLabel}
              <br />
              <a href={`mailto:${settings.email}`} className="text-teal-700 hover:underline">
                {settings.email}
              </a>
            </p>
            <h3 className="mt-3 mb-1.5 text-xs font-bold text-teal-900">{tNav("עקבו אחרינו", locale)}</h3>
            <div className="flex flex-wrap gap-2.5">
              {settings.socialLinks.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="rounded-full transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105 focus-visible:-translate-y-0.5 focus-visible:scale-105"
                  >
                    {Icon ? <Icon /> : s.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative mx-3 mb-3 h-56 overflow-hidden rounded-2xl sm:mx-4 sm:mb-4 sm:h-72">
          <Image
            src="/images/lobby.jpg"
            alt={tNav("לובי בניין המועצה המקומית כפר יאסיף", locale)}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-7xl border-t border-zinc-100 px-4 pt-6 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-medium text-ink-600">{tNav("© כל הזכויות שמורות למועצה המקומית כפר יאסיף", locale)}</p>

        <nav aria-label={tNav("קישורים משפטיים", locale)} className="mt-2.5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs">
          <Link href="/הצהרת-נגישות" className="rounded-full px-2 py-1 font-medium text-ink-600 underline decoration-transparent underline-offset-4 transition-colors hover:text-teal-700 hover:decoration-teal-700">
            {tNav("הצהרת נגישות", locale)}
          </Link>
          <span className="text-zinc-300" aria-hidden="true">●</span>
          <Link href="/תנאי-שימוש" className="rounded-full px-2 py-1 font-medium text-ink-600 underline decoration-transparent underline-offset-4 transition-colors hover:text-teal-700 hover:decoration-teal-700">
            {tNav("תנאי שימוש", locale)}
          </Link>
          <span className="text-zinc-300" aria-hidden="true">●</span>
          <Link href="/מדיניות-פרטיות" className="rounded-full px-2 py-1 font-medium text-ink-600 underline decoration-transparent underline-offset-4 transition-colors hover:text-teal-700 hover:decoration-teal-700">
            {tNav("מדיניות פרטיות", locale)}
          </Link>
          <span className="text-zinc-300" aria-hidden="true">●</span>
          <CookieSettingsTrigger />
        </nav>

        <p className="mx-auto mt-3 max-w-3xl text-[11px] leading-relaxed text-ink-600/70">
          {tNav(
            "האתר מספק מידע כללי בלבד. הנוסח המחייב הוא בהוראות הדין הקבוע ולא הרלוונטיות כפי שתהיינה בתוקף מעת לעת.",
            locale
          )}
        </p>

        <p className="mt-3 pb-2 text-xs text-ink-600">
          <a href="https://2bnmedia.com" className="font-semibold text-teal-900 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-teal-900">
            2BNmedia.com
          </a>{" "}
          {tNav('בניה, עיצוב ותחזוקה ע"י', locale)}
        </p>
      </div>
    </footer>
  );
}
