"use client";

import { type ReactNode } from "react";
import { motion, type MotionValue, useReducedMotion } from "motion/react";
import type { PlatformPlacement } from "@/data/platforms";
import { useDepthOffset } from "@/hooks/useDepthOffset";

interface PlatformCardProps {
  icon: ReactNode;
  label: string;
  accentClassName: string;
  placement: PlatformPlacement;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}

/**
 * Four independent transform owners so responsibilities never fight over
 * the same element's transform:
 *  - position (plain div): absolute top/left placement
 *  - center (plain div): static -50%/-50% centering via CSS
 *  - parallax (motion.div): live mouse-parallax px offset only
 *  - entrance (plain div, data-anim="card"): GSAP one-time entrance target
 *  - float (motion.div): Framer's continuous idle float/rotate + hover
 */
export function PlatformCard({
  icon,
  label,
  accentClassName,
  placement,
  parallaxX,
  parallaxY,
}: PlatformCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const depthRange = 16 * placement.depth;

  const dx = useDepthOffset(parallaxX, depthRange);
  const dy = useDepthOffset(parallaxY, depthRange);

  return (
    <div
      className="absolute"
      style={{ top: placement.top, left: placement.left, width: "clamp(4.5rem, 9vw, 6.75rem)" }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ x: dx, y: dy }}>
          <div data-anim="card" data-order={placement.order}>
            <motion.div
              className="flex flex-col items-center gap-[clamp(0.35rem,0.7vw,0.5rem)] rounded-2xl bg-white/90 px-[clamp(0.55rem,1.1vw,0.85rem)] py-[clamp(0.5rem,1vw,0.75rem)] text-center shadow-[0_18px_40px_-16px_rgba(15,26,64,0.28)] ring-1 ring-black/[0.04] backdrop-blur-sm"
              initial={{ rotate: placement.rotate }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, -10, 0],
                      rotate: [
                        placement.rotate,
                        placement.rotate + 2.5,
                        placement.rotate,
                      ],
                    }
              }
              transition={{
                duration: 4.5 + placement.depth * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: placement.order * 0.35,
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: 1.12,
                      rotate: 0,
                      boxShadow: "0 24px 48px -14px rgba(15,26,64,0.35)",
                      transition: { type: "spring", stiffness: 260, damping: 18 },
                    }
              }
            >
              <span
                className={`flex aspect-square w-full items-center justify-center rounded-xl ${accentClassName}`}
              >
                {icon}
              </span>
              <span className="text-[clamp(0.6rem,0.9vw,0.75rem)] font-semibold tracking-tight text-[#0a1128]">
                {label}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
