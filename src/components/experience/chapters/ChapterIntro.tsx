"use client";

import { useRef } from "react";
import styles from "../experience.module.css";
import Reticle from "../ui/Reticle";
import { useChapterReveal } from "../hooks/useChapterReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { intro } from "../data";

export default function ChapterIntro() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useChapterReveal(
    root,
    0,
    (tl, q) => {
      tl.from(q(`.${styles.eyebrow}`), { opacity: 0, y: 14, duration: 0.7 }, 0)
        .from(q(".reticleBackdrop"), { opacity: 0, scale: 0.7, duration: 1.1, ease: "power3.out" }, 0)
        .from(q(`.${styles.titleWord}`), { yPercent: 120, duration: 1, stagger: 0.12, ease: "power4.out" }, 0.3)
        .from(q(`.${styles.star}`), { opacity: 0, duration: 0.5 }, 1.1)
        .from(q(`.${styles.heroSub}`), { opacity: 0, y: 16, duration: 0.7 }, 0.9)
        .from(q(`.${styles.footnote}`), { opacity: 0, duration: 0.7 }, 1.1)
        .from(q(`.${styles.scrollCue}`), { opacity: 0, duration: 0.6 }, 1.2);
    },
    reduced
  );

  return (
    <section ref={root} className={`${styles.chapter} ${styles.chapterIntro}`} aria-label="Introduction">
      <Reticle className={`${styles.reticleBackdrop} reticleBackdrop`} />

      <div className={styles.introInner}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          {intro.eyebrow}
        </span>

        <h1 className={styles.heroTitle}>
          <span className={styles.titleMask}>
            <span className={styles.titleWord}>{intro.titleLead.split(" ")[0]}</span>
          </span>{" "}
          <span className={styles.titleMask}>
            <span className={styles.titleWord}>{intro.titleLead.split(" ")[1]}</span>
          </span>
          <br />
          <span className={styles.titleMask}>
            <span className={`${styles.titleWord} ${styles.titleAccent}`}>{intro.titleAccent}</span>
          </span>
          <span className={styles.star}>{intro.star}</span>
        </h1>

        <p className={styles.heroSub}>{intro.sub}</p>
      </div>

      <div className={styles.footnote}>
        <div className={styles.footnoteRule} />
        <div className={styles.footnoteText}>
          {intro.footnote.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      </div>

      <div className={styles.scrollCue}>
        <span className={styles.scrollBar}>
          <span className={styles.scrollBarFill} />
        </span>
        Scroll to explore
      </div>
    </section>
  );
}
