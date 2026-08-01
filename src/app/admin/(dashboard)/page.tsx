import Link from "next/link";
import { and, eq, gte, lte, desc, asc } from "drizzle-orm";
import { Plus, Gavel, Newspaper, CalendarDays, FileEdit, Clock, FileText, Users, TrendingUp, Sparkles, Eye, BarChart3 } from "lucide-react";
import { db } from "@/db";
import { news, events, tenders, forms, residents, pageViews } from "@/db/schema";

const WEEKDAY_HE = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const MONTH_HE = ["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יונ׳", "יול׳", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"];

function fmtDate(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("he-IL");
}

const GREETING_HOUR_LABEL = (h: number) => (h < 12 ? "בוקר טוב" : h < 18 ? "צהריים טובים" : "ערב טוב");

export default async function AdminDashboard() {
  const now = new Date();
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const last14Days = new Date(startOfToday.getTime() - 13 * 24 * 60 * 60 * 1000);
  const last6Months = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [
    newsPublishedCount,
    upcomingEventsCount,
    activeTendersCount,
    tenderDrafts,
    newsDrafts,
    eventDrafts,
    formsCount,
    residentsCount,
    residentsThisWeek,
    recentNews,
    recentTenders,
    upcomingEvents,
    tendersNearDeadline,
    recentResidents,
    viewsToday,
    viewsThisMonth,
    viewsLast6MonthsRaw,
  ] = await Promise.all([
    db.$count(news, eq(news.status, "published")),
    db.$count(events, and(eq(events.status, "published"), gte(events.eventDate, now))),
    db.$count(tenders, and(eq(tenders.status, "published"), eq(tenders.tenderStatus, "open"))),
    db.$count(tenders, eq(tenders.status, "draft")),
    db.$count(news, eq(news.status, "draft")),
    db.$count(events, eq(events.status, "draft")),
    db.$count(forms),
    db.$count(residents),
    db.$count(residents, gte(residents.createdAt, last7Days)),
    db.select().from(news).where(eq(news.status, "published")).orderBy(desc(news.publishedAt)).limit(5),
    db.select().from(tenders).where(eq(tenders.status, "published")).orderBy(desc(tenders.createdAt)).limit(5),
    db.select().from(events).where(and(eq(events.status, "published"), gte(events.eventDate, now))).orderBy(asc(events.eventDate)).limit(5),
    db
      .select()
      .from(tenders)
      .where(and(eq(tenders.status, "published"), eq(tenders.tenderStatus, "open"), gte(tenders.submissionDeadline, now), lte(tenders.submissionDeadline, in7Days)))
      .orderBy(asc(tenders.submissionDeadline)),
    db.select().from(residents).orderBy(desc(residents.createdAt)).limit(5),
    db.$count(pageViews, gte(pageViews.createdAt, startOfToday)),
    db.$count(pageViews, gte(pageViews.createdAt, startOfMonth)),
    db.select({ createdAt: pageViews.createdAt }).from(pageViews).where(gte(pageViews.createdAt, last6Months)),
  ]);

  const dailyBuckets = new Map<string, number>();
  for (let i = 0; i < 14; i++) {
    const d = new Date(last14Days.getTime() + i * 24 * 60 * 60 * 1000);
    dailyBuckets.set(d.toDateString(), 0);
  }
  const monthlyBuckets = new Map<string, number>();
  for (let i = 0; i < 6; i++) {
    const d = new Date(last6Months.getFullYear(), last6Months.getMonth() + i, 1);
    monthlyBuckets.set(`${d.getFullYear()}-${d.getMonth()}`, 0);
  }
  for (const row of viewsLast6MonthsRaw) {
    const d = new Date(row.createdAt);
    if (d >= last14Days) {
      const key = d.toDateString();
      if (dailyBuckets.has(key)) dailyBuckets.set(key, (dailyBuckets.get(key) ?? 0) + 1);
    }
    const mKey = `${d.getFullYear()}-${d.getMonth()}`;
    if (monthlyBuckets.has(mKey)) monthlyBuckets.set(mKey, (monthlyBuckets.get(mKey) ?? 0) + 1);
  }
  const dailyChart = Array.from(dailyBuckets.entries()).map(([key, count]) => {
    const d = new Date(key);
    return { label: WEEKDAY_HE[d.getDay()], date: fmtDate(d), count };
  });
  const monthlyChart = Array.from(monthlyBuckets.entries()).map(([key, count]) => {
    const [, month] = key.split("-").map(Number);
    return { label: MONTH_HE[month], count };
  });
  const dailyMax = Math.max(1, ...dailyChart.map((d) => d.count));
  const monthlyMax = Math.max(1, ...monthlyChart.map((d) => d.count));

  const draftCount = tenderDrafts + newsDrafts + eventDrafts;

  const recentlyPublished = [
    ...recentNews.map((n) => ({ type: "כתבה", title: n.title, date: n.publishedAt, href: `/admin/news/${n.id}` })),
    ...recentTenders.map((t) => ({ type: "מכרז", title: t.title, date: t.createdAt, href: `/admin/tenders/${t.id}` })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const stats = [
    { label: "מכרזים פעילים", value: activeTendersCount, icon: Gavel, gradient: "linear-gradient(155deg, #1e5266, #12323d)" },
    { label: "חדשות שפורסמו", value: newsPublishedCount, icon: Newspaper, gradient: "linear-gradient(155deg, #2c6a76, #1a4553)" },
    { label: "אירועים קרובים", value: upcomingEventsCount, icon: CalendarDays, gradient: "linear-gradient(155deg, #d99a3d, #c07f2c)" },
    { label: "טפסים באתר", value: formsCount, icon: FileText, gradient: "linear-gradient(155deg, #417c79, #1e5266)" },
    {
      label: "משתמשים רשומים",
      value: residentsCount,
      icon: Users,
      gradient: "linear-gradient(155deg, #8ec640, #6ea52f)",
      delta: residentsThisWeek > 0 ? `+${residentsThisWeek} השבוע` : undefined,
    },
    { label: "טיוטות ממתינות", value: draftCount, icon: FileEdit, gradient: "linear-gradient(155deg, #c07f2c, #a8641f)" },
  ];

  const quickActions = [
    { label: "מכרז חדש", href: "/admin/tenders/new", icon: Gavel },
    { label: "כתבה חדשה", href: "/admin/news/new", icon: Newspaper },
    { label: "אירוע חדש", href: "/admin/events/new", icon: CalendarDays },
    { label: "טופס חדש", href: "/admin/forms/new", icon: FileText },
  ];

  return (
    <div className="space-y-8">
      <div className="admin-shadow-raised relative overflow-hidden rounded-3xl p-6 sm:p-8" style={{ background: "linear-gradient(135deg, #12323d 0%, #1e5266 55%, #0c2346 100%)" }}>
        <div
          className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #d99a3d 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #8ec640 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative flex flex-wrap items-center gap-2 text-xs font-semibold text-white/70">
          <Sparkles size={14} aria-hidden="true" />
          {GREETING_HOUR_LABEL(now.getHours())}
        </div>
        <h2 className="relative mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">לוח בקרה</h2>
        <p className="relative mt-1.5 max-w-xl text-sm leading-6 text-white/75">סקירה כללית של התוכן, הפרסומים והפעילות באתר המועצה — עדכני נכון לרגע זה.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="admin-shadow-card group relative overflow-hidden rounded-2xl bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
              style={{ background: s.gradient }}
              aria-hidden="true"
            >
              <s.icon size={18} />
            </span>
            <div className="text-3xl font-bold tracking-tight text-teal-900">{s.value}</div>
            <div className="mt-1 text-sm text-ink-600">{s.label}</div>
            {"delta" in s && s.delta && (
              <div className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-olive-700">
                <TrendingUp size={11} aria-hidden="true" />
                {s.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="admin-shadow-card rounded-2xl bg-white p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-teal-900">
            <BarChart3 size={16} className="text-gold-700" aria-hidden="true" />
            תנועה באתר
          </h3>
          <div className="flex items-center gap-4 text-xs text-ink-600">
            <span className="flex items-center gap-1.5">
              <Eye size={13} className="text-teal-600" aria-hidden="true" />
              <strong className="text-base font-bold text-teal-900">{viewsToday}</strong> כניסות היום
            </span>
            <span className="flex items-center gap-1.5">
              <Eye size={13} className="text-teal-600" aria-hidden="true" />
              <strong className="text-base font-bold text-teal-900">{viewsThisMonth}</strong> כניסות החודש
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium text-ink-600">כניסות ב-14 הימים האחרונים</p>
            <div className="flex h-28 items-end gap-1.5">
              {dailyChart.map((d, i) => (
                <div key={i} className="group relative flex flex-1 flex-col items-center justify-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-teal-700 to-teal-500 transition-all group-hover:from-teal-800 group-hover:to-teal-600"
                    style={{ height: `${(d.count / dailyMax) * 100}%`, minHeight: d.count > 0 ? "3px" : "1px" }}
                    title={`${d.date}: ${d.count}`}
                  />
                  <span className="pointer-events-none absolute -top-6 rounded bg-teal-900 px-1.5 py-0.5 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {d.count}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex gap-1.5 text-[10px] text-ink-600">
              {dailyChart.map((d, i) => (
                <span key={i} className="flex-1 text-center">
                  {i % 2 === 0 ? d.label[0] : ""}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-ink-600">כניסות ב-6 החודשים האחרונים</p>
            <div className="flex h-28 items-end gap-3">
              {monthlyChart.map((m, i) => (
                <div key={i} className="group relative flex flex-1 flex-col items-center justify-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-gold-600 to-gold-500 transition-all group-hover:opacity-90"
                    style={{ height: `${(m.count / monthlyMax) * 100}%`, minHeight: m.count > 0 ? "3px" : "1px" }}
                    title={`${m.label}: ${m.count}`}
                  />
                  <span className="pointer-events-none absolute -top-6 rounded bg-teal-900 px-1.5 py-0.5 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {m.count}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex gap-3 text-[10px] text-ink-600">
              {monthlyChart.map((m, i) => (
                <span key={i} className="flex-1 text-center">
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink-600">פעולות מהירות</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="admin-shadow-card group flex items-center gap-3 rounded-2xl bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105"
                style={{ background: "linear-gradient(155deg, #2c6a76, #1e5266)" }}
                aria-hidden="true"
              >
                <a.icon size={17} />
              </span>
              <span className="flex min-w-0 flex-1 items-center justify-between gap-1">
                <span className="truncate text-sm font-semibold text-teal-900">{a.label}</span>
                <Plus size={15} className="shrink-0 text-teal-600 transition-transform duration-300 group-hover:rotate-90" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="admin-shadow-card rounded-2xl bg-white p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-teal-900">
            <FileEdit size={16} className="text-gold-700" aria-hidden="true" />
            פורסמו לאחרונה
          </h3>
          {recentlyPublished.length === 0 ? (
            <p className="text-sm text-ink-600">אין פריטים שפורסמו עדיין.</p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {recentlyPublished.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="flex items-center justify-between gap-2 py-2.5 text-sm transition-colors hover:text-teal-700">
                    <span className="truncate text-ink-900">{item.title}</span>
                    <span className="shrink-0 rounded-full bg-cream-50 px-2 py-0.5 text-[11px] font-medium text-ink-600">{item.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-shadow-card rounded-2xl bg-white p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-teal-900">
            <CalendarDays size={16} className="text-gold-700" aria-hidden="true" />
            אירועים קרובים
          </h3>
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-ink-600">אין אירועים קרובים.</p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {upcomingEvents.map((e) => (
                <li key={e.id}>
                  <Link href={`/admin/events/${e.id}`} className="flex items-center justify-between gap-2 py-2.5 text-sm transition-colors hover:text-teal-700">
                    <span className="truncate text-ink-900">{e.title}</span>
                    <span className="shrink-0 text-xs text-ink-600">{fmtDate(e.eventDate)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-shadow-card rounded-2xl bg-white p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-teal-900">
            <Clock size={16} className="text-gold-700" aria-hidden="true" />
            מכרזים המתקרבים לסיום (7 ימים)
          </h3>
          {tendersNearDeadline.length === 0 ? (
            <p className="text-sm text-ink-600">אין מכרזים עם מועד הגשה קרוב.</p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {tendersNearDeadline.map((t) => (
                <li key={t.id}>
                  <Link href={`/admin/tenders/${t.id}`} className="flex items-center justify-between gap-2 py-2.5 text-sm transition-colors hover:text-teal-700">
                    <span className="truncate text-ink-900">{t.title}</span>
                    <span className="shrink-0 text-xs font-semibold text-red-600">{fmtDate(t.submissionDeadline)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-shadow-card rounded-2xl bg-white p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-teal-900">
            <Users size={16} className="text-gold-700" aria-hidden="true" />
            נרשמו לאחרונה
          </h3>
          {recentResidents.length === 0 ? (
            <p className="text-sm text-ink-600">אין עדיין משתמשים רשומים.</p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {recentResidents.map((r) => (
                <li key={r.id}>
                  <Link href="/admin/residents" className="flex items-center justify-between gap-2 py-2.5 text-sm transition-colors hover:text-teal-700">
                    <span className="truncate text-ink-900">{r.name}</span>
                    <span className="shrink-0 text-xs text-ink-600">{fmtDate(r.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
