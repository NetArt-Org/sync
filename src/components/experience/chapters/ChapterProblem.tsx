"use client";

import { useRef } from "react";
import { useChapterReveal } from "../hooks/useChapterReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { problem } from "../data";

export default function ChapterProblem() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useChapterReveal(
    root,
    1,
    (tl, q) => {
      tl.from(q("[data-kicker]"), { opacity: 0, y: 12, duration: 0.6 }, 0)
        .from(q("[data-word]"), { opacity: 0, y: 24, duration: 0.7, stagger: 0.05 }, 0.1)
        .from(q("[data-body]"), { opacity: 0, y: 16, duration: 0.7 }, 0.5)
        .from(q("[data-point]"), { opacity: 0, y: 30, duration: 0.7, stagger: 0.14 }, 0.6);
    },
    reduced
  );

  return (
    <section
      ref={root}
      aria-label="The problem"
      className="relative z-10 flex min-h-screen items-center px-[clamp(24px,6vw,110px)] py-[clamp(90px,12vh,150px)] text-[#eef3ff]"
    >
      <div className="relative mx-auto w-full max-w-[1200px]">
        <span
          data-kicker
          className="inline-flex items-center gap-[10px] text-[12px] font-bold uppercase tracking-[0.22em] text-[#7bb8ff] before:h-px before:w-[26px] before:bg-[rgba(123,184,255,0.6)] before:content-['']"
        >
          {problem.kicker}
        </span>

        <h2 className="mt-[26px] max-w-[15ch] font-bold leading-[1.02] tracking-[-0.03em] text-white">
          {problem.title.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} data-word className="inline-block">
              {word}
              {i < problem.title.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        <p data-body className="mt-[28px] max-w-[620px] leading-[1.6] text-[rgba(220,232,255,0.72)]">
          {problem.body}
        </p>

        <div className="mt-[64px] grid grid-cols-1 gap-[18px] min-[1080px]:grid-cols-3 min-[1080px]:gap-[28px]">
          {problem.points.map((p, i) => (
            <div
              key={p.id}
              data-point
              className="rounded-[18px] border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] px-[24px] py-[26px] backdrop-blur-[4px]"
            >
              <span className="text-[13px] font-bold tracking-[0.1em] text-[#7bb8ff]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-[8px] mt-[14px] text-[19px] font-semibold text-white">{p.title}</h3>
              <p className="m-0 text-[14.5px] leading-[1.55] text-[rgba(220,232,255,0.68)]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
