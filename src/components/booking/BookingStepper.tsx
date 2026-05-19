"use client";

import type { LucideIcon } from "lucide-react";
import { Armchair, CalendarDays, ContactRound, WalletCards } from "lucide-react";
import { cn } from "@/lib/cn";

const steps: Array<{ label: string; icon: LucideIcon }> = [
  { label: "Chọn suất diễn", icon: CalendarDays },
  { label: "Chọn ghế", icon: Armchair },
  { label: "Thông tin liên hệ", icon: ContactRound },
  { label: "Thanh toán", icon: WalletCards }
];

type BookingStepperProps = {
  currentStep: number;
};

export function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative grid grid-cols-4 gap-2">
        <div className="absolute left-[12.5%] right-[12.5%] top-[16px] h-[2px] bg-deepGreen/55" />
        {steps.map((step, index) => {
          const Icon = step.icon;
          const active = index === currentStep;
          const complete = index < currentStep;

          return (
            <div key={step.label} className="relative z-10 flex flex-col items-center gap-1.5 text-center">
              <div
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full shadow-sm transition",
                  active || complete ? "bg-deepGreen text-white" : "bg-lightGray text-deepGreen"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="hidden text-[11px] font-bold text-deepGreen sm:block">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
