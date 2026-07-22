"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { devTimelines } from "../store";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type BuildFn = (
  tl: gsap.core.Timeline,
  q: (sel: string) => Element[]
) => void;

/**
 * Per-chapter reveal: builds a paused timeline and plays it when the chapter
 * scrolls into view (reverses on the way back). Registers the timeline in a
 * dev map so each chapter can be composed for inspection without live RAF.
 */
export function useChapterReveal(
  scope: RefObject<HTMLElement | null>,
  chapterIndex: number,
  build: BuildFn,
  reduced: boolean
) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(scope) as (sel: string) => Element[];
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      build(tl, q);

      if (reduced) {
        tl.progress(1);
        return;
      }

      const st = ScrollTrigger.create({
        trigger: scope.current!,
        start: "top 72%",
        end: "bottom 20%",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });

      if (process.env.NODE_ENV !== "production") {
        devTimelines.set(chapterIndex, tl);
      }

      return () => {
        st.kill();
        tl.kill();
        devTimelines.delete(chapterIndex);
      };
    },
    { scope, dependencies: [reduced] }
  );
}
