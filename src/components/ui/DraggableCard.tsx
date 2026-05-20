"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function DraggableCardContainer({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("[perspective:3000px]", className)}>{children}</div>;
}

export function DraggableCardBody({ className, children }: { className?: string; children: ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  };

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-18, 18]), springConfig);
  const opacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.9, 1, 0.9]), springConfig);
  const glareOpacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.16, 0, 0.16]), springConfig);

  function handleMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(event.clientX - (rect.left + rect.width / 2));
    mouseY.set(event.clientY - (rect.top + rect.height / 2));
  }

  function resetTilt() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className={cn("absolute", className)} style={active ? { zIndex: 100 } : undefined}>
      <motion.div
        ref={cardRef}
        drag
        dragMomentum
        dragTransition={{ power: 0.08, timeConstant: 140, restDelta: 0.5 }}
        onDragStart={() => {
          setActive(true);
          document.body.style.cursor = "grabbing";
        }}
        onDragEnd={() => {
          setActive(false);
          document.body.style.cursor = "default";
          resetTilt();
        }}
        style={{ rotateX, rotateY, opacity, willChange: "transform" }}
        whileHover={{ scale: 1.045 }}
        whileDrag={{ scale: 1.055 }}
        onMouseEnter={() => setActive(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setActive(false);
          resetTilt();
        }}
        className="relative h-full w-full cursor-grab overflow-hidden rounded-md [transform-style:preserve-3d] active:cursor-grabbing"
      >
        {children}
        <motion.div style={{ opacity: glareOpacity }} className="pointer-events-none absolute inset-0 select-none bg-white" />
      </motion.div>
    </div>
  );
}
