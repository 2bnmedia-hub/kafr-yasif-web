"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Star, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { UploadWidget, type UploadedMedia } from "./UploadWidget";
import {
  addEventImageAction,
  deleteEventImageAction,
  setEventCoverImageAction,
  reorderEventImageAction,
} from "@/app/actions/admin-events";

type ImgRow = { image: { id: number; alt: string }; media: { id: number; url: string } };

export function EventGalleryPanel({
  eventId,
  initialImages,
  coverImageId,
}: {
  eventId: number;
  initialImages: ImgRow[];
  coverImageId: number | null;
}) {
  const [images, setImages] = useState(initialImages);
  const [cover, setCover] = useState(coverImageId);
  const [isPending, startTransition] = useTransition();

  function handleUploaded(files: UploadedMedia[]) {
    startTransition(async () => {
      for (const f of files) {
        if (images.length >= 10) break;
        const fd = new FormData();
        fd.append("eventId", String(eventId));
        fd.append("mediaId", String(f.id));
        fd.append("alt", "");
        await addEventImageAction(fd);
        setImages((prev) => [...prev, { image: { id: f.id, alt: "" }, media: { id: f.id, url: f.url } }]);
      }
    });
  }

  function remove(imageId: number) {
    startTransition(async () => {
      await deleteEventImageAction(eventId, imageId);
      setImages((prev) => prev.filter((i) => i.image.id !== imageId));
    });
  }

  function makeCover(mediaId: number) {
    startTransition(async () => {
      await setEventCoverImageAction(eventId, mediaId);
      setCover(mediaId);
    });
  }

  function move(imageId: number, dir: "up" | "down") {
    startTransition(async () => {
      await reorderEventImageAction(eventId, imageId, dir);
      setImages((prev) => {
        const idx = prev.findIndex((i) => i.image.id === imageId);
        const swap = dir === "up" ? idx - 1 : idx + 1;
        if (idx === -1 || swap < 0 || swap >= prev.length) return prev;
        const copy = [...prev];
        [copy[idx], copy[swap]] = [copy[swap], copy[idx]];
        return copy;
      });
    });
  }

  return (
    <div className="admin-shadow-card rounded-2xl bg-white p-5 ">
      <h3 className="mb-1 text-sm font-semibold text-teal-900">גלריית תמונות ({images.length}/10)</h3>
      <p className="mb-4 text-xs text-ink-600">ניתן להעלות עד 10 תמונות. סמנו כוכב לקביעת תמונה ראשית.</p>

      {images.length < 10 && (
        <UploadWidget group="image" accept="image/jpeg,image/png,image/webp" hint="JPG, PNG, WEBP — עד 50MB לקובץ" onUploaded={handleUploaded} />
      )}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map(({ image, media }, idx) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg ring-1 ring-zinc-100">
              <div className="relative aspect-square bg-cream-50">
                <Image src={media.url} alt={image.alt} fill sizes="150px" className="object-cover" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/50 p-1.5">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => makeCover(media.id)}
                  aria-label="קביעה כתמונה ראשית"
                  className={`rounded p-1 ${cover === media.id ? "bg-gold-500 text-white" : "bg-white/80 text-ink-900"}`}
                >
                  <Star size={12} fill={cover === media.id ? "currentColor" : "none"} />
                </button>
                <div className="flex gap-1">
                  <button type="button" disabled={isPending || idx === 0} onClick={() => move(image.id, "up")} aria-label="הזזה למעלה" className="rounded bg-white/80 p-1 text-ink-900 disabled:opacity-40">
                    <ArrowUp size={12} />
                  </button>
                  <button type="button" disabled={isPending || idx === images.length - 1} onClick={() => move(image.id, "down")} aria-label="הזזה למטה" className="rounded bg-white/80 p-1 text-ink-900 disabled:opacity-40">
                    <ArrowDown size={12} />
                  </button>
                  <button type="button" disabled={isPending} onClick={() => remove(image.id)} aria-label="מחיקה" className="rounded bg-white/80 p-1 text-red-600">
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
