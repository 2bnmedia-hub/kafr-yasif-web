import { db } from "@/db";
import { tickerItems } from "@/db/schema";
import { asc } from "drizzle-orm";
import { TickerAdminTable } from "@/components/admin/TickerAdminTable";
import { createTickerItemAction, reorderTickerItemsAction } from "@/app/actions/admin-ticker";

export default async function AdminTickerPage() {
  const rows = await db.select().from(tickerItems).orderBy(asc(tickerItems.sortOrder));

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-teal-900">רצועת חדשות (Ticker)</h2>
        <p className="text-sm text-ink-600">הטקסט הנע בראש דף הבית. ניתן להוסיף, לערוך, למחוק ולשנות סדר בגרירה.</p>
      </div>

      {rows.length > 0 ? (
        <TickerAdminTable
          rows={rows.map((r) => ({ id: r.id, text: r.text, href: r.href, active: r.active }))}
          reorderAction={reorderTickerItemsAction}
        />
      ) : (
        <div className="admin-shadow-card rounded-2xl bg-white p-10 text-center text-sm text-ink-600">אין עדיין פריטים ברצועה.</div>
      )}

      <form action={createTickerItemAction} className="admin-shadow-card flex flex-wrap items-center gap-2 rounded-2xl bg-white p-4">
        <input name="text" dir="rtl" required placeholder="טקסט חדש" className="min-w-[220px] flex-1 rounded-lg border border-teal-100 px-3 py-2 text-sm" />
        <input name="href" placeholder="קישור (אופציונלי)" className="w-40 rounded-lg border border-teal-100 px-3 py-2 text-sm" />
        <button type="submit" className="rounded-full bg-teal-700 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-800">
          הוספה
        </button>
      </form>
    </div>
  );
}
