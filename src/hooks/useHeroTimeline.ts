"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export interface HeroTimelineRefs {
  container: RefObject<HTMLElement | null>;
  eyebrow: RefObject<HTMLElement | null>;
  headline: RefObject<HTMLElement | null>;
  description: RefObject<HTMLElement | null>;
  meta: RefObject<HTMLElement | null>;
  visual: RefObject<HTMLElement | null>;
}

/**
 * Orchestrates the hero's entrance choreography (headline split-text reveal,
 * description word reveal, CTA/meta reveal, layered visual assembly) and a
 * scroll-linked depth timeline that plays the visual system out as the hero
 * scrolls past. GSAP owns sequencing here; ambient/idle motion lives in
 * Framer Motion inside the individual visual components.
 */
export function useHeroTimeline(refs: HeroTimelineRefs) {
  useGSAP(
    () => {
      const container = refs.container.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const conditions = context.conditions as { reduceMotion: boolean };
          const reduceMotion = conditions.reduceMotion;

          if (reduceMotion) {
            gsap.set(
              [
                refs.eyebrow.current,
                refs.headline.current,
                refs.description.current,
                refs.meta.current,
                refs.visual.current,
              ],
              { opacity: 1, clearProps: "all" },
            );
            return;
          }

          const entrance = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          if (refs.eyebrow.current) {
            entrance.from(
              refs.eyebrow.current,
              { opacity: 0, y: 14, duration: 0.6 },
              0,
            );
          }

          if (refs.headline.current) {
            SplitText.create(refs.headline.current, {
              type: "lines, words, chars",
              mask: "lines",
              linesClass: "hero-line",
              wordsClass: "hero-word",
              charsClass: "hero-char",
              autoSplit: true,
              onSplit(self) {
                const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

                tl.from(
                  self.lines,
                  { yPercent: 110, duration: 1.05, stagger: 0.14 },
                  0,
                ).from(
                  self.chars,
                  {
                    opacity: 0,
                    filter: "blur(10px)",
                    duration: 0.7,
                    stagger: 0.012,
                    ease: "power2.out",
                  },
                  0.08,
                );

                const highlightBar = container.querySelector<HTMLElement>(
                  "[data-hero-highlight-bar]",
                );
                if (highlightBar) {
                  tl.fromTo(
                    highlightBar,
                    { scaleX: 0, transformOrigin: "left center" },
                    { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
                    "-=0.5",
                  ).to(
                    highlightBar,
                    { opacity: 0.16, duration: 0.4, ease: "power1.out" },
                    "-=0.1",
                  );
                }

                entrance.add(tl, 0);
                return tl;
              },
            });
          }

          if (refs.description.current) {
            SplitText.create(refs.description.current, {
              type: "words",
              wordsClass: "hero-desc-word",
              autoSplit: true,
              onSplit(self) {
                const tl = gsap.timeline();
                tl.from(self.words, {
                  opacity: 0,
                  y: 14,
                  filter: "blur(4px)",
                  duration: 0.6,
                  stagger: 0.032,
                  ease: "power2.out",
                });
                entrance.add(tl, 0.55);
                return tl;
              },
            });
          }

          if (refs.meta.current) {
            const metaChildren = gsap.utils.toArray<HTMLElement>(
              refs.meta.current.children,
            );
            entrance.from(
              metaChildren,
              { opacity: 0, y: 18, duration: 0.6, stagger: 0.09 },
              1.0,
            );
          }

          if (refs.visual.current) {
            const q = gsap.utils.selector(refs.visual);
            entrance
              .from(
                q('[data-anim="bg"]'),
                { opacity: 0, duration: 1.1, ease: "power2.out" },
                0.05,
              )
              .from(
                q('[data-anim="glow"]'),
                { opacity: 0, scale: 0.85, duration: 1.2, ease: "power2.out" },
                0.15,
              )
              .from(
                q('[data-anim="orbit"]'),
                {
                  opacity: 0,
                  scale: 0.8,
                  duration: 1,
                  stagger: 0.08,
                  ease: "power3.out",
                },
                0.25,
              )
              .from(
                q('[data-anim="orb"]'),
                {
                  opacity: 0,
                  scale: 0.4,
                  filter: "blur(16px)",
                  duration: 0.9,
                  ease: "back.out(1.6)",
                },
                0.3,
              )
              .from(
                q('[data-anim="card"]'),
                {
                  opacity: 0,
                  y: 28,
                  scale: 0.6,
                  rotate: "+=10",
                  duration: 0.7,
                  stagger: { each: 0.09, from: "random" },
                  ease: "back.out(2.2)",
                },
                0.45,
              )
              .from(
                q('[data-anim="particle"]'),
                { opacity: 0, duration: 1, stagger: 0.02 },
                0.7,
              );
          }

          if (refs.visual.current) {
            const q = gsap.utils.selector(refs.visual);
            gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            })
              .to(q('[data-anim="bg"]'), { y: 40, ease: "none" }, 0)
              .to(
                q('[data-anim="glow"]'),
                { opacity: 0.3, y: 60, ease: "none" },
                0,
              )
              .to(
                q('[data-anim="orbit"]'),
                { y: 90, opacity: 0.4, ease: "none" },
                0,
              )
              .to(
                q('[data-anim="orb"]'),
                { y: 70, scale: 1.08, ease: "none" },
                0,
              )
              .to(
                q('[data-anim="card"]'),
                { y: -70, opacity: 0, stagger: 0.02, ease: "none" },
                0,
              )
              .to(
                [refs.headline.current, refs.description.current, refs.meta.current],
                { y: -60, opacity: 0, ease: "none" },
                0,
              );
          }

          return () => {
            entrance.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: refs.container },
  );
}
