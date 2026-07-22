"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { scrollState, useExperience, chapterFromProgress } from "./store";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

/**
 * Momentum smooth-scroll + the single source of scroll truth. One master
 * ScrollTrigger writes the smoothed 0..1 progress into `scrollState` (read by
 * the 3D world) and the active chapter into the reactive store (nav / dots).
 * The fixed canvas + nav live OUTSIDE #smooth-content (they must not be
 * transformed by the smoother).
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const setActiveChapter = useExperience((s) => s.setActiveChapter);
  const setReady = useExperience((s) => s.setReady);

  useGSAP(
    () => {
      const staticMode =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).has("static");
      let smoother: ScrollSmoother | undefined;
      if (!reduced && !staticMode) {
        smoother = ScrollSmoother.create({
          wrapper: wrapper.current!,
          content: content.current!,
          smooth: 1.2,
          effects: false,
          normalizeScroll: true,
        });
      }

      const master = ScrollTrigger.create({
        trigger: content.current!,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollState.progress = self.progress;
          scrollState.velocity = self.getVelocity();
          setActiveChapter(chapterFromProgress(self.progress));
        },
      });

      setReady(true);
      ScrollTrigger.refresh();

      return () => {
        master.kill();
        smoother?.kill();
      };
    },
    { dependencies: [reduced] }
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
