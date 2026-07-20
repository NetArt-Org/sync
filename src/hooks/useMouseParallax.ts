"use client";

import { type RefObject, useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";

interface UseMouseParallaxOptions {
  /** Maximum normalized offset, from -1 to 1, on each axis. */
  strength?: number;
}

/**
 * Tracks pointer position within a container and exposes spring-smoothed,
 * normalized (-1 to 1) motion values other layers can map into depth offsets.
 */
export function useMouseParallax(
  containerRef: RefObject<HTMLElement | null>,
  { strength = 1 }: UseMouseParallaxOptions = {},
) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  const springX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      rawX.set(Math.max(-1, Math.min(1, nx)) * strength);
      rawY.set(Math.max(-1, Math.min(1, ny)) * strength);
    };

    const handlePointerLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [containerRef, prefersReducedMotion, rawX, rawY, strength]);

  return { x: springX, y: springY };
}
