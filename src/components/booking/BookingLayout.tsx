"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { cn } from "@/lib/cn";

type BookingLayoutProps = {
  children: ReactNode;
  currentStep: number;
  isLastStep: boolean;
  showTitle: string;
  nextDisabled?: boolean;
  onBack: () => void;
  onNext: () => void;
};

export function BookingLayout({
  children,
  currentStep,
  isLastStep,
  showTitle,
  nextDisabled,
  onBack,
  onNext
}: BookingLayoutProps) {
  return (
    <main className="min-h-screen bg-white px-3 py-1.5 text-deepGreen sm:px-4">
      <div className="mx-auto max-w-7xl">
        <div className="relative bg-white px-12 py-1.5 sm:px-[4.5rem]">
          <button
            type="button"
            onClick={onBack}
            aria-label="Quay lại"
            className="focus-ring absolute left-2 top-2 z-20 inline-flex h-8 min-w-11 items-center justify-center rounded-full border-2 border-ink bg-white text-ink transition hover:bg-paleMint"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            aria-label={isLastStep ? "Hoàn tất đặt vé" : "Bước tiếp theo"}
            className={cn(
              "focus-ring absolute right-2 top-2 z-20 inline-flex h-8 min-w-11 items-center justify-center rounded-full border-2 border-ink bg-white px-3 text-xs font-bold text-ink transition hover:bg-paleMint",
              nextDisabled && "cursor-not-allowed opacity-45"
            )}
          >
            {isLastStep ? "Hoàn tất" : <ArrowRight className="h-5 w-5" />}
          </button>
          <div className="mb-1.5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Đang đặt vé</p>
            <h1 className="heading-display mt-0.5 truncate text-[clamp(1rem,2.3vw,1.9rem)] text-deepGreen">
              {showTitle}
            </h1>
          </div>
          <BookingStepper currentStep={currentStep} />
        </div>
        <div className="pt-2">{children}</div>
      </div>
    </main>
  );
}
