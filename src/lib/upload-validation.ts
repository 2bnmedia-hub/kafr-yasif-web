import { fileTypeFromBuffer } from "file-type";

// Tender PDFs in particular run large (multi-page scanned specs) — 50MB covers those comfortably.
export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

export type UploadKind = "image" | "pdf" | "document";

export const VALID_KIND_GROUPS: Record<string, UploadKind[]> = {
  image: ["image"],
  document: ["pdf", "document"],
  any: ["image", "pdf", "document"],
};

const IMAGE_CONTENT_TYPES = ["image/jpeg", "image/png", "image/webp"];
const DOCUMENT_CONTENT_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/x-cfb", // legacy .doc container signature
];

/** Content types accepted by Vercel Blob's client-upload token, per upload group. */
export const GROUP_CONTENT_TYPES: Record<string, string[]> = {
  image: IMAGE_CONTENT_TYPES,
  document: DOCUMENT_CONTENT_TYPES,
  any: [...IMAGE_CONTENT_TYPES, ...DOCUMENT_CONTENT_TYPES],
};

const IMAGE_MIME_TO_KIND: Record<string, UploadKind> = {
  "image/jpeg": "image",
  "image/png": "image",
  "image/webp": "image",
};

const DOCUMENT_MIME_TO_KIND: Record<string, UploadKind> = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "document", // .docx
};

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "pdf", "doc", "docx"]);

export type FileValidationResult =
  | { ok: true; kind: UploadKind; mimeType: string; extension: string }
  | { ok: false; reason: string };

/**
 * Validates a file by its real binary signature (magic bytes), not just its extension/declared
 * mime type. Legacy .doc files use the shared OLE Compound File container (same header as old
 * .xls/.ppt), so file-type can only narrow it to "application/x-cfb" — in that one case we also
 * require the extension to say .doc before accepting, since the container format alone can't
 * disambiguate. Every other type is accepted purely from the sniffed signature.
 */
export async function validateUploadedFile(
  buffer: Buffer,
  declaredFilename: string,
  allowedKinds: UploadKind[]
): Promise<FileValidationResult> {
  const extension = (declaredFilename.split(".").pop() ?? "").toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return { ok: false, reason: `סיומת קובץ לא נתמכת: .${extension}` };
  }

  const sniffed = await fileTypeFromBuffer(buffer);

  if (!sniffed) {
    return { ok: false, reason: "לא ניתן לזהות את סוג הקובץ מתוכנו — ייתכן שהקובץ פגום או לא נתמך." };
  }

  if (sniffed.mime === "application/x-cfb" && extension === "doc") {
    const kind: UploadKind = "document";
    if (!allowedKinds.includes(kind)) {
      return { ok: false, reason: "סוג קובץ זה אינו מותר בהקשר זה." };
    }
    return { ok: true, kind, mimeType: "application/msword", extension };
  }

  const kind = IMAGE_MIME_TO_KIND[sniffed.mime] ?? DOCUMENT_MIME_TO_KIND[sniffed.mime];
  if (!kind) {
    return { ok: false, reason: `תוכן הקובץ אינו תואם לסוגי הקבצים המותרים (זוהה: ${sniffed.mime}).` };
  }

  if (!allowedKinds.includes(kind)) {
    return { ok: false, reason: "סוג קובץ זה אינו מותר בהקשר זה." };
  }

  return { ok: true, kind, mimeType: sniffed.mime, extension };
}

export function humanFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
