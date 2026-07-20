"use client";

import { motion, useReducedMotion } from "motion/react";

export function AmbientElements() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      data-anim="particle"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <motion.div
        className="absolute left-[4%] top-[20%] h-10 w-10 rounded-full border border-white/70 bg-white/40 backdrop-blur-md"
        style={{ boxShadow: "0 10px 24px -8px rgba(15,26,64,0.18)" }}
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -14, 0], rotate: [0, 8, 0] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[2%] top-[62%] h-16 w-16 rounded-2xl border border-white/60 bg-white/30 backdrop-blur-md"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, 16, 0], rotate: [-4, 4, -4] }
        }
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[6%] left-[46%] h-6 w-6 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(26,71,200,0.35) 0%, rgba(26,71,200,0) 70%)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.3, 0.9, 0.3], scale: [1, 1.3, 1] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
