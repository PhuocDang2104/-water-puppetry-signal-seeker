"use client";

import { Globe2 } from "lucide-react";

export function LanguageSwitch() {
  return (
    <div className="flex items-center gap-2" aria-label="Chọn ngôn ngữ">
      <button
        type="button"
        aria-label="Tiếng Việt"
        className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-redSon text-sm font-bold text-gold shadow-lg"
      >
        ★
      </button>
      <button
        type="button"
        aria-label="English"
        className="focus-ring relative grid h-10 w-10 overflow-hidden rounded-full bg-[#1f4f94] text-[10px] font-bold text-white shadow-lg"
      >
        <span className="absolute h-1 w-full rotate-45 bg-white" />
        <span className="absolute h-1 w-full -rotate-45 bg-white" />
        <span className="absolute h-full w-1 bg-redSon" />
        <span className="absolute h-1 w-full bg-redSon" />
        <Globe2 className="relative h-4 w-4" />
      </button>
    </div>
  );
}
