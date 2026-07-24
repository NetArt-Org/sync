"use client";

import { useRef } from "react";
import { Eye, BarChart3, Bell, ArrowRight } from "lucide-react";
import HeroPhone from "../ui/HeroPhone";
import { useChapterReveal } from "../hooks/useChapterReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { pulse } from "../data";

const ICONS = { reach: Eye, lift: BarChart3, alert: Bell } as const;

export default function ChapterPulse() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useChapterReveal(
    root,
    3,
    (tl, q) => {
      tl.from(q("[data-kicker]"), { opacity: 0, y: 12, duration: 0.6 }, 0)
        .from(q("[data-word]"), { yPercent: 120, duration: 0.9, stagger: 0.1, ease: "power4.out" }, 0.1)
        .from(q("[data-body]"), { opacity: 0, y: 16, duration: 0.7 }, 0.5)
        .from(q("[data-feature]"), { opacity: 0, x: -24, duration: 0.6, stagger: 0.12 }, 0.6)
        .from(q("[data-ctas]"), { opacity: 0, y: 16, duration: 0.6 }, 0.9)
        .from(q("[data-phone]"), { opacity: 0, y: 60, rotateY: -18, scale: 0.9, duration: 1.2, ease: "power3.out" }, 0.2)
        .from(q("[data-float]"), { opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.15, ease: "back.out(1.6)" }, 0.9);
    },
    reduced
  );

  return (
    <section
      ref={root}
      aria-label="Sync Pulse app"
      className="relative z-10 flex min-h-screen items-center px-[clamp(24px,6vw,110px)] py-[clamp(90px,12vh,150px)] text-[#eef3ff]"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-[48px] min-[1080px]:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] min-[1080px]:gap-[clamp(32px,5vw,80px)]">
        <div className="max-w-[560px]">
          <span
            data-kicker
            className="inline-flex items-center gap-[10px] text-[12px] font-bold uppercase tracking-[0.22em] text-[#7bb8ff] before:h-px before:w-[26px] before:bg-[rgba(123,184,255,0.6)] before:content-['']"
          >
            {pulse.kicker}
          </span>

          <h2 className="mt-[22px] font-bold leading-[0.96] tracking-[-0.03em] text-white">
            <span className="inline-block overflow-hidden px-[0.02em] align-bottom">
              <span data-word className="inline-block will-change-transform">{pulse.titleLead}</span>
            </span>{" "}
            <span className="inline-block overflow-hidden px-[0.02em] align-bottom">
              <span
                data-word
                className="inline-block bg-[linear-gradient(120deg,#0a84ff,#7bb8ff_55%,#0a84ff)] bg-clip-text text-transparent will-change-transform"
              >
                {pulse.titleAccent}
              </span>
            </span>
          </h2>

          <p data-body className="mt-[24px] max-w-[500px] leading-[1.6] text-[rgba(220,232,255,0.74)]">
            {pulse.desc}
          </p>

          <div className="mt-[34px] flex flex-col gap-[22px]">
            {pulse.features.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <div
                  key={f.title}
                  data-feature
                  className="grid grid-cols-[44px_1fr] items-start gap-[15px]"
                >
                  <span className="grid h-[44px] w-[44px] place-items-center rounded-[13px] border border-[rgba(123,184,255,0.25)] bg-[linear-gradient(150deg,rgba(59,130,246,0.22),rgba(26,71,200,0.12))] text-[#7bb8ff]">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="mb-[4px] mt-[2px] text-[16.5px] font-semibold text-white">{f.title}</h3>
                    <p className="m-0 text-[14.5px] leading-[1.5] text-[rgba(220,232,255,0.66)]">{f.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div data-ctas className="mt-[36px] flex flex-wrap items-center gap-[22px]">
            <a
              href="#"
              className="inline-flex items-center gap-[10px] rounded-[12px] bg-[linear-gradient(135deg,#1d4ed8,#2563eb_55%,#3b82f6)] px-[26px] py-[15px] text-[15px] font-semibold text-white no-underline shadow-[0_12px_30px_-10px_rgba(26,71,200,0.6)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[2px] hover:shadow-[0_18px_40px_-10px_rgba(26,71,200,0.75)] [&:hover_svg]:translate-x-[3px] [&_svg]:transition-transform"
            >
              {pulse.ctas.primary}
              <ArrowRight size={17} strokeWidth={2} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-[8px] text-[15px] font-semibold text-[#cfe0ff] no-underline transition-colors hover:text-white [&:hover_svg]:translate-x-[3px] [&_svg]:transition-transform"
            >
              {pulse.ctas.secondary}
              <ArrowRight size={16} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="relative order-first grid place-items-center [perspective:1600px] min-[1080px]:order-none">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-20%_-30%] bg-[radial-gradient(46%_42%_at_50%_46%,rgba(37,99,235,0.4),transparent_70%)] blur-[40px]"
          />
          <div data-phone className="relative [transform-style:preserve-3d] will-change-transform">
            <HeroPhone />
          </div>

          <div
            data-float
            className="absolute right-[-18px] top-[14%] z-[5] flex items-center gap-[11px] rounded-[15px] border border-[rgba(10,30,80,0.08)] bg-[rgba(255,255,255,0.95)] px-[15px] py-[12px] shadow-[0_12px_34px_-10px_rgba(0,0,0,0.4)] backdrop-blur-[10px]"
          >
            <span className="grid h-[32px] w-[32px] flex-none place-items-center rounded-[10px] bg-[linear-gradient(150deg,#3b82f6,#1a47c8)] text-[13px] font-bold text-white">
              ▲
            </span>
            <div>
              <div className="text-[12.5px] font-bold text-[#0d1117]">Outcome lift</div>
              <div className="mt-[1px] text-[11.5px] text-[#5a6478]">+20.3% · 24h</div>
            </div>
          </div>

          <div
            data-float
            className="absolute bottom-[16%] left-[-30px] z-[5] flex items-center gap-[11px] rounded-[15px] border border-[rgba(10,30,80,0.08)] bg-[rgba(255,255,255,0.95)] px-[15px] py-[12px] shadow-[0_12px_34px_-10px_rgba(0,0,0,0.4)] backdrop-blur-[10px]"
          >
            <span className="grid h-[32px] w-[32px] flex-none place-items-center rounded-[10px] bg-[linear-gradient(150deg,#f8b74d,#f59e0b)] text-[13px] font-bold text-white">
              !
            </span>
            <div>
              <div className="text-[12.5px] font-bold text-[#0d1117]">Push alert</div>
              <div className="mt-[1px] text-[11.5px] text-[#5a6478]">CTV overlap detected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
