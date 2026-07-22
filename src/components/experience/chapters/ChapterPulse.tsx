"use client";

import { useRef } from "react";
import { Eye, BarChart3, Bell, ArrowRight } from "lucide-react";
import styles from "../experience.module.css";
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
      tl.from(q(`.${styles.kicker}`), { opacity: 0, y: 12, duration: 0.6 }, 0)
        .from(q(`.${styles.pulseTitleWord}`), { yPercent: 120, duration: 0.9, stagger: 0.1, ease: "power4.out" }, 0.1)
        .from(q(`.${styles.pulseDesc}`), { opacity: 0, y: 16, duration: 0.7 }, 0.5)
        .from(q(`.${styles.feature}`), { opacity: 0, x: -24, duration: 0.6, stagger: 0.12 }, 0.6)
        .from(q(`.${styles.pulseCtas}`), { opacity: 0, y: 16, duration: 0.6 }, 0.9)
        .from(q(`.${styles.phoneFrame}`), { opacity: 0, y: 60, rotateY: -18, scale: 0.9, duration: 1.2, ease: "power3.out" }, 0.2)
        .from(q(`.${styles.floatCard}`), { opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.15, ease: "back.out(1.6)" }, 0.9);
    },
    reduced
  );

  return (
    <section ref={root} className={`${styles.chapter} ${styles.chapterPulse}`} aria-label="Sync Pulse app">
      <div className={styles.pulseLayout}>
        <div className={styles.pulseCopy}>
          <span className={styles.kicker}>{pulse.kicker}</span>
          <h2 className={styles.pulseTitle}>
            <span className={styles.titleMask}>
              <span className={styles.pulseTitleWord}>{pulse.titleLead}</span>
            </span>{" "}
            <span className={styles.titleMask}>
              <span className={`${styles.pulseTitleWord} ${styles.titleAccent}`}>{pulse.titleAccent}</span>
            </span>
          </h2>
          <p className={styles.pulseDesc}>{pulse.desc}</p>

          <div className={styles.features}>
            {pulse.features.map((f) => {
              const Icon = ICONS[f.icon];
              return (
                <div key={f.title} className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <p className={styles.featureBody}>{f.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.pulseCtas}>
            <a className={styles.ctaPrimary} href="#">
              {pulse.ctas.primary}
              <ArrowRight size={17} strokeWidth={2} />
            </a>
            <a className={styles.ctaGhost} href="#">
              {pulse.ctas.secondary}
              <ArrowRight size={16} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className={styles.pulseStage}>
          <div className={styles.phoneGlow} aria-hidden />
          <div className={styles.phoneFrame}>
            <HeroPhone />
          </div>
          <div className={`${styles.floatCard} ${styles.floatCardLift}`}>
            <span className={styles.floatIconLift}>▲</span>
            <div>
              <div className={styles.floatKind}>Outcome lift</div>
              <div className={styles.floatBody}>+20.3% · 24h</div>
            </div>
          </div>
          <div className={`${styles.floatCard} ${styles.floatCardAlert}`}>
            <span className={styles.floatIconAlert}>!</span>
            <div>
              <div className={styles.floatKind}>Push alert</div>
              <div className={styles.floatBody}>CTV overlap detected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
