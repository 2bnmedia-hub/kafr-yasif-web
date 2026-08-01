import { getSiteSettings } from "@/db/queries";
import { updateSiteSettingsAction } from "@/app/actions/admin-content";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-2xl">
      <h2 className="mb-6 text-xl font-bold text-teal-900">הגדרות אתר ופרטי יצירת קשר</h2>
      <form action={updateSiteSettingsAction} className="space-y-5 admin-shadow-card rounded-2xl bg-white p-6 ">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink-900">כתובת</label>
          <input name="address" defaultValue={settings.address} className="w-full rounded-lg border border-teal-100 px-4 py-2.5" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink-900">טלפון</label>
            <input name="phone" defaultValue={settings.phone} className="w-full rounded-lg border border-teal-100 px-4 py-2.5" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink-900">אימייל</label>
            <input name="email" defaultValue={settings.email} className="w-full rounded-lg border border-teal-100 px-4 py-2.5" />
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-bold text-teal-900">שעות פעילות</h3>
          <div className="space-y-2">
            {settings.hours.map((h) => (
              <div key={h.days} className="flex items-center gap-3">
                <span className="w-20 text-sm text-ink-600">{h.days}</span>
                <input
                  name={`hours_${h.days}`}
                  defaultValue={h.hours}
                  className="flex-1 rounded-lg border border-teal-100 px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="rounded-full bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-800">
          שמירה
        </button>
      </form>
    </div>
  );
}
