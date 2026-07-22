"use client";

import { useRef } from "react";
import styles from "../experience.module.css";
import { useChapterReveal } from "../hooks/useChapterReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { outcomes } from "../data";

export default function ChapterOutcomes() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useChapterReveal(
    root,
    4,
    (tl, q) => {
      tl.from(q(`.${styles.kicker}`), { opacity: 0, y: 12, duration: 0.6 }, 0)
        .from(q(`.${styles.outcomesTitle}`), { opacity: 0, y: 26, duration: 0.9 }, 0.1)
        .from(q(`.${styles.outcomesBody}`), { opacity: 0, y: 16, duration: 0.7 }, 0.4)
        .from(q(`.${styles.metricTile}`), { opacity: 0, y: 34, duration: 0.7, stagger: 0.1, ease: "power3.out" }, 0.5)
        .from(q(`.${styles.channelChip}`), { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, 0.9);
    },
    reduced
  );

  return (
    <section ref={root} className={`${styles.chapter} ${styles.chapterOutcomes}`} aria-label="Outcomes">
      <div className={styles.chapterInner}>
        <span className={styles.kicker}>{outcomes.kicker}</span>
        <h2 className={styles.outcomesTitle}>{outcomes.title}</h2>
        <p className={styles.outcomesBody}>{outcomes.body}</p>

        <div className={styles.metricsGrid}>
          {outcomes.metrics.map((m) => (
            <div key={m.label} className={styles.metricTile}>
              <div className={styles.metricTileValue}>{m.value}</div>
              <div className={styles.metricTileDelta}>{m.delta}</div>
              <div className={styles.metricTileLabel}>{m.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.channels}>
          <span className={styles.channelsLabel}>Connected to</span>
          {outcomes.channels.map((c) => (
            <span key={c} className={styles.channelChip}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
