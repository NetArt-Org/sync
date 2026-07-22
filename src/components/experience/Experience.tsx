"use client";

import { useEffect, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./experience.module.css";
import SmoothScrollProvider from "./SmoothScrollProvider";
import Nav from "./ui/Nav";
import ScrollProgress from "./ui/ScrollProgress";
import ChapterIntro from "./chapters/ChapterIntro";
import ChapterProblem from "./chapters/ChapterProblem";
import ChapterConverge from "./chapters/ChapterConverge";
import ChapterPulse from "./chapters/ChapterPulse";
import ChapterOutcomes from "./chapters/ChapterOutcomes";
import ChapterClose from "./chapters/ChapterClose";
import { scrollState, devTimelines, CHAPTER_COUNT } from "./store";

const WorldCanvas = dynamic(() => import("./world/WorldCanvas"), { ssr: false });

/**
 * The SYNC immersive homepage: one persistent 3D world (fixed) behind a single
 * smooth-scrolled column of chapters that reveal in sequence, forming a
 * continuous camera-flight journey.
 */
export default function Experience() {
  // Dev-only inspector: compose a chapter (reveal DOM + scroll + 3D frame).
  const composeChapter = (i: number) => {
    const p = (i + 0.5) / CHAPTER_COUNT;
    scrollState.progress = p;
    devTimelines.forEach((tl, idx) => tl.progress(idx <= i ? 1 : 0));
    const secs = document.querySelectorAll("#smooth-content section");
    const el = secs[i] as HTMLElement | undefined;
    const sm = ScrollSmoother.get();
    if (el) {
      if (sm) sm.scrollTo(el.offsetTop, false);
      else window.scrollTo(0, el.offsetTop);
    }
    ScrollTrigger.update();
    try {
      (window as unknown as { __world?: { renderAt: (p: number) => void } }).__world?.renderAt(p);
    } catch {
      /* WebGL context may be lost in a backgrounded preview tab */
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    (window as unknown as Record<string, unknown>).__exp = { goto: composeChapter };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // `?to=N` composes chapter N before first paint so a hidden preview tab
  // (which only paints on navigation) can be screenshotted per chapter.
  useLayoutEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const to = new URLSearchParams(window.location.search).get("to");
    if (to != null) {
      const i = Number(to);
      requestAnimationFrame(() => composeChapter(i));
      composeChapter(i);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <WorldCanvas className={styles.canvas} />
      <Nav />
      <ScrollProgress />
      <SmoothScrollProvider>
        <ChapterIntro />
        <ChapterProblem />
        <ChapterConverge />
        <ChapterPulse />
        <ChapterOutcomes />
        <ChapterClose />
      </SmoothScrollProvider>
    </>
  );
}
