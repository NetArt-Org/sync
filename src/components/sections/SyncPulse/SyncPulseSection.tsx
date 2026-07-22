"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Eye,
  BarChart3,
  Bell,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import styles from "./SyncPulse.module.css";
import PhoneDashboard from "./PhoneDashboard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  pulseEyebrow,
  pulseHeadline,
  pulseDescription,
  pulseFeatures,
  pulseCtas,
  pulsePartner,
  pulseStats,
  floatingCards,
} from "./data";

const PulseAtmosphere = dynamic(() => import("./PulseAtmosphere"), { ssr: false });

gsap.registerPlugin(ScrollTrigger, useGSAP);

const featureIcons = {
  reach: Eye,
  lift: BarChart3,
  alert: Bell,
} as const;

// Split a string into span-wrapped words for staggered reveals.
function Words({ text, className }: { text: string; className: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className={className}>
          {w}
          {" "}
        </span>
      ))}
    </>
  );
}

export default function SyncPulseSection() {
  const root = useRef<HTMLElement>(null);
  const phoneWrap = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const boot = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      if (reduced) {
        // Static, fully-revealed state for reduced-motion users.
        gsap.set(
          q(
            `.${styles.headlineWord}, .${styles.descWord}, .${styles.feature}, .${styles.ctaRow}, .${styles.partner}, .${styles.stat}, .${styles.floater}, .${styles.dashItem}`
          ),
          { clearProps: "all", opacity: 1, y: 0, x: 0 }
        );
        gsap.set(boot.current, { autoAlpha: 0 });
        gsap.set(phoneWrap.current, { rotateY: -8, rotateX: 4 });
        return;
      }

      // ---- Initial states ----
      gsap.set(phoneWrap.current, {
        rotateY: -26,
        rotateX: 12,
        y: 70,
        z: -140,
        opacity: 0,
        transformPerspective: 1600,
      });
      gsap.set(boot.current, { autoAlpha: 1 });
      gsap.set(q(`.${styles.dashItem}`), { opacity: 0, y: 16 });
      gsap.set(q(`.${styles.headlineWord}`), { yPercent: 118 });
      gsap.set(q(`.${styles.descWord}`), { opacity: 0, y: 14 });
      gsap.set(q(`.${styles.feature}`), { opacity: 0, x: -26 });
      gsap.set([q(`.${styles.ctaRow}`), q(`.${styles.partner}`)], { opacity: 0, y: 20 });
      gsap.set(q(`.${styles.stat}`), { opacity: 0, y: 26 });
      gsap.set(q(`.${styles.floater}`), { opacity: 0, scale: 0.82, y: 12 });

      // ---- Storyline timeline ----
      // This is the top-of-page hero, so it is always in view on load.
      // Play on mount (a ScrollTrigger "enter" is unreliable for elements that
      // already sit past the start point) with a small delay so layout settles.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.25,
      });

      // 1) Phone rises out of depth, twisting toward the viewer
      tl.to(phoneWrap.current, {
        rotateY: -8,
        rotateX: 4,
        y: 0,
        z: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      });

      // 2) Brand boot screen holds, then lifts to reveal the dashboard
      tl.to(
        boot.current,
        { autoAlpha: 0, scale: 1.06, duration: 0.7, ease: "power2.inOut" },
        "-=0.55"
      );

      // 3) Dashboard content streams in
      tl.to(
        q(`.${styles.dashItem}`),
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        "-=0.35"
      );

      // 4) Headline words mask up
      tl.to(
        q(`.${styles.headlineWord}`),
        { yPercent: 0, duration: 0.9, stagger: 0.12, ease: "power4.out" },
        0.15
      );

      // 5) Description reveals word-by-word
      tl.to(
        q(`.${styles.descWord}`),
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.014 },
        "-=0.4"
      );

      // 6) Feature rows slide in
      tl.to(
        q(`.${styles.feature}`),
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.12 },
        "-=0.3"
      );

      // 7) CTAs + partnership band
      tl.to(
        [q(`.${styles.ctaRow}`), q(`.${styles.partner}`)],
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.3"
      );

      // 8) Floating notification cards pop
      tl.to(
        q(`.${styles.floater}`),
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.14, ease: "back.out(1.6)" },
        "-=0.5"
      );

      // 9) Stat cards
      tl.to(
        q(`.${styles.stat}`),
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.5"
      );

      // ---- Scroll-scrubbed twist: phone settles to face-on as it centres ----
      gsap.to(phoneWrap.current, {
        rotateY: -3,
        rotateX: 1.5,
        y: -26,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          end: "bottom top",
          scrub: 1,
        },
      });

      // ---- Idle float + counter-parallax on floaters ----
      gsap.to(phone.current, {
        y: "+=14",
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      q(`.${styles.floater}`).forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? "+=12" : "-=12",
          duration: 3 + i * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // ---- Pointer parallax on the phone stage ----
      const stage = root.current?.querySelector(`.${styles.stage}`) as HTMLElement | null;
      const onMove = (e: PointerEvent) => {
        if (!stage || !phoneWrap.current) return;
        const r = stage.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        gsap.to(phoneWrap.current, {
          rotateY: -8 + dx * 10,
          rotateX: 4 - dy * 8,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      stage?.addEventListener("pointermove", onMove);
      return () => stage?.removeEventListener("pointermove", onMove);
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section ref={root} className={styles.section} aria-label="Sync Pulse mobile app">
      <PulseAtmosphere className={styles.canvasLayer} />

      <div className={styles.inner}>
        {/* ---------- Left: story copy ---------- */}
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {pulseEyebrow}
          </span>

          <h2 className={styles.headline}>
            <span className={styles.headlineLine}>
              <span className={styles.headlineWord}>{pulseHeadline.lead}</span>{" "}
              <span className={`${styles.headlineWord} ${styles.accent}`}>
                {pulseHeadline.accent}
              </span>
            </span>
          </h2>

          <p className={styles.desc}>
            <Words text={pulseDescription} className={styles.descWord} />
          </p>

          <div className={styles.features}>
            {pulseFeatures.map((f) => {
              const Icon = featureIcons[f.icon];
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

          <div className={styles.ctaRow}>
            <a className={styles.ctaPrimary} href="#" role="button">
              {pulseCtas.primary}
              <ArrowRight size={17} strokeWidth={2} />
            </a>
            <a className={styles.ctaSecondary} href="#">
              {pulseCtas.secondary}
              <ArrowRight size={16} strokeWidth={2} />
            </a>
          </div>

          <div className={styles.partner}>
            <span className={styles.partnerLabel}>{pulsePartner.label}</span>
            <span className={styles.partnerName}>
              <span className={styles.partnerMark}>W</span>
              <span className={styles.partnerBrand}>{pulsePartner.name}</span>
              <span className={styles.partnerSub}>{pulsePartner.sub}</span>
            </span>
          </div>

          <div className={styles.stats}>
            {pulseStats.map((s) => (
              <div key={s.value} className={styles.stat}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Right: phone stage ---------- */}
        <div className={styles.stage}>
          <span className={`${styles.arrow} ${styles.arrowLeft}`} aria-hidden>
            <ChevronLeft size={20} />
          </span>
          <span className={`${styles.arrow} ${styles.arrowRight}`} aria-hidden>
            <ChevronRight size={20} />
          </span>

          <div className={styles.phoneWrap} ref={phoneWrap}>
            <div className={styles.glow} aria-hidden />

            <div className={styles.phone} ref={phone}>
              <span className={styles.notch} aria-hidden />
              <div className={styles.screen}>
                {/* Brand boot / starting screen */}
                <div className={styles.boot} ref={boot} aria-hidden>
                  <div className={styles.bootInner}>
                    <div className={styles.bootMark}>
                      <span className={styles.bootRing} />
                      <span className={styles.bootRing2} />
                      <span className={styles.bootCore} />
                    </div>
                    <span className={styles.bootWord}>Sync Pulse</span>
                  </div>
                </div>

                <PhoneDashboard />
              </div>
            </div>

            {/* Floating notification cards */}
            <div className={`${styles.floater} ${styles.floaterLift}`}>
              <span className={`${styles.floaterIcon} ${styles.floaterIconLift}`}>
                <Zap size={16} />
              </span>
              <div>
                <div className={styles.floaterKind}>{floatingCards.lift.kind}</div>
                <div className={styles.floaterBody}>{floatingCards.lift.body}</div>
              </div>
              <span className={styles.floaterTime}>{floatingCards.lift.time}</span>
            </div>

            <div className={`${styles.floater} ${styles.floaterAlert}`}>
              <span className={`${styles.floaterIcon} ${styles.floaterIconAlert}`}>
                <Bell size={16} />
              </span>
              <div>
                <div className={styles.floaterKind}>{floatingCards.alert.kind}</div>
                <div className={styles.floaterBody}>{floatingCards.alert.body}</div>
              </div>
              <span className={styles.floaterTime}>{floatingCards.alert.time}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
