"use client";

import { motion } from "framer-motion";
import { bookedSeatLabels, seatPrice, zoneARows, zoneBLeftColumns, zoneBRightColumns } from "@/data/seats";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";

type SeatMapProps = {
  selectedSeats: string[];
  onToggleSeat: (label: string) => void;
};

export function SeatMap({ selectedSeats, onToggleSeat }: SeatMapProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="mx-auto min-w-[860px] max-w-6xl">
        <div className="mx-auto w-[620px]">
          <p className="mb-1 text-center font-heading text-xl uppercase text-deepGreen">Khu A</p>
          <div className="paper-panel rounded-sm p-2">
            {zoneARows.map((row) => (
              <div key={row.row} className="grid grid-cols-[34px_1fr_30px_1fr_34px] items-center gap-1.5 py-0.5">
                <RowLabel label={row.row} />
                <div className="flex justify-end gap-2">
                  {row.left.map((number) => (
                    <SeatButton
                      key={`${row.row}.${number}`}
                      label={`${row.row}.${number}`}
                      number={number}
                      selectedSeats={selectedSeats}
                      onToggleSeat={onToggleSeat}
                    />
                  ))}
                </div>
                <div />
                <div className="flex gap-2">
                  {row.right.map((number) => (
                    <SeatButton
                      key={`${row.row}.${number}`}
                      label={`${row.row}.${number}`}
                      number={number}
                      selectedSeats={selectedSeats}
                      onToggleSeat={onToggleSeat}
                    />
                  ))}
                </div>
                <RowLabel label={row.row} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[150px_1fr_150px] items-center gap-6">
          <ZoneBBlock columns={zoneBLeftColumns} selectedSeats={selectedSeats} onToggleSeat={onToggleSeat} align="left" />
          <div className="grid place-items-center">
            <div className="water-mask grid h-[155px] w-[370px] place-items-center border border-deepGreen/55 bg-lightGray">
              <span className="heading-display text-4xl text-deepGreen">Sân khấu</span>
            </div>
          </div>
          <ZoneBBlock columns={zoneBRightColumns} selectedSeats={selectedSeats} onToggleSeat={onToggleSeat} align="right" />
        </div>

        <div className="sticky bottom-3 z-20 mx-auto mt-4 flex w-fit items-center gap-4 rounded-full bg-ink px-6 py-3 text-xs text-white shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
          <LegendDot className="bg-white" label="Chưa đặt" />
          <LegendDot className="bg-deepGreen" label="Đã đặt" />
          <LegendDot className="bg-[#FFF9C4]" label="Đang chọn" />
          <span className="rounded-sm bg-white px-2 py-1 font-bold text-deepGreen">A</span>
          <span className="rounded-sm bg-white px-2 py-1 font-bold text-deepGreen">B</span>
          <span>{formatCurrency(seatPrice)}</span>
          <span>Số ghế đã chọn: {selectedSeats.length}</span>
        </div>
      </div>
    </div>
  );
}

function RowLabel({ label }: { label: string }) {
  return <span className="font-heading text-xl uppercase text-deepGreen">{label}</span>;
}

function ZoneBBlock({
  columns,
  selectedSeats,
  onToggleSeat,
  align
}: {
  columns: Array<{ row: string; seats: number[] }>;
  selectedSeats: string[];
  onToggleSeat: (label: string) => void;
  align: "left" | "right";
}) {
  return (
    <div className="text-center">
      <div className="mb-1 flex justify-center gap-3">
        {columns.map((column) => (
          <span key={column.row} className="font-heading text-xl text-deepGreen">
            {column.row}
          </span>
        ))}
      </div>
      <div className="paper-panel inline-flex items-start gap-3 rounded-sm p-2">
        {columns.map((column) => (
          <div key={column.row} className="flex flex-col items-center gap-1.5">
            {column.seats.map((number) => (
              <SeatButton
                key={`${column.row}.${number}`}
                label={`${column.row}.${number}`}
                number={number}
                selectedSeats={selectedSeats}
                onToggleSeat={onToggleSeat}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-center gap-3">
        {columns.map((column) => (
          <span key={column.row} className="font-heading text-xl text-deepGreen">
            {column.row}
          </span>
        ))}
      </div>
      <p className="font-heading text-xl uppercase text-deepGreen">Khu B</p>
      <span className="sr-only">Cụm ghế khu B {align}</span>
    </div>
  );
}

function SeatButton({
  label,
  number,
  selectedSeats,
  onToggleSeat
}: {
  label: string;
  number: number;
  selectedSeats: string[];
  onToggleSeat: (label: string) => void;
}) {
  const booked = bookedSeatLabels.has(label);
  const selected = selectedSeats.includes(label);
  const status = booked ? "đã đặt" : selected ? "đang chọn" : "đang trống";

  return (
    <motion.button
      type="button"
      aria-label={`Ghế ${label}, ${status}`}
      disabled={booked}
      onClick={() => onToggleSeat(label)}
      whileHover={booked ? undefined : { scale: 1.12 }}
      whileTap={booked ? undefined : { scale: 0.9 }}
      animate={selected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 20 }}
      className={cn(
        "focus-ring grid h-5 w-5 place-items-center rounded-full border border-deepGreen/10 text-[8px] font-bold transition",
        !booked && !selected && "bg-white text-deepGreen hover:border-deepGreen",
        booked && "cursor-not-allowed bg-deepGreen text-white",
        selected && "bg-[#FFF9C4] text-deepGreen ring-2 ring-gold/55"
      )}
    >
      {number}
    </motion.button>
  );
}

function LegendDot({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("h-5 w-5 rounded-full border border-white/20", className)} />
      {label}
    </span>
  );
}
