"use client";

import { useRef } from "react";
import { useChapterReveal } from "../hooks/useChapterReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { converge } from "../data";

export default function ChapterConverge() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useChapterReveal(
    root,
    2,
    (tl, q) => {
      tl.from(q("[data-kicker]"), { opacity: 0, y: 12, duration: 0.6 }, 0)
        .from(q("[data-title]"), { opacity: 0, y: 26, duration: 0.9 }, 0.1)
        .from(q("[data-body]"), { opacity: 0, y: 16, duration: 0.7 }, 0.4)
        .from(q("[data-pillar]"), { opacity: 0, y: 30, duration: 0.7, stagger: 0.13 }, 0.5)
        .from(q("[data-stat]"), { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 }, 0.9);
    },
    reduced
  );

  return (
    <section
      ref={root}
      aria-label="One source of truth"
      className="relative z-10 flex min-h-screen items-center px-[clamp(24px,6vw,110px)] py-[clamp(90px,12vh,150px)] text-[#eef3ff]"
    >
      <div className="relative mx-auto w-full max-w-[1200px]">
        <span
          data-kicker
          className="inline-flex items-center gap-[10px] text-[12px] font-bold uppercase tracking-[0.22em] text-[#7bb8ff] before:h-px before:w-[26px] before:bg-[rgba(123,184,255,0.6)] before:content-['']"
        >
          {converge.kicker}
        </span>

        <h2
          data-title
          className="mt-[24px] max-w-[18ch] font-bold leading-[1.04] tracking-[-0.03em] text-white"
        >
          {converge.title}
        </h2>

        <p data-body className="mt-[26px] max-w-[640px] leading-[1.6] text-[rgba(220,232,255,0.74)]">
          {converge.body}
        </p>

        <div className="mt-[60px] grid grid-cols-1 gap-[18px] min-[1080px]:grid-cols-3 min-[1080px]:gap-[28px]">
          {converge.pillars.map((p) => (
            <div key={p.id} data-pillar className="relative pl-[20px]">
              <span className="absolute bottom-[4px] left-0 top-[4px] w-[3px] rounded-[3px] bg-gradient-to-b from-[#0a84ff] to-[#7bb8ff]" />
              <h3 className="mb-[10px] text-[20px] font-semibold text-white">{p.title}</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-[rgba(220,232,255,0.7)]">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-[64px] grid grid-cols-2 gap-[20px] border-t border-[rgba(255,255,255,0.1)] pt-[34px] min-[1080px]:grid-cols-4">
          {converge.stats.map((s) => (
            <div key={s.label} data-stat>
              <div className="text-[32px] font-bold tracking-[-0.02em] text-white">{s.value}</div>
              <div className="mt-[6px] text-[13px] text-[rgba(220,232,255,0.6)]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
