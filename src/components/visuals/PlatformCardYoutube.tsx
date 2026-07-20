"use client";

import type { MotionValue } from "motion/react";
import { PLATFORM_PLACEMENTS } from "@/data/platforms";
import { PlatformCard } from "./PlatformCard";
import { PlayMark } from "./icons/PlayMark";

const placement = PLATFORM_PLACEMENTS.find((p) => p.id === "youtube")!;

export function PlatformCardYoutube({
  parallaxX,
  parallaxY,
}: {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) {
  return (
    <PlatformCard
      icon={<PlayMark className="h-[54%] w-[54%] text-[#FF0000]" />}
      label="YouTube"
      accentClassName="bg-[#FFECEC]"
      placement={placement}
      parallaxX={parallaxX}
      parallaxY={parallaxY}
    />
  );
}
