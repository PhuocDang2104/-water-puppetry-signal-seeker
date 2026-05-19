"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
};

export function Button({
  children,
  className,
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02, x: 2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={cn(
        "focus-ring relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition",
        variant === "primary" &&
          "bg-deepGreen text-white shadow-[0_8px_22px_rgba(13,90,73,0.25)] hover:bg-darkGreen",
        variant === "secondary" &&
          "border border-deepGreen bg-white text-deepGreen hover:bg-paleMint",
        variant === "ghost" && "text-deepGreen hover:bg-paleMint",
        variant === "dark" && "bg-ink text-white hover:bg-deepGreen",
        disabled && "cursor-not-allowed opacity-45 hover:bg-deepGreen",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
