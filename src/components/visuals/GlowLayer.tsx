"use client";

import { motion, useReducedMotion } from "motion/react";

export function GlowLayer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      data-anim="glow"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        className="h-[62%] w-[62%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(26,71,200,0.22) 0%, rgba(26,71,200,0.08) 45%, rgba(26,71,200,0) 72%)",
          filter: "blur(6px)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[34%] w-[34%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 75%)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.12, 1] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
