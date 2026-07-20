"use client";

import { type RefObject } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { BackgroundLayer } from "./BackgroundLayer";
import { GlowLayer } from "./GlowLayer";
import { AmbientElements } from "./AmbientElements";
import { FloatingParticles } from "./FloatingParticles";
import { OrbitRing01 } from "./OrbitRing01";
import { OrbitRing02 } from "./OrbitRing02";
import { OrbitRing03 } from "./OrbitRing03";
import { CoreOrb } from "./CoreOrb";
import { PlatformCardTV } from "./PlatformCardTV";
import { PlatformCardYoutube } from "./PlatformCardYoutube";
import { PlatformCardMeta } from "./PlatformCardMeta";
import { PlatformCardInstagram } from "./PlatformCardInstagram";
import { PlatformCardSearch } from "./PlatformCardSearch";
import { PlatformCardOTT } from "./PlatformCardOTT";
import { PlatformCardRetail } from "./PlatformCardRetail";

interface HeroVisualProps {
  visualRef: RefObject<HTMLDivElement | null>;
}

export function HeroVisual({ visualRef }: HeroVisualProps) {
  const { x: parallaxX, y: parallaxY } = useMouseParallax(visualRef, {
    strength: 1,
  });

  return (
    <div
      ref={visualRef}
      role="img"
      aria-label="Interactive diagram showing SYNC unifying TV, YouTube, Meta, Instagram, search, OTT, and retail media into one platform"
      className="relative aspect-square w-full select-none"
    >
      <BackgroundLayer />
      <GlowLayer />
      <AmbientElements />
      <FloatingParticles />

      <div className="absolute inset-0 flex items-center justify-center">
        <OrbitRing03 />
        <OrbitRing02 />
        <OrbitRing01 />
        <CoreOrb />
      </div>

      <PlatformCardTV parallaxX={parallaxX} parallaxY={parallaxY} />
      <PlatformCardYoutube parallaxX={parallaxX} parallaxY={parallaxY} />
      <PlatformCardMeta parallaxX={parallaxX} parallaxY={parallaxY} />
      <PlatformCardInstagram parallaxX={parallaxX} parallaxY={parallaxY} />
      <PlatformCardSearch parallaxX={parallaxX} parallaxY={parallaxY} />
      <PlatformCardOTT parallaxX={parallaxX} parallaxY={parallaxY} />
      <PlatformCardRetail parallaxX={parallaxX} parallaxY={parallaxY} />
    </div>
  );
}
