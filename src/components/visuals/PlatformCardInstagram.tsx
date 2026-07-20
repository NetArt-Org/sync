"use client";

import { Camera } from "lucide-react";
import type { MotionValue } from "motion/react";
import { PLATFORM_PLACEMENTS } from "@/data/platforms";
import { PlatformCard } from "./PlatformCard";

const placement = PLATFORM_PLACEMENTS.find((p) => p.id === "instagram")!;

export function PlatformCardInstagram({
  parallaxX,
  parallaxY,
}: {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) {
  return (
    <PlatformCard
      icon={
        <Camera
          className="h-[52%] w-[52%]"
          strokeWidth={1.75}
          style={{ color: "#C13584" }}
        />
      }
      label="Instagram"
      accentClassName="bg-gradient-to-br from-[#FFE8D6] via-[#FFE0EC] to-[#F1E6FF]"
      placement={placement}
      parallaxX={parallaxX}
      parallaxY={parallaxY}
    />
  );
}
