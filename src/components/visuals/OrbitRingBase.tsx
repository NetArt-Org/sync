"use client";

import { motion, useReducedMotion } from "motion/react";

interface OrbitRingBaseProps {
  sizePercent: number;
  duration: number;
  direction?: 1 | -1;
  dashed?: boolean;
  opacity?: number;
}

export function OrbitRingBase({
  sizePercent,
  duration,
  direction = 1,
  dashed = false,
  opacity = 1,
}: OrbitRingBaseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      data-anim="orbit"
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        width: `${sizePercent}%`,
        height: `${sizePercent}%`,
        border: dashed
          ? "1.5px dashed rgba(26,71,200,0.16)"
          : "1px solid rgba(26,71,200,0.14)",
        opacity,
      }}
      animate={
        prefersReducedMotion
          ? undefined
          : { rotate: 360 * direction }
      }
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}
