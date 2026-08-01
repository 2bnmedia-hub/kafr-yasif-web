import Link from "next/link";
import { getServerLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/dictionary";

export default async function PublicNotFound() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-bold text-teal-700">404</p>
      <h1 className="text-2xl font-bold text-teal-900 sm:text-3xl">{dict.notFound.title}</h1>
      <p className="text-base text-ink-600">{dict.notFound.message}</p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-full bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
      >
        {dict.common.backHome}
      </Link>
    </div>
  );
}
