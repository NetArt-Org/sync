"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "motion/react";

/**
 * Scales a -1..1 normalized motion value into a -range..range pixel offset.
 * Implemented with a manual subscription (rather than useTransform's array
 * overload) to sidestep a hook-order mismatch that overload triggers when
 * paired with React 19 strict-mode double-rendering.
 */
export function useDepthOffset(source: MotionValue<number>, range: number): MotionValue<number> {
  const output = useMotionValue(source.get() * range);

  useEffect(() => {
    output.set(source.get() * range);
    return source.on("change", (latest) => {
      output.set(latest * range);
    });
  }, [source, range, output]);

  return output;
}
