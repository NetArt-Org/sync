"use client";

import { motion, useReducedMotion } from "motion/react";

export function ScrollCue({ label }: { label: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-start gap-3 text-[#0a1128]/60">
      <div className="flex items-center gap-3">
        <span className="relative flex h-6 w-4 items-start justify-center rounded-full border border-[#0a1128]/30 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-[#1A47C8]"
            animate={prefersReducedMotion ? undefined : { y: [0, 7, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="text-[clamp(0.7rem,0.9vw,0.8rem)] font-medium tracking-wide">
          {label}
        </span>
      </div>
      <motion.span
        aria-hidden="true"
        className="ml-2 h-8 w-px origin-top bg-[#0a1128]/20"
        animate={prefersReducedMotion ? undefined : { scaleY: [1, 0.4, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
