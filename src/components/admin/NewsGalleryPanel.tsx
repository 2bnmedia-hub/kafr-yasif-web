"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Star, Trash2, ArrowUp, ArrowDown, FileText } from "lucide-react";
import { UploadWidget, type UploadedMedia } from "./UploadWidget";
import { addNewsImageAction, deleteNewsImageAction, setCoverImageAction, reorderNewsImageAction } from "@/app/actions/admin-news";

type GalleryItem = { key: number; mediaId: number; url: string; filename: string; kind: string; alt: string };

export function NewsGalleryPanel({
  newsId,
  initialImages,
  coverImageId,
}: {
  newsId?: number;
  initialImages: GalleryItem[];
  coverImageId: number | null;
}) {
  const [items, setItems] = useState(initialImages);
  const [cover, setCover] = useState(coverImageId);
  const [isPending, startTransition] = useTransition();

  function handleUploaded(files: UploadedMedia[]) {
    if (newsId) {
      startTransition(async () => {
        for (const f of files) {
          if (items.length >= 10) break;
          const fd = new FormData();
          fd.append("newsId", String(newsId));
          fd.append("mediaId", String(f.id));
          fd.append("alt", "");
          fd.append("kind", f.kind);
          const inserted = await addNewsImageAction(fd);
          setItems((prev) => [
            ...prev,
            { key: inserted?.id ?? f.id, mediaId: f.id, url: f.url, filename: f.filename, kind: f.kind, alt: "" },
          ]);
          if (!cover && f.kind === "image") setCover(f.id);
        }
      });
    } else {
      setItems((prev) => {
        const room = 10 - prev.length;
        const toAdd = files.slice(0, Math.max(0, room));
        const next = [
          ...prev,
          ...toAdd.map((f) => ({ key: f.id, mediaId: f.id, url: f.url, filename: f.filename, kind: f.kind, alt: "" })),
        ];
        return next;
      });
      setCover((prev) => prev ?? files.find((f) => f.kind === "image")?.id ?? prev ?? null);
    }
  }

  function remove(item: GalleryItem) {
    if (newsId) {
      startTransition(async () => {
        await deleteNewsImageAction(newsId, item.key);
        setItems((prev) => prev.filter((i) => i.key !== item.key));
        if (cover === item.mediaId) setCover(null);
      });
    } else {
      setItems((prev) => prev.filter((i) => i.key !== item.key));
      if (cover === item.mediaId) setCover(null);
    }
  }

  function makeCover(mediaId: number) {
    if (newsId) {
      startTransition(async () => {
        await setCoverImageAction(newsId, mediaId);
        setCover(mediaId);
      });
    } else {
      setCover(mediaId);
    }
  }

  function move(item: GalleryItem, dir: "up" | "down") {
    if (newsId) {
      startTransition(async () => {
        await reorderNewsImageAction(newsId, item.key, dir);
        setItems((prev) => {
          const idx = prev.findIndex((i) => i.key === item.key);
          const swap = dir === "up" ? idx - 1 : idx + 1;
          if (idx === -1 || swap < 0 || swap >= prev.length) return prev;
          const copy = [...prev];
          [copy[idx], copy[swap]] = [copy[swap], copy[idx]];
          return copy;
        });
      });
    } else {
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.key === item.key);
        const swap = dir === "up" ? idx - 1 : idx + 1;
        if (idx === -1 || swap < 0 || swap >= prev.length) return prev;
        const copy = [...prev];
        [copy[idx], copy[swap]] = [copy[swap], copy[idx]];
        return copy;
      });
    }
  }

  return (
    <div className="admin-shadow-card rounded-2xl bg-white p-5 ">
      <h3 className="mb-1 text-sm font-semibold text-teal-900">גלריה — תמונות ומסמכים ({items.length}/10)</h3>
      <p className="mb-4 text-xs text-ink-600">
        ניתן להעלות עד 10 קבצים (תמונות, PDF, Word). התמונה הראשונה שמועלית נקבעת אוטומטית כתמונה הראשית באתר — ניתן לשנות בסימון הכוכב.
      </p>

      {items.length < 10 && (
        <UploadWidget
          group="any"
          accept="image/jpeg,image/png,image/webp,.pdf,.doc,.docx"
          hint="JPG, PNG, WEBP, PDF, DOC, DOCX — עד 50MB לקובץ"
          onUploaded={handleUploaded}
        />
      )}

      {!newsId && (
        <>
          <input
            type="hidden"
            name="pendingGalleryItems"
            value={JSON.stringify(items.map((it) => ({ mediaId: it.mediaId, alt: it.alt, kind: it.kind })))}
          />
          <input type="hidden" name="pendingCoverMediaId" value={cover ?? ""} />
        </>
      )}

      {items.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item, idx) => (
            <div key={item.key} className="group relative overflow-hidden rounded-lg ring-1 ring-zinc-100">
              <div className="relative flex aspect-square items-center justify-center bg-cream-50">
                {item.kind === "image" ? (
                  <Image src={item.url} alt={item.alt} fill sizes="150px" className="object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 p-2 text-center">
                    <FileText size={28} className="text-teal-700" aria-hidden="true" />
                    <span className="line-clamp-2 text-[10px] text-ink-600">{item.filename}</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/50 p-1.5">
                {item.kind === "image" ? (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => makeCover(item.mediaId)}
                    aria-label="קביעה כתמונה ראשית"
                    className={`rounded p-1 ${cover === item.mediaId ? "bg-gold-500 text-white" : "bg-white/80 text-ink-900"}`}
                  >
                    <Star size={12} fill={cover === item.mediaId ? "currentColor" : "none"} />
                  </button>
                ) : (
                  <span />
                )}
                <div className="flex gap-1">
                  <button type="button" disabled={isPending || idx === 0} onClick={() => move(item, "up")} aria-label="הזזה למעלה" className="rounded bg-white/80 p-1 text-ink-900 disabled:opacity-40">
                    <ArrowUp size={12} />
                  </button>
                  <button type="button" disabled={isPending || idx === items.length - 1} onClick={() => move(item, "down")} aria-label="הזזה למטה" className="rounded bg-white/80 p-1 text-ink-900 disabled:opacity-40">
                    <ArrowDown size={12} />
                  </button>
                  <button type="button" disabled={isPending} onClick={() => remove(item)} aria-label="מחיקה" className="rounded bg-white/80 p-1 text-red-600">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
