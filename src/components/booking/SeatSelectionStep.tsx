"use client";

import { motion } from "framer-motion";
import { SeatMap } from "@/components/booking/SeatMap";

type SeatSelectionStepProps = {
  selectedSeats: string[];
  onToggleSeat: (label: string) => void;
};

export function SeatSelectionStep({ selectedSeats, onToggleSeat }: SeatSelectionStepProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-6xl"
    >
      <SeatMap selectedSeats={selectedSeats} onToggleSeat={onToggleSeat} />
    </motion.section>
  );
}
