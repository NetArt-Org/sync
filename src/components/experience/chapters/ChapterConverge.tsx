"use client";

import { useRef } from "react";
import styles from "../experience.module.css";
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
      tl.from(q(`.${styles.kicker}`), { opacity: 0, y: 12, duration: 0.6 }, 0)
        .from(q(`.${styles.convergeTitle}`), { opacity: 0, y: 26, duration: 0.9 }, 0.1)
        .from(q(`.${styles.convergeBody}`), { opacity: 0, y: 16, duration: 0.7 }, 0.4)
        .from(q(`.${styles.pillar}`), { opacity: 0, y: 30, duration: 0.7, stagger: 0.13 }, 0.5)
        .from(q(`.${styles.stat}`), { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 }, 0.9);
    },
    reduced
  );

  return (
    <section ref={root} className={`${styles.chapter} ${styles.chapterConverge}`} aria-label="One source of truth">
      <div className={styles.chapterInner}>
        <span className={styles.kicker}>{converge.kicker}</span>
        <h2 className={styles.convergeTitle}>{converge.title}</h2>
        <p className={styles.convergeBody}>{converge.body}</p>

        <div className={styles.pillars}>
          {converge.pillars.map((p) => (
            <div key={p.id} className={styles.pillar}>
              <span className={styles.pillarBar} />
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarBody}>{p.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.statRow}>
          {converge.stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
