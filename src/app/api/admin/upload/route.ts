import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { getCurrentAdmin } from "@/lib/auth";
import { db } from "@/db";
import { media } from "@/db/schema";
import { MAX_FILE_SIZE_BYTES, validateUploadedFile, type UploadKind } from "@/lib/upload-validation";

export const runtime = "nodejs";

const VALID_KIND_GROUPS: Record<string, UploadKind[]> = {
  image: ["image"],
  document: ["pdf", "document"],
  any: ["image", "pdf", "document"],
};

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "לא מורשה. יש להתחבר מחדש." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const group = String(formData.get("group") ?? "any");
  const allowedKinds = VALID_KIND_GROUPS[group] ?? VALID_KIND_GROUPS.any;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "לא נשלח קובץ." }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "הקובץ ריק." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { error: `הקובץ גדול מדי (מקסימום ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB).` },
      { status: 413 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const validation = await validateUploadedFile(buffer, file.name, allowedKinds);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.reason }, { status: 415 });
  }

  let width: number | undefined;
  let height: number | undefined;
  if (validation.kind === "image") {
    try {
      const sharp = (await import("sharp")).default;
      const meta = await sharp(buffer).metadata();
      width = meta.width;
      height = meta.height;
    } catch {
      // Non-fatal — dimensions are informational only.
    }
  }

  const safeExt = validation.extension;
  const pathname = `${validation.kind}s/${Date.now()}-${randomUUID()}.${safeExt}`;

  const blob = await put(pathname, buffer, {
    access: "public",
    contentType: validation.mimeType,
  });

  const [row] = await db
    .insert(media)
    .values({
      filename: file.name,
      url: blob.url,
      kind: validation.kind,
      mimeType: validation.mimeType,
      sizeBytes: file.size,
      width,
      height,
    })
    .returning();

  return NextResponse.json({ media: row });
}
