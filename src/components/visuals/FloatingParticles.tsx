"use client";

import { motion, useReducedMotion } from "motion/react";

interface Particle {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

const PARTICLES: Particle[] = [
  { top: "12%", left: "38%", size: 5, duration: 6, delay: 0 },
  { top: "22%", left: "72%", size: 4, duration: 7.5, delay: 0.6 },
  { top: "34%", left: "26%", size: 3, duration: 5.5, delay: 1.2 },
  { top: "58%", left: "62%", size: 6, duration: 8, delay: 0.3 },
  { top: "66%", left: "34%", size: 4, duration: 6.5, delay: 1.6 },
  { top: "78%", left: "58%", size: 3, duration: 7, delay: 0.9 },
  { top: "40%", left: "84%", size: 4, duration: 6.8, delay: 1.9 },
  { top: "8%", left: "60%", size: 3, duration: 5.8, delay: 1.1 },
];

export function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      data-anim="particle"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#1A47C8]/40"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -18, 0],
                  x: [0, 6, 0],
                  opacity: [0.25, 0.8, 0.25],
                }
          }
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
