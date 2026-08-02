/** Permanent, unmissable banner so a staging page can never be mistaken for an official
 *  publication — required whenever NEXT_PUBLIC_SITE_ENV=staging. See CONTRIBUTING.md. */
export function StagingBanner() {
  if (process.env.NEXT_PUBLIC_SITE_ENV !== "staging") return null;

  return (
    <div
      role="banner"
      className="sticky top-0 z-50 bg-amber-500 px-4 py-2 text-center text-sm font-bold text-amber-950"
    >
      סביבת בדיקה — אין להסתמך על התוכן
    </div>
  );
}
