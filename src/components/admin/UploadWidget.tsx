"use client";

import { useCallback, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { UploadCloud, Loader2, AlertCircle } from "lucide-react";
import { finalizeMediaUploadAction } from "@/app/actions/admin-media";

export type UploadedMedia = {
  id: number;
  url: string;
  filename: string;
  kind: string;
  mimeType: string | null;
  sizeBytes: number | null;
  width: number | null;
  height: number | null;
};

type Props = {
  group: "image" | "document" | "any";
  multiple?: boolean;
  accept?: string;
  onUploaded: (files: UploadedMedia[]) => void;
  label?: string;
  hint?: string;
};

type InFlight = { name: string; progress: number };

async function uploadOne(file: File, group: string, onProgress: (pct: number) => void): Promise<UploadedMedia | null> {
  try {
    const blob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/admin/upload-blob",
      clientPayload: group,
      onUploadProgress: ({ percentage }) => onProgress(Math.round(percentage)),
    });

    const finalized = await finalizeMediaUploadAction({
      url: blob.url,
      filename: file.name,
      group: group as "image" | "document" | "any",
      sizeBytes: file.size,
    });

    if ("error" in finalized) {
      return { __error: finalized.error } as unknown as UploadedMedia;
    }
    return finalized.media as unknown as UploadedMedia;
  } catch (error) {
    return { __error: (error as Error).message || "שגיאה בהעלאת הקובץ." } as unknown as UploadedMedia;
  }
}

export function UploadWidget({ group, multiple = true, accept, onUploaded, label, hint }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [inFlight, setInFlight] = useState<InFlight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      setError(null);
      const files = Array.from(fileList);
      const uploaded: UploadedMedia[] = [];

      for (const file of files) {
        setInFlight((prev) => [...prev, { name: file.name, progress: 0 }]);
        const result = await uploadOne(file, group, (pct) => {
          setInFlight((prev) => prev.map((f) => (f.name === file.name ? { ...f, progress: pct } : f)));
        });
        setInFlight((prev) => prev.filter((f) => f.name !== file.name));

        if (result && "__error" in result) {
          setError((result as unknown as { __error: string }).__error);
        } else if (result) {
          uploaded.push(result);
        }
      }

      if (uploaded.length) onUploaded(uploaded);
    },
    [group, onUploaded]
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
          dragOver ? "border-teal-500 bg-teal-50" : "border-teal-200 bg-cream-50 hover:border-teal-400"
        }`}
      >
        <UploadCloud size={28} className="text-teal-600" aria-hidden="true" />
        <p className="text-sm font-medium text-ink-900">{label ?? "גררו קבצים לכאן או לחצו לבחירה"}</p>
        {hint && <p className="text-xs text-ink-600">{hint}</p>}
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {inFlight.length > 0 && (
        <div className="mt-3 space-y-2">
          {inFlight.map((f) => (
            <div key={f.name} className="flex items-center gap-2 text-xs text-ink-600">
              <Loader2 size={14} className="shrink-0 animate-spin text-teal-600" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">{f.name}</span>
              <div className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-zinc-200">
                <div className="h-full bg-teal-600 transition-all" style={{ width: `${f.progress}%` }} />
              </div>
              <span className="w-8 shrink-0 text-left">{f.progress}%</span>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div role="alert" className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}
    </div>
  );
}
