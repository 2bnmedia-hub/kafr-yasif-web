import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { MAX_FILE_SIZE_BYTES, GROUP_CONTENT_TYPES, VALID_KIND_GROUPS, validateUploadedFile } from "@/lib/upload-validation";

export const runtime = "nodejs";

/**
 * Issues short-lived client-upload tokens so the browser can send files straight to Vercel Blob,
 * bypassing the ~4.5MB request-body limit that a normal Route Handler is capped at (needed for the
 * up-to-50MB tender PDFs). The actual media DB row is created afterwards by finalizeMediaUploadAction,
 * called by the client right after upload() resolves — not from onUploadCompleted, since that runs as
 * an async webhook from Vercel's blob infra and isn't guaranteed to land before the client needs the row.
 *
 * Because the file goes straight from the browser to Blob storage, allowedContentTypes below is
 * only ever checked against what the browser *claims* the file is — there's no server-side byte
 * inspection before it lands in the store. onUploadCompleted is a best-effort backstop: once the
 * webhook fires (production only; it needs a publicly reachable callback URL), it re-checks the
 * actual bytes by magic number and deletes the blob if they don't match an allowed kind.
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
          tokenPayload: group,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          const response = await fetch(blob.url);
          const buffer = Buffer.from(await response.arrayBuffer());
          const allowedKinds = VALID_KIND_GROUPS[tokenPayload ?? "any"] ?? VALID_KIND_GROUPS.any;
          const validation = await validateUploadedFile(buffer, blob.pathname, allowedKinds);
          if (!validation.ok) {
            console.error(`[upload-blob] rejected post-upload, deleting: ${blob.pathname} — ${validation.reason}`);
            await del(blob.url);
          }
        } catch (error) {
          console.error("[upload-blob] post-upload validation failed:", error);
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
