"use client";

import { type PointerEvent, type RefObject, useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";

interface UseMagneticOptions {
  /** How far the element travels toward the cursor, in pixels. */
  range?: number;
}

/**
 * Magnetic-pull interaction: the element eases toward the cursor while
 * hovered and springs back to rest on leave.
 */
export function useMagnetic<T extends HTMLElement>(
  { range = 18 }: UseMagneticOptions = {},
): {
  ref: RefObject<T | null>;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  onPointerMove: (event: PointerEvent<T>) => void;
  onPointerLeave: () => void;
} {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20, mass: 0.5 });

  const onPointerMove = (event: PointerEvent<T>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    rawX.set((relX / (rect.width / 2)) * range);
    rawY.set((relY / (rect.height / 2)) * range);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, x, y, onPointerMove, onPointerLeave };
}
