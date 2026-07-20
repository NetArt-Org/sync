"use client";

import { Tv } from "lucide-react";
import type { MotionValue } from "motion/react";
import { PLATFORM_PLACEMENTS } from "@/data/platforms";
import { PlatformCard } from "./PlatformCard";

const placement = PLATFORM_PLACEMENTS.find((p) => p.id === "tv")!;

export function PlatformCardTV({
  parallaxX,
  parallaxY,
}: {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) {
  return (
    <PlatformCard
      icon={<Tv className="h-[52%] w-[52%] text-[#0a1128]" strokeWidth={1.75} />}
      label="TV"
      accentClassName="bg-[#eef1f8]"
      placement={placement}
      parallaxX={parallaxX}
      parallaxY={parallaxY}
    />
  );
}
