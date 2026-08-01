import { db } from "@/db";
import { footerLinks } from "@/db/schema";
import { createFooterLinkAction, deleteFooterLinkAction } from "@/app/actions/admin-content";

const COLUMN_ORDER = ["ביטחון וחירום", "שירות לתושב", "מחלקות המועצה", "מרכזי מידע"];

export default async function AdminFooterPage() {
  const rows = await db.select().from(footerLinks).orderBy(footerLinks.sortOrder);

  return (
    <div className="max-w-3xl space-y-8">
      <h2 className="text-xl font-bold text-teal-900">קישורי פוטר</h2>
      {COLUMN_ORDER.map((col) => (
        <div key={col}>
          <h3 className="mb-3 text-lg font-bold text-teal-900">{col}</h3>
          <ul className="mb-3 divide-y divide-zinc-100 admin-shadow-card rounded-2xl bg-white ">
            {rows
              .filter((l) => l.columnTitle === col)
              .map((link) => {
                const boundDelete = deleteFooterLinkAction.bind(null, link.id);
                return (
                  <li key={link.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
                    <span>
                      {link.label} <span className="text-ink-600">({link.href})</span>
                    </span>
                    <form action={boundDelete}>
                      <button type="submit" className="font-medium text-red-600 hover:underline">
                        מחיקה
                      </button>
                    </form>
                  </li>
                );
              })}
          </ul>
          <form action={createFooterLinkAction} className="flex flex-wrap gap-2">
            <input type="hidden" name="columnTitle" value={col} />
            <input name="label" placeholder="טקסט" required className="rounded-lg border border-teal-100 px-3 py-2 text-sm" />
            <input name="href" placeholder="קישור" required className="rounded-lg border border-teal-100 px-3 py-2 text-sm" />
            <button type="submit" className="rounded-full bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800">
              הוספה
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
