"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { showTimes } from "@/data/shows";
import { cn } from "@/lib/cn";

const dayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const calendarCells = [
  "2026-04-27",
  "2026-04-28",
  "2026-04-29",
  "2026-04-30",
  "2026-05-01",
  "2026-05-02",
  "2026-05-03",
  "2026-05-04",
  "2026-05-05",
  "2026-05-06",
  "2026-05-07",
  "2026-05-08",
  "2026-05-09",
  "2026-05-10",
  "2026-05-11",
  "2026-05-12",
  "2026-05-13",
  "2026-05-14",
  "2026-05-15",
  "2026-05-16",
  "2026-05-17",
  "2026-05-18",
  "2026-05-19",
  "2026-05-20",
  "2026-05-21",
  "2026-05-22",
  "2026-05-23",
  "2026-05-24",
  "2026-05-25",
  "2026-05-26",
  "2026-05-27",
  "2026-05-28",
  "2026-05-29",
  "2026-05-30",
  "2026-05-31"
];

type DateSelectionStepProps = {
  selectedDate?: string;
  selectedTime?: string;
  onSelect: (date: string, time: string) => void;
};

export function DateSelectionStep({ selectedDate, selectedTime, onSelect }: DateSelectionStepProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl"
    >
      <div className="mb-2 flex items-center justify-center gap-4">
        <MonthButton label="Tháng trước" icon="left" />
        <h2 className="heading-display text-center text-[clamp(1.7rem,4.5vw,3.35rem)] text-deepGreen">
          Tháng 5 Năm 2026
        </h2>
        <MonthButton label="Tháng sau" icon="right" />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[720px] border border-deepGreen/65 bg-lightGray">
          <div className="grid grid-cols-7">
            {dayLabels.map((day) => (
              <div
                key={day}
                className="border-b border-r border-deepGreen/45 px-2 py-1.5 text-center font-heading text-xl uppercase text-deepGreen last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarCells.map((date) => {
              const day = date.slice(-2);
              const outside = !date.startsWith("2026-05");
              const times = showTimes.find((item) => item.date === date)?.times ?? [];

              return (
                <div key={date} className="min-h-[72px] border-r border-t border-deepGreen/35 p-1.5 last:border-r">
                  <div
                    className={cn(
                      "mb-1.5 text-right text-xs font-bold",
                      outside ? "text-deepGreen/45" : "text-deepGreen"
                    )}
                  >
                    {day}
                  </div>
                  <div className="grid gap-1.5">
                    {times.map((time) => {
                      const active = selectedDate === date && selectedTime === time;
                      return (
                        <motion.button
                          key={time}
                          type="button"
                          whileTap={{ scale: 0.96 }}
                          onClick={() => onSelect(date, time)}
                          className={cn(
                            "focus-ring rounded-full px-2 py-1.5 text-[11px] font-bold text-white transition",
                            active
                              ? "bg-gold text-deepGreen shadow-[0_0_0_3px_rgba(215,168,63,0.24)]"
                              : "bg-deepGreen hover:bg-darkGreen"
                          )}
                        >
                          {time}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function MonthButton({ label, icon }: { label: string; icon: "left" | "right" }) {
  const Icon = icon === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full bg-deepGreen text-white shadow-soft transition hover:bg-darkGreen"
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}
