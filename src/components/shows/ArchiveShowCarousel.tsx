"use client";

import { useEffect, useMemo, useRef, useState, type PointerEventHandler } from "react";
import Image from "next/image";
import { archiveShows, type ArchiveShowItem } from "@/data/archiveShows";
import { ArchiveShowModal } from "@/components/shows/ArchiveShowModal";

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")";

function normalizeOffset(value: number, width: number) {
  if (width <= 0) return value;
  let next = value % width;
  if (next > 0) next -= width;
  return next;
}

export function ArchiveShowCarousel() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeShow, setActiveShow] = useState<ArchiveShowItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const loopWidthRef = useRef(0);
  const currentXRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const pointerDownRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const paused = isHovered || isDragging;
  const duplicated = useMemo(() => [...archiveShows, ...archiveShows], []);

  useEffect(() => {
    if (!trackRef.current) return undefined;
    const element = trackRef.current;
    const speed = 1.45;
    let raf = 0;

    const updateLoopWidth = () => {
      loopWidthRef.current = element.scrollWidth / 2;
      currentXRef.current = normalizeOffset(currentXRef.current, loopWidthRef.current);
      element.style.transform = `translate3d(${currentXRef.current}px,0,0)`;
    };

    updateLoopWidth();
    const resizeObserver = new ResizeObserver(updateLoopWidth);
    resizeObserver.observe(element);

    const step = () => {
      if (!paused && !isDraggingRef.current && loopWidthRef.current > 0) {
        const next = normalizeOffset(currentXRef.current - speed, loopWidthRef.current);
        currentXRef.current = next;
        element.style.transform = `translate3d(${next}px,0,0)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [paused]);

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.button !== 0 || !trackRef.current) return;
    dragMovedRef.current = false;
    isDraggingRef.current = false;
    setIsDragging(false);
    pointerDownRef.current = true;
    pointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = currentXRef.current;
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!pointerDownRef.current || !trackRef.current || pointerIdRef.current !== event.pointerId) return;
    const delta = event.clientX - dragStartXRef.current;
    if (!isDraggingRef.current && Math.abs(delta) > 6) {
      dragMovedRef.current = true;
      isDraggingRef.current = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (isDraggingRef.current) {
      const next = normalizeOffset(dragStartOffsetRef.current + delta, loopWidthRef.current);
      currentXRef.current = next;
      trackRef.current.style.transform = `translate3d(${next}px,0,0)`;
    }
  };

  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!pointerDownRef.current || pointerIdRef.current !== event.pointerId) return;
    pointerDownRef.current = false;
    pointerIdRef.current = null;
    if (isDraggingRef.current && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <section
      className="relative isolate w-screen overflow-hidden py-10"
      style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#061b18] via-[#0d5a49] to-[#071512]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(215,168,63,0.18),transparent_44%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_42%),radial-gradient(circle_at_50%_82%,rgba(255,255,255,0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light" style={{ backgroundImage: noiseTexture }} />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-2 px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gold/80">Kho lưu trữ show</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-heading text-3xl font-extrabold uppercase text-white sm:text-4xl">Các vở diễn khác</h3>
            <p className="text-xs text-paleMint sm:text-sm">Kéo ngang hoặc bấm vào thẻ để xem thông tin mẫu.</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/25 to-transparent" />
        </div>
      </div>

      <div
        className={`relative mt-4 h-[350px] overflow-hidden select-none sm:h-[390px] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[#061b18] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#061b18] to-transparent" />
        <div className="absolute inset-0">
          <div ref={trackRef} className="flex h-full items-center gap-5 py-6 will-change-transform">
            {duplicated.map((item, index) => (
              <button
                key={`${item.id}-${index}`}
                type="button"
                onClick={() => {
                  if (dragMovedRef.current) return;
                  setActiveShow(item);
                  setModalOpen(true);
                }}
                className="group/card h-[320px] w-[270px] shrink-0 rounded-xl text-left outline-none [perspective:1000px] sm:h-[350px] sm:w-[290px]"
              >
                <div className="relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-xl border border-white/12 bg-white/8 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition duration-300 [transform-style:preserve-3d] group-hover/card:scale-[1.04] group-hover/card:rotate-x-3 group-hover/card:-rotate-y-6 group-focus-visible/card:ring-2 group-focus-visible/card:ring-gold">
                  <div className="[transform:translateZ(42px)]">
                    <p className="font-heading text-xl font-extrabold uppercase leading-none text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-paleMint">{item.subtitle}</p>
                  </div>
                  <Image
                    src={item.posterSrc}
                    alt={item.title}
                    width={520}
                    height={420}
                    className="mt-auto h-52 w-full rounded-xl object-cover shadow-[0_18px_35px_rgba(0,0,0,0.35)] transition duration-300 [transform:translateZ(72px)_rotateZ(-4deg)] group-hover/card:scale-[1.03]"
                    draggable={false}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ArchiveShowModal open={modalOpen} onClose={() => setModalOpen(false)} show={activeShow ?? undefined} />
    </section>
  );
}
