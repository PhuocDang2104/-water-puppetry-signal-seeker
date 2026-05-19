"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  marker: string;
  label: string;
  className?: string;
};

export function SectionHeader({ marker, label, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn("mx-auto flex w-full max-w-6xl items-start gap-5 px-5", className)}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed border-deepGreen text-2xl font-bold text-deepGreen">
        {marker}
      </div>
      <div className="min-w-0 flex-1 pt-4">
        <div className="h-px w-full bg-deepGreen/60" />
        <p className="mt-3 text-sm text-deepGreen">{label}</p>
      </div>
    </motion.div>
  );
}
