import { getActiveTickerItems } from "@/db/queries";
import { getServerLocale } from "@/i18n/get-locale";
import { TickerCarousel } from "./TickerCarousel";

export async function NewsTicker() {
  const [items, locale] = await Promise.all([getActiveTickerItems(), getServerLocale()]);
  if (items.length === 0) return null;

  return (
    <div className="mt-6">
      <TickerCarousel items={items} locale={locale} />
    </div>
  );
}
