"use client";

import { motion, useReducedMotion } from "motion/react";

export function CoreOrb() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      data-anim="orb"
      className="relative flex h-[34%] w-[34%] items-center justify-center"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95) 0%, rgba(237,242,255,0.85) 30%, rgba(214,224,250,0.55) 62%, rgba(214,224,250,0.15) 100%)",
          boxShadow:
            "0 30px 60px -20px rgba(26,71,200,0.25), inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -12px 24px rgba(148,171,235,0.25)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.035, 1] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-[10%] rounded-full border border-white/70"
        style={{ boxShadow: "inset 0 0 30px rgba(255,255,255,0.6)" }}
        animate={
          prefersReducedMotion
            ? undefined
            : { rotate: 360 }
        }
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      <div
        className="relative grid grid-cols-2 gap-[10%]"
        style={{ width: "30%", height: "30%" }}
        role="img"
        aria-label="SYNC mark"
      >
        <motion.span
          className="rounded-full"
          style={{
            background: "linear-gradient(135deg, #1A47C8 0%, #3E6BFF 100%)",
          }}
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="rounded-full bg-[#1A47C8]/70"
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.1, 1] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        <motion.span
          className="rounded-full bg-[#1A47C8]/50"
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.1, 1] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />
        <motion.span
          className="rounded-full"
          style={{
            background: "linear-gradient(135deg, #1A47C8 0%, #6E8CFF 100%)",
          }}
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.18, 1] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9,
          }}
        />
      </div>
    </div>
  );
}
