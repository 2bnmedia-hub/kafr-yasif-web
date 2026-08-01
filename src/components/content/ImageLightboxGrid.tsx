"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, FileText, Download, ChevronRight, ChevronLeft } from "lucide-react";

type GalleryImage = { url: string; alt: string };
type GalleryDocument = { url: string; filename: string };

export function ImageLightboxGrid({
  heroImage,
  images,
  documents = [],
}: {
  heroImage?: GalleryImage;
  images: GalleryImage[];
  documents?: GalleryDocument[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const allImages = heroImage ? [heroImage, ...images] : images;
  const gridOffset = heroImage ? 1 : 0;

  function open(i: number, e: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = e.currentTarget;
    setOpenIndex(i);
  }

  function close() {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (openIndex === null) return;
    closeButtonRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenIndex(null);
        triggerRef.current?.focus();
      }
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % allImages.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + allImages.length) % allImages.length));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, allImages.length]);

  return (
    <>
      {heroImage && (
        <button
          type="button"
          onClick={(e) => open(0, e)}
          aria-label="הגדלת תמונה"
          className="group relative mb-8 block aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl bg-teal-100 sm:aspect-auto sm:h-96"
        >
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill
            sizes="768px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </button>
      )}

      {images.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => open(i + gridOffset, e)}
              aria-label="הגדלת תמונה"
              className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-xl bg-teal-100"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}

      {documents.length > 0 && (
        <ul className="mt-6 space-y-2.5">
          {documents.map((doc, i) => (
            <li key={i}>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/[0.06] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "linear-gradient(155deg, #1e526622 0%, #1e52660a 100%)" }}
                  aria-hidden="true"
                >
                  <FileText size={18} color="#1e5266" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-teal-900">{doc.filename}</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
                  <Download size={16} aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={close}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="סגירה"
            className="absolute top-4 left-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + allImages.length) % allImages.length));
                }}
                aria-label="התמונה הקודמת"
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronRight size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % allImages.length));
                }}
                aria-label="התמונה הבאה"
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronLeft size={24} />
              </button>
            </>
          )}

          <div className="relative h-full max-h-[90vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={allImages[openIndex].url} alt={allImages[openIndex].alt} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
