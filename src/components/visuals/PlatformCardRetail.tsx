"use client";

import { ShoppingCart } from "lucide-react";
import type { MotionValue } from "motion/react";
import { PLATFORM_PLACEMENTS } from "@/data/platforms";
import { PlatformCard } from "./PlatformCard";

const placement = PLATFORM_PLACEMENTS.find((p) => p.id === "retail")!;

export function PlatformCardRetail({
  parallaxX,
  parallaxY,
}: {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) {
  return (
    <PlatformCard
      icon={<ShoppingCart className="h-[48%] w-[48%] text-[#D97706]" strokeWidth={1.75} />}
      label="Retail"
      accentClassName="bg-[#FFF3E0]"
      placement={placement}
      parallaxX={parallaxX}
      parallaxY={parallaxY}
    />
  );
}
