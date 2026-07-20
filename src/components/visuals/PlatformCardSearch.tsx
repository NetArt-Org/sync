"use client";

import { Search } from "lucide-react";
import type { MotionValue } from "motion/react";
import { PLATFORM_PLACEMENTS } from "@/data/platforms";
import { PlatformCard } from "./PlatformCard";

const placement = PLATFORM_PLACEMENTS.find((p) => p.id === "search")!;

export function PlatformCardSearch({
  parallaxX,
  parallaxY,
}: {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) {
  return (
    <PlatformCard
      icon={<Search className="h-[48%] w-[48%] text-[#1A47C8]" strokeWidth={2} />}
      label="Search"
      accentClassName="bg-[#EAF1FF]"
      placement={placement}
      parallaxX={parallaxX}
      parallaxY={parallaxY}
    />
  );
}
