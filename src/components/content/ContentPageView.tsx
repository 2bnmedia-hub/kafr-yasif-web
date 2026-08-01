import Image from "next/image";
import Link from "next/link";
import type { NavSection } from "@/content/pages-data";
import { sectionHrefs, sectionLabelsByLocale } from "@/content/registry";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export type ContentPageData = {
  slug: string;
  navSection: NavSection;
  navLabel: string;
  navLabelAr?: string | null;
  navLabelEn?: string | null;
  title: string;
  titleAr?: string | null;
  titleEn?: string | null;
  bodyHtml: string;
  bodyHtmlAr?: string | null;
  bodyHtmlEn?: string | null;
  images: string[];
};

function renderBody(bodyText: string) {
  const paragraphs = bodyText.split(/\n{2,}/).filter(Boolean);
  return paragraphs.map((para, i) => (
    <p key={i} className="whitespace-pre-line text-base leading-8 text-ink-600">
      {para}
    </p>
  ));
}

export function ContentPageView({ page, locale }: { page: ContentPageData; locale: Locale }) {
  const dict = getDictionary(locale);
  const sectionHref = sectionHrefs[page.navSection];
  const sectionLabel = sectionLabelsByLocale[locale][page.navSection];

  const navLabel = (locale === "ar" ? page.navLabelAr : locale === "en" ? page.navLabelEn : page.navLabel) || page.navLabel;
  const title = (locale === "ar" ? page.titleAr : locale === "en" ? page.titleEn : page.title) || page.title;
  const localizedBody = locale === "ar" ? page.bodyHtmlAr : locale === "en" ? page.bodyHtmlEn : page.bodyHtml;
  const showTranslationNotice = locale !== "he" && !localizedBody;
  const body = localizedBody || page.bodyHtml;

  return (
    <article dir={locale === "en" ? "ltr" : "rtl"} className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-teal-700 hover:underline">
              {dict.common.backHome}
            </Link>
          </li>
          {page.navSection !== "other" && (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={sectionHref} className="hover:text-teal-700 hover:underline">
                  {sectionLabel}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-teal-900">
            {navLabel}
          </li>
        </ol>
      </nav>

      <h1 className="mb-4 text-3xl font-bold text-teal-900 sm:text-4xl">{title}</h1>

      {showTranslationNotice && (
        <p className="mb-6 rounded-lg bg-gold-100 px-4 py-2.5 text-sm text-gold-700">{dict.content.translationMissing}</p>
      )}

      <div className="space-y-5">{renderBody(body)}</div>

      {page.images.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {page.images.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-xl bg-teal-100">
              <Image src={src} alt="" fill sizes="200px" className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
