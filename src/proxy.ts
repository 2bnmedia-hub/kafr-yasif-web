import { NextResponse, type NextRequest } from "next/server";

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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);

  // Non-production environments (temporary domains, previews) must never be indexed.
  if (process.env.NEXT_PUBLIC_SITE_ENV !== "production") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
