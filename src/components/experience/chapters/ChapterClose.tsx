"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import styles from "../experience.module.css";
import { useChapterReveal } from "../hooks/useChapterReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { close } from "../data";

export default function ChapterClose() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useChapterReveal(
    root,
    5,
    (tl, q) => {
      tl.from(q(`.${styles.kicker}`), { opacity: 0, y: 12, duration: 0.6 }, 0)
        .from(q(`.${styles.closeLine}`), { yPercent: 118, duration: 1, stagger: 0.14, ease: "power4.out" }, 0.1)
        .from(q(`.${styles.closeBody}`), { opacity: 0, y: 16, duration: 0.7 }, 0.7)
        .from(q(`.${styles.closeCtas}`), { opacity: 0, y: 18, duration: 0.7 }, 0.9)
        .from(q(`.${styles.partners}`), { opacity: 0, y: 14, duration: 0.6 }, 1.05)
        .from(q(`.${styles.footer}`), { opacity: 0, duration: 0.7 }, 1.2);
    },
    reduced
  );

  return (
    <section ref={root} className={`${styles.chapter} ${styles.chapterClose}`} aria-label="Get started">
      <div className={styles.chapterInner}>
        <span className={styles.kicker}>{close.kicker}</span>
        <h2 className={styles.closeTitle}>
          {close.titleLines.map((line) => (
            <span key={line} className={styles.titleMask}>
              <span className={styles.closeLine}>{line}</span>
            </span>
          ))}
        </h2>
        <p className={styles.closeBody}>{close.body}</p>

        <div className={styles.closeCtas}>
          <a className={styles.ctaPrimary} href="#">
            {close.ctas.primary}
            <ArrowRight size={17} strokeWidth={2} />
          </a>
          <a className={styles.ctaGhost} href="#">
            {close.ctas.secondary}
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>

        <div className={styles.partners}>
          <span className={styles.partnersLabel}>Powered in partnership with</span>
          {close.partners.map((p) => (
            <span key={p} className={styles.partnerName}>
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.footer}>{close.footer}</div>
    </section>
  );
}
