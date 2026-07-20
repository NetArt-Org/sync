"use client";

import { Laptop } from "lucide-react";
import type { MotionValue } from "motion/react";
import { PLATFORM_PLACEMENTS } from "@/data/platforms";
import { PlatformCard } from "./PlatformCard";

const placement = PLATFORM_PLACEMENTS.find((p) => p.id === "ott")!;

export function PlatformCardOTT({
  parallaxX,
  parallaxY,
}: {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) {
  return (
    <PlatformCard
      icon={<Laptop className="h-[50%] w-[50%] text-[#6D28D9]" strokeWidth={1.75} />}
      label="OTT"
      accentClassName="bg-[#F1EBFF]"
      placement={placement}
      parallaxX={parallaxX}
      parallaxY={parallaxY}
    />
  );
}
