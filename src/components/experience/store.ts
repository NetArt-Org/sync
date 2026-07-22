"use client";

import { create } from "zustand";

export const CHAPTERS = [
  "intro",
  "problem",
  "converge",
  "pulse",
  "outcomes",
  "close",
] as const;

export type Chapter = (typeof CHAPTERS)[number];
export const CHAPTER_COUNT = CHAPTERS.length;

/**
 * Hot scroll value read every frame by the 3D world. Kept as a plain mutable
 * object (not React/zustand state) so the render loop never triggers React
 * re-renders. `progress` is the smoothed 0..1 journey position.
 */
export const scrollState = {
  progress: 0,
  velocity: 0,
};

type ExperienceStore = {
  activeChapter: number;
  reducedMotion: boolean;
  ready: boolean;
  setActiveChapter: (i: number) => void;
  setReducedMotion: (b: boolean) => void;
  setReady: (b: boolean) => void;
};

/** Reactive, low-frequency state (nav highlight, progress dots, gating). */
export const useExperience = create<ExperienceStore>((set) => ({
  activeChapter: 0,
  reducedMotion: false,
  ready: false,
  setActiveChapter: (i) =>
    set((s) => (s.activeChapter === i ? s : { activeChapter: i })),
  setReducedMotion: (b) => set({ reducedMotion: b }),
  setReady: (b) => set({ ready: b }),
}));

/** Map a global 0..1 progress to the active chapter index. */
export function chapterFromProgress(p: number): number {
  const i = Math.floor(p * CHAPTER_COUNT);
  return Math.max(0, Math.min(CHAPTER_COUNT - 1, i));
}

/** Local 0..1 progress within a chapter, given global progress. */
export function localProgress(p: number, chapter: number): number {
  const size = 1 / CHAPTER_COUNT;
  return Math.max(0, Math.min(1, (p - chapter * size) / size));
}
