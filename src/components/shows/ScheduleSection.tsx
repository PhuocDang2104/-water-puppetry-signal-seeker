"use client";

import { addDays, addMonths, format, isWithinInterval, startOfMonth, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/lib/cn";

type ViewMode = "month" | "week" | "schedule";

type ScheduleItem = {
  id: string;
  date: Date;
  time: string;
  title: string;
  showId: string;
};

const today = new Date(2026, 4, 19);

const scheduleItems: ScheduleItem[] = [
  ["2026-05-23", "10:30 - 11:15"],
  ["2026-05-23", "14:30 - 15:15"],
  ["2026-05-24", "10:30 - 11:15"],
  ["2026-05-30", "10:30 - 11:15"],
  ["2026-05-30", "14:30 - 15:15"],
  ["2026-06-06", "10:30 - 11:15"],
  ["2026-06-06", "14:30 - 15:15"],
  ["2026-06-07", "14:30 - 15:15"],
  ["2026-06-13", "10:30 - 11:15"],
  ["2026-06-13", "14:30 - 15:15"],
  ["2026-06-14", "10:30 - 11:15"],
  ["2026-06-18", "14:30 - 15:15"]
].map(([date, time], index) => ({
  id: `schedule-${index}`,
  date: parseLocalDate(date),
  time,
  title: "Múa Rối Nước Hoa Đất Việt",
  showId: "hoa-dat-viet"
}));

const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export function ScheduleSection() {
  const [mode, setMode] = useState<ViewMode>("schedule");
  const [cursor, setCursor] = useState(today);

  const range = useMemo(() => getRange(mode, cursor), [mode, cursor]);
  const visibleItems = useMemo(
    () => scheduleItems.filter((item) => isWithinInterval(item.date, range)),
    [range]
  );
  const grouped = useMemo(() => groupByDay(visibleItems), [visibleItems]);

  return (
    <section id="schedule" className="bg-white py-14 text-deepGreen">
      <SectionHeader marker="D" label="Lịch diễn" />
      <div className="mx-auto mt-10 max-w-7xl px-5">
        <p className="mb-5 text-sm font-medium text-deepGreen/80">
          Có tất cả {visibleItems.length} ca diễn. Vui lòng chọn một ca diễn để đặt vé.
        </p>

        <div className="mb-4 grid items-center gap-3 lg:grid-cols-[230px_1fr_230px]">
          <div className="flex w-fit overflow-hidden rounded-md border border-deepGreen/70 bg-white">
            <IconButton label="Lùi lịch" onClick={() => setCursor((value) => shiftCursor(mode, value, -1))}>
              <ChevronLeft className="h-4 w-4" />
            </IconButton>
            <button
              type="button"
              onClick={() => {
                setMode("month");
                setCursor(today);
              }}
              className="focus-ring bg-deepGreen px-5 py-2.5 text-xs font-bold text-white transition hover:bg-darkGreen"
            >
              Tháng này
            </button>
            <IconButton label="Tới lịch" onClick={() => setCursor((value) => shiftCursor(mode, value, 1))}>
              <ChevronRight className="h-4 w-4" />
            </IconButton>
          </div>

          <p className="text-center text-2xl font-extrabold text-ink">
            {format(range.start, "dd/MM/yyyy")} - {format(range.end, "dd/MM/yyyy")}
          </p>

          <div className="flex justify-start overflow-hidden rounded-md border border-deepGreen/70 bg-white lg:justify-self-end">
            <ModeButton label="Tháng" active={mode === "month"} onClick={() => setMode("month")} />
            <ModeButton label="Tuần" active={mode === "week"} onClick={() => setMode("week")} />
            <ModeButton label="Lịch Trình" active={mode === "schedule"} onClick={() => setMode("schedule")} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[760px] overflow-hidden border border-deepGreen/25 bg-white shadow-soft">
            <div className="grid grid-cols-[118px_124px_1fr_88px] border-b border-deepGreen/20 bg-paleMint/70 text-xs font-bold text-deepGreen">
              <div className="border-r border-deepGreen/18 px-3 py-2.5">Ngày</div>
              <div className="border-r border-deepGreen/18 px-3 py-2.5">Giờ</div>
              <div className="px-3 py-2.5">Vở diễn</div>
              <div className="px-3 py-2.5 text-right">Đặt vé</div>
            </div>

            {grouped.length > 0 ? (
              grouped.map((group) => (
                <div key={group.dateKey} className="grid grid-cols-[118px_1fr] border-b border-deepGreen/12 last:border-b-0">
                  <div className="border-r border-deepGreen/12 px-3 py-2.5 text-xs font-bold text-ink">
                    {dayNames[group.date.getDay()]} {format(group.date, "dd/MM/yyyy")}
                  </div>
                  <div>
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="grid min-h-10 grid-cols-[124px_1fr_88px] items-center border-b border-deepGreen/10 last:border-b-0"
                      >
                        <div className="border-r border-deepGreen/10 px-3 text-xs text-ink">{item.time}</div>
                        <div className="truncate px-3 text-xs font-bold uppercase tracking-[0.01em] text-deepGreen">
                          {item.title}
                        </div>
                        <div className="px-2 text-right">
                          <Link
                            href={`/booking/${item.showId}`}
                            className="focus-ring inline-flex rounded-md bg-deepGreen px-3 py-1.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-darkGreen"
                          >
                            Đặt vé
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-ink/70">Không có ca diễn trong khoảng thời gian này.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="focus-ring grid h-10 w-10 place-items-center bg-white text-deepGreen transition hover:bg-paleMint"
    >
      {children}
    </button>
  );
}

function ModeButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-ring border-r border-deepGreen/60 px-3.5 py-2.5 text-xs font-bold last:border-r-0",
        active ? "bg-deepGreen text-white" : "bg-white text-deepGreen hover:bg-paleMint"
      )}
    >
      {label}
    </button>
  );
}

function parseLocalDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getRange(mode: ViewMode, cursor: Date) {
  if (mode === "week") {
    const start = startOfWeek(cursor, { weekStartsOn: 1 });
    return { start, end: addDays(start, 6) };
  }

  if (mode === "month") {
    const start = startOfMonth(cursor);
    return { start, end: addDays(addMonths(start, 1), -1) };
  }

  return { start: today, end: addDays(today, 30) };
}

function shiftCursor(mode: ViewMode, cursor: Date, direction: -1 | 1) {
  if (mode === "month") return addMonths(cursor, direction);
  if (mode === "week") return addDays(cursor, direction * 7);
  return addDays(cursor, direction * 30);
}

function groupByDay(items: ScheduleItem[]) {
  const map = new Map<string, { dateKey: string; date: Date; items: ScheduleItem[] }>();
  items.forEach((item) => {
    const dateKey = format(item.date, "yyyy-MM-dd");
    if (!map.has(dateKey)) map.set(dateKey, { dateKey, date: item.date, items: [] });
    map.get(dateKey)?.items.push(item);
  });
  return Array.from(map.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
}
