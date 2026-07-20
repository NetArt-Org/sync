"use client";

import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import { HERO_COPY } from "@/constants/hero";
import { useHeroTimeline } from "@/hooks/useHeroTimeline";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollCue } from "@/components/shared/ScrollCue";
import { SectionIndexRail } from "@/components/shared/SectionIndexRail";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useHeroTimeline({
    container: containerRef,
    eyebrow: eyebrowRef,
    headline: headlineRef,
    description: descriptionRef,
    meta: metaRef,
    visual: visualRef,
  });

  return (
    <section
      ref={containerRef}
      aria-label="SYNC — all your media, finally together"
      className="relative isolate flex min-h-screen w-full items-start overflow-hidden bg-[#fbfcff] px-[clamp(1.25rem,5vw,4rem)] py-[clamp(3rem,10vh,6rem)] lg:items-center"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-[clamp(2rem,6vh,4.5rem)] lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]">
        <div ref={eyebrowRef}>
          <SectionIndexRail />
        </div>

        <div className="flex flex-col gap-[clamp(1.5rem,2.6vw,2rem)]">
          <h1
            ref={headlineRef}
            className="text-[clamp(2.25rem,5.2vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-[#0a1128] text-balance"
          >
            <span className="block">{HERO_COPY.headline.line1}</span>
            <span className="block">
              {HERO_COPY.headline.line2Prefix}
              <span className="relative inline-block text-[#1A47C8]">
                <span
                  data-hero-highlight-bar
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[0.1em] -z-10 h-[0.32em] origin-left rounded-sm bg-[#1A47C8]/15"
                />
                {HERO_COPY.headline.line2Highlight}
              </span>
            </span>
          </h1>

          <p
            ref={descriptionRef}
            className="max-w-[34rem] text-[clamp(1rem,1.25vw,1.15rem)] leading-relaxed text-[#0a1128]/65"
          >
            {HERO_COPY.description}
          </p>

          <div
            ref={metaRef}
            className="flex flex-col gap-[clamp(1.75rem,3.5vw,2.25rem)] pt-1"
          >
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton variant="primary" icon={<ArrowRight className="h-4 w-4" />}>
                {HERO_COPY.primaryCta.label}
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                iconPosition="leading"
                icon={
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#0a1128]/25">
                    <Play className="h-2.5 w-2.5 fill-current" />
                  </span>
                }
              >
                {HERO_COPY.secondaryCta.label}
              </MagneticButton>
            </div>

            <ScrollCue label={HERO_COPY.scrollCue} />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[34rem]">
          <HeroVisual visualRef={visualRef} />
        </div>
      </div>
    </section>
  );
}
