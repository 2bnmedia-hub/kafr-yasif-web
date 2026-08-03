import { NextResponse, type NextRequest } from "next/server";
import { eq, and, gt } from "drizzle-orm";
import { db } from "@/db";
import { adminSessions } from "@/db/schema";

// Matches the styling of src/app/(public)/not-found.tsx — kept as static markup (not a redirect
// or rewrite into the app) because a malformed request path crashes Next's own router again if
// it re-enters routing in any way, even to resolve a clean rewrite target.
const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8" />
<meta name="robots" content="noindex, nofollow" />
<title>העמוד המבוקש לא נמצא</title>
<style>
  body { font-family: system-ui, sans-serif; background: #fff; color: #12323d; margin: 0; }
  .wrap { max-width: 40rem; margin: 0 auto; padding: 6rem 1rem; text-align: center; }
  .code { font-size: 0.875rem; font-weight: 700; color: #1e5266; }
  h1 { font-size: 1.5rem; font-weight: 700; margin: 0.5rem 0; }
  p { color: #47585f; }
  a { display: inline-block; margin-top: 1rem; background: #1e5266; color: #fff; text-decoration: none;
      padding: 0.6rem 1.5rem; border-radius: 999px; font-weight: 600; font-size: 0.875rem; }
</style>
</head>
<body>
  <div class="wrap">
    <p class="code">404</p>
    <h1>העמוד המבוקש לא נמצא</h1>
    <p>ייתכן שהקישור שגוי או שהעמוד הוסר. ניתן לחזור לדף הבית או לחפש את מה שחיפשת.</p>
    <a href="/">דף בית</a>
  </div>
</body>
</html>`;

/**
 * Known malformed-URL variants seen in production logs, mapped to their correct canonical path.
 * Keyed by the exact raw (still percent-encoded) pathname as received — populate from raw request
 * logs when a specific bad encoding is confirmed. Anything not listed here still gets a safe 404
 * (never a 500) via the decode guard below.
 */
const LEGACY_PATH_REDIRECTS: Record<string, string> = {};

/**
 * Enforced (not Report-Only) CSP, nonce-based for scripts. A fresh nonce per request means an
 * attacker who manages to inject a <script> tag can't get it to execute — they'd have to guess
 * the nonce, which is why it must be unique and unpredictable every time (see the Next.js CSP
 * guide, node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md).
 *
 * style-src keeps 'unsafe-inline' deliberately: nonces do not cover inline style="..." attributes
 * (only <style> elements/CSS-in-JS), and this app uses inline style={{}} props in ~20 components
 * for one-off dynamic values (gradients, computed positions). Inline style injection is a much
 * narrower attack surface than inline script injection (no code execution, at most a CSS-based
 * data-exfiltration/UI-redress vector) — tightening script-src is what actually matters for XSS,
 * and is a standard, widely-accepted trade-off rather than a compromise unique to this app.
 *
 * Every route in this app already renders dynamically (locale detection reads a cookie in
 * getServerLocale, which forces dynamic rendering on its own) except /robots.txt and /sitemap.xml,
 * neither of which serve HTML — so the "nonces require dynamic rendering" cost the Next.js docs
 * warn about doesn't apply here; this isn't giving up any static optimization that existed before.
 */
function buildCspHeader(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://connect.facebook.net https://static.hotjar.com https://www.clarity.ms`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://*.public.blob.vercel-storage.com https://www.facebook.com",
    "font-src 'self' data:",
    "connect-src 'self' https://api.open-meteo.com https://marine-api.open-meteo.com https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://www.clarity.ms https://c.clarity.ms https://www.facebook.com https://www.google-analytics.com https://analytics.google.com",
    "frame-src 'self' https://www.facebook.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/**
 * Default-deny gate for every /admin and /api/admin path (except the login page/action itself).
 * This is a network-boundary backstop, not the only check — each server action and route handler
 * still verifies its own capability (see src/lib/permissions.ts), since Server Actions are POSTs
 * to their page route and don't get their own proxy matcher entry. What this gate buys is: a new
 * /admin or /api/admin route that someone forgets to gate individually is still blocked by
 * default, rather than silently open until someone notices.
 */
const ADMIN_LOGIN_PATHS = new Set(["/admin/login"]);
// The accept-invite page/action is for someone who doesn't have an account yet — no session to
// check. The token itself is the credential there (see acceptInviteAction's own validation).
const ADMIN_PUBLIC_PREFIXES = ["/admin/invite/"];

function isPublicAdminPath(pathname: string): boolean {
  return ADMIN_LOGIN_PATHS.has(pathname) || ADMIN_PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

async function hasValidAdminSession(request: NextRequest): Promise<boolean> {
  const sessionId = request.cookies.get("admin_session")?.value;
  if (!sessionId) return false;
  const rows = await db
    .select({ id: adminSessions.id })
    .from(adminSessions)
    .where(and(eq(adminSessions.id, sessionId), gt(adminSessions.expiresAt, new Date())))
    .limit(1);
  return rows.length > 0;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminArea = pathname.startsWith("/admin") && !isPublicAdminPath(pathname);
  const isAdminApi = pathname.startsWith("/api/admin");
  if (isAdminArea || isAdminApi) {
    const authenticated = await hasValidAdminSession(request);
    if (!authenticated) {
      if (isAdminApi) {
        return NextResponse.json({ error: "לא מורשה. יש להתחבר מחדש." }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  const redirectTo = LEGACY_PATH_REDIRECTS[pathname];
  if (redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, request.url), 301);
  }

  // Next's router calls decodeURIComponent on each dynamic-segment param before a page ever
  // runs, and throws an uncaught DecodeError (-> 500) when the request path contains malformed
  // percent-encoding (e.g. Hebrew text percent-encoded in a legacy single-byte charset instead
  // of UTF-8). Proxy runs before that routing step, so this is the only place that can turn a
  // malformed path into a controlled 404 instead of letting it crash the route.
  try {
    decodeURIComponent(pathname);
  } catch {
    // Answer directly rather than rewriting/redirecting into the app: Next's own downstream
    // route resolution re-decodes the original request path even after a rewrite target is
    // set, so anything that re-enters Next's router still hits the same crash. Proxy is the
    // only layer that can see the malformed bytes without ever handing them back to Next.
    return new NextResponse(NOT_FOUND_HTML, {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Buffer.from(...).toString('base64') per the Next.js CSP guide — crypto.randomUUID() alone
  // isn't base64 and Next expects to parse a 'nonce-{value}' token out of the CSP header value.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = buildCspHeader(nonce);

  // Setting the CSP (and x-nonce) on the *request* headers, not just the response, is what lets
  // Next.js's own renderer read it back out and auto-apply the nonce to framework scripts and to
  // any <Script nonce={...}> we set explicitly from a Server Component further down the tree.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("x-pathname", pathname);
  response.headers.set("Content-Security-Policy", cspHeader);

  // Non-production environments (temporary domains, previews) must never be indexed.
  if (process.env.NEXT_PUBLIC_SITE_ENV !== "production") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
