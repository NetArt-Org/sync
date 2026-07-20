"use client";

import { Infinity as InfinityIcon } from "lucide-react";
import type { MotionValue } from "motion/react";
import { PLATFORM_PLACEMENTS } from "@/data/platforms";
import { PlatformCard } from "./PlatformCard";

const placement = PLATFORM_PLACEMENTS.find((p) => p.id === "meta")!;

export function PlatformCardMeta({
  parallaxX,
  parallaxY,
}: {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) {
  return (
    <PlatformCard
      icon={<InfinityIcon className="h-[54%] w-[54%] text-[#0866FF]" strokeWidth={2} />}
      label="Meta"
      accentClassName="bg-[#EAF1FF]"
      placement={placement}
      parallaxX={parallaxX}
      parallaxY={parallaxY}
    />
  );
}
