# תהליך עבודה — kafr-yasif-web

## זרימת הדיפלוי

```
staging (ענף) → Pull Request → main → Production
```

- **staging** — ענף קבוע, מוגדר כ-Preview branch קבוע ב-Vercel. כל שינוי נבדק כאן קודם, מול תוכן שהועתק
  מ-production (ראו `scripts/seed-staging.ts`) ולעולם לא מול מידע אישי אמיתי של תושבים.
- **Pull Request ל-main** — כל שינוי עובר PR. ה-workflow ב-`.github/workflows/ci.yml` רץ אוטומטית על
  כל PR ובודק: build, lint, `npm audit` (ללא vulnerabilities ברמת high+ בתלויות production), וסריקת
  נגישות (axe) על מדגם עמודים מייצג. PR עם בדיקה שנכשלה לא ממוזג.
- **main → Production** — **פרודקשן עולה אך ורק דרך אינטגרציית ה-GitHub של Vercel, כתוצאה ממיזוג ל-main.**

## אין דיפלוי ידני

**אסור** להריץ `vercel --prod` (או כל דיפלוי ידני אחר) ממחשב מקומי. כל דיפלוי לפרודקשן חייב להגיע מ-commit
שמוזג ל-`main` דרך PR ב-GitHub, כדי שתמיד יהיה ברור אילו קבצי מקור בדיוק רצים בפרודקשן (git SHA תואם
לדיפלוי — לא build עם שינויים לא-מקומיטים).

## לפני כל commit

```bash
npm run lint
npm run build      # מריץ אוטומטית גם את scripts/check-slug-typography.ts דרך prebuild
```

שני אלה חייבים לעבור נקי. `npm run build` דורש `DATABASE_URL` מוגדר (הדף `[slug]` ורבים אחרים נטענים
מה-DB גם ב-build time דרך `generateStaticParams`/`sitemap.ts`) — לפיתוח מקומי משתמשים בערכים מ-`.env.local`,
ולעולם לא מצביעים על מסד production.

## סודות נדרשים ב-GitHub Actions

כדי ש-CI (build + סריקת נגישות) יעבוד, יש להגדיר secret בשם `STAGING_DATABASE_URL` תחת
Settings → Secrets and variables → Actions ברמת הריפו, ולהצביע אותו על ה-branch של Neon
המשמש את סביבת ה-staging (ולא production בשום מצב).

## סביבות

| סביבה | branch | דומיין | מסד נתונים | אינדוקס |
|---|---|---|---|---|
| Development | מקומי | localhost | Neon dev (לפי `.env.local`) | לא רלוונטי |
| Staging | `staging` | preview URL של Vercel | Neon branch נפרד, Preview-scoped | חסום (`noindex` + `X-Robots-Tag`) |
| Production | `main` | הדומיין הפעיל בפועל | Neon production | לפי `NEXT_PUBLIC_SITE_ENV=production` בלבד |
