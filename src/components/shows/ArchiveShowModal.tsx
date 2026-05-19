"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ArchiveShowItem } from "@/data/archiveShows";

type ArchiveShowModalProps = {
  open: boolean;
  onClose: () => void;
  show?: ArchiveShowItem;
};

export function ArchiveShowModal({ open, onClose, show }: ArchiveShowModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open || !show) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={`Chi tiết ${show.title}`} className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} aria-hidden />
      <div
        ref={dialogRef}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#062d27] via-[#0d5a49] to-[#091f1b] p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <Image
            src={show.posterSrc}
            alt={show.title}
            width={520}
            height={640}
            className="h-72 w-full rounded-xl object-cover shadow-[0_18px_40px_rgba(0,0,0,0.45)] md:h-auto md:w-5/12"
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-gold">{show.year}</p>
                <h3 className="font-heading text-3xl font-extrabold uppercase leading-none">{show.title}</h3>
                <p className="text-sm text-paleMint">{show.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="focus-ring h-9 w-9 rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                data-autofocus
              >
                ×
              </button>
            </div>
            <p className="text-sm text-paleMint">
              <strong className="text-white">{show.location}</strong>
            </p>
            <p className="text-sm leading-7 text-paleMint">{show.fullDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
