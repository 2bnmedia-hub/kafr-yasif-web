import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { events } from "@/db/schema";
import { asc } from "drizzle-orm";
import { EventsAdminTableBody } from "@/components/admin/EventsAdminTableBody";
import { deleteEventAction, reorderEventsAction } from "@/app/actions/admin-events";

function fmtDate(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("he-IL");
}

export default async function AdminEventsPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view = "upcoming" } = await searchParams;
  const all = await db.select().from(events).orderBy(asc(events.sortOrder), asc(events.id));
  const now = new Date();

  const filtered = all.filter((e) => {
    if (view === "archive") return e.eventDate && new Date(e.eventDate) < now;
    return !e.eventDate || new Date(e.eventDate) >= now;
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-teal-900">{view === "archive" ? "ארכיון אירועים" : "אירועים בכפר"}</h2>
          <p className="text-sm text-ink-600">{filtered.length} אירועים</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="admin-shadow-card flex gap-1 rounded-full bg-white p-1">
            <Link href="/admin/events?view=upcoming" className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${view !== "archive" ? "bg-teal-700 text-white" : "text-teal-900 hover:bg-teal-100"}`}>
              קרובים
            </Link>
            <Link href="/admin/events?view=archive" className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${view === "archive" ? "bg-teal-700 text-white" : "text-teal-900 hover:bg-teal-100"}`}>
              ארכיון
            </Link>
          </div>
          <Link
            href="/admin/events/new"
            className="admin-shadow-card flex items-center gap-1.5 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg"
          >
            <Plus size={16} aria-hidden="true" />
            אירוע חדש
          </Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-shadow-card rounded-2xl bg-white p-10 text-center text-sm text-ink-600">אין אירועים להצגה.</div>
      ) : (
        <div className="admin-shadow-card overflow-x-auto rounded-2xl bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-ink-600">
              <tr className="text-right">
                <th className="w-8 px-2 py-3" />
                <th className="px-4 py-3 font-semibold">שם האירוע</th>
                <th className="px-4 py-3 font-semibold">תאריך</th>
                <th className="px-4 py-3 font-semibold">מיקום</th>
                <th className="px-4 py-3 font-semibold">הרשמה</th>
                <th className="px-4 py-3 font-semibold">סטטוס</th>
                <th className="px-4 py-3 font-semibold">פעולות</th>
              </tr>
            </thead>
            <EventsAdminTableBody
              allIds={all.map((e) => e.id)}
              reorderAction={reorderEventsAction}
              rows={filtered.map((e) => ({
                id: e.id,
                title: e.title,
                date: fmtDate(e.eventDate),
                location: e.location,
                registrationRequired: e.registrationRequired,
                status: e.status,
                slug: e.slug,
                deleteAction: deleteEventAction.bind(null, e.id),
              }))}
            />
          </table>
        </div>
      )}
    </div>
  );
}
