import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { roleCan } from "@/lib/permissions";
import { getCurrentAdmin } from "@/lib/auth";

export const runtime = "nodejs";

// Attachments from public form submissions are stored as private blobs under this prefix
// (see actions/public-inquiry.ts). Scoping the proxy to that prefix means an admin session
// can only ever read submission attachments through this route, not arbitrary store pathnames.
const ALLOWED_PREFIX = "inquiry-attachments/";

/**
 * Authenticated proxy for private submission attachments. The blob itself has no public URL,
 * so this route (gated on an active admin session) is the only way to read its bytes — acting
 * as the "signed, temporary" download link required for resident-submitted files.
 */
export async function GET(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "לא מורשה. יש להתחבר מחדש." }, { status: 401 });
  }
  if (!roleCan(admin.role, "submissions:view")) {
    return NextResponse.json({ error: "אין הרשאה לצפות בפניות הציבור." }, { status: 403 });
  }

  const pathname = new URL(request.url).searchParams.get("pathname");
  if (!pathname || !pathname.startsWith(ALLOWED_PREFIX)) {
    return NextResponse.json({ error: "נתיב קובץ לא תקין." }, { status: 400 });
  }

  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200) {
    return NextResponse.json({ error: "הקובץ לא נמצא." }, { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(pathname.split("/").pop() ?? "attachment")}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
