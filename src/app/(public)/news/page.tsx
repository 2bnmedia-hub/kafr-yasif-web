import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedNews } from "@/db/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "חדשות ועדכונים",
  description: "חדשות, עדכונים והודעות רשמיות ממועצה מקומית כפר יאסיף.",
  alternates: { canonical: "/news" },
};

export default async function NewsListPage() {
  const items = await getPublishedNews();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-teal-900 sm:text-3xl">חדשות ועדכונים</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/news/${item.slug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-teal-100">
              <Image
                src={item.coverUrl ?? "/images/logo-100years.png"}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className={item.coverUrl ? "object-cover transition-transform duration-500 group-hover:scale-105" : "object-contain p-10"}
              />
            </div>
            <div dir="rtl" lang="ar" className="p-5">
              <h2 className="mb-2 line-clamp-2 text-lg font-bold text-teal-900">{item.title}</h2>
              <p className="line-clamp-3 text-sm leading-6 text-ink-600">{item.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
