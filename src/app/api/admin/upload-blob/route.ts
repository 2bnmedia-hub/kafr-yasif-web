import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { MAX_FILE_SIZE_BYTES, GROUP_CONTENT_TYPES } from "@/lib/upload-validation";

export const runtime = "nodejs";

/**
 * Issues short-lived client-upload tokens so the browser can send files straight to Vercel Blob,
 * bypassing the ~4.5MB request-body limit that a normal Route Handler is capped at (needed for the
 * up-to-50MB tender PDFs). The actual media DB row is created afterwards by finalizeMediaUploadAction,
 * called by the client right after upload() resolves — not from onUploadCompleted, since that runs as
 * an async webhook from Vercel's blob infra and isn't guaranteed to land before the client needs the row.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const admin = await getCurrentAdmin();
        if (!admin) throw new Error("לא מורשה. יש להתחבר מחדש.");

        const group = clientPayload ?? "any";
        return {
          allowedContentTypes: GROUP_CONTENT_TYPES[group] ?? GROUP_CONTENT_TYPES.any,
          maximumSizeInBytes: MAX_FILE_SIZE_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
