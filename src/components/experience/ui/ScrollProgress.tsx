"use client";

import styles from "../experience.module.css";
import { useExperience, CHAPTERS } from "../store";

const LABELS = ["Intro", "Problem", "One View", "Sync Pulse", "Outcomes", "Close"];

/** Vertical chapter progress rail (fixed, right edge). */
export default function ScrollProgress() {
  const active = useExperience((s) => s.activeChapter);

  return (
    <div className={styles.rail} aria-hidden>
      {CHAPTERS.map((c, i) => (
        <div key={c} className={styles.railItem}>
          <span className={`${styles.railDot} ${i === active ? styles.railDotActive : ""}`} />
          <span className={`${styles.railLabel} ${i === active ? styles.railLabelActive : ""}`}>
            {LABELS[i]}
          </span>
        </div>
      ))}
    </div>
  );
}
