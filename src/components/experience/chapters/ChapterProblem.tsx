"use client";

import { useRef } from "react";
import styles from "../experience.module.css";
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
      tl.from(q(`.${styles.kicker}`), { opacity: 0, y: 12, duration: 0.6 }, 0)
        .from(q(`.${styles.statementWord}`), { opacity: 0, y: 24, duration: 0.7, stagger: 0.05 }, 0.1)
        .from(q(`.${styles.statementBody}`), { opacity: 0, y: 16, duration: 0.7 }, 0.5)
        .from(q(`.${styles.point}`), { opacity: 0, y: 30, duration: 0.7, stagger: 0.14 }, 0.6);
    },
    reduced
  );

  return (
    <section ref={root} className={`${styles.chapter} ${styles.chapterProblem}`} aria-label="The problem">
      <div className={styles.chapterInner}>
        <span className={styles.kicker}>{problem.kicker}</span>
        <h2 className={styles.statement}>
          {problem.title}
        </h2>
        <p className={styles.statementBody}>{problem.body}</p>

        <div className={styles.points}>
          {problem.points.map((p, i) => (
            <div key={p.id} className={styles.point}>
              <span className={styles.pointNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.pointTitle}>{p.title}</h3>
              <p className={styles.pointBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
