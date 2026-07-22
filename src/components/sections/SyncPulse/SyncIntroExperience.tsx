"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./SyncIntro.module.css";
import CalibrationReticle from "./CalibrationReticle";
import HeroPhone from "./HeroPhone";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { intro, hero } from "./data";

const HeroAtmosphere = dynamic(() => import("./HeroAtmosphere"), { ssr: false });

gsap.registerPlugin(ScrollTrigger, useGSAP);

function MaskWords({
  text,
  maskClass,
  wordClass,
}: {
  text: string;
  maskClass: string;
  wordClass: string;
}) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className={maskClass}>
          <span className={wordClass}>{w}</span>{" "}
        </span>
      ))}
    </>
  );
}

export default function SyncIntroExperience() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const phoneWrap = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const sel = <T extends Element>(s: string) => q(s) as unknown as T[];

      const finalHero = () => {
        gsap.set(sel(`.${styles.bgDark}`), { opacity: 1 });
        gsap.set(sel(`.${styles.vignette}`), { opacity: 1 });
        gsap.set(sel(`.${styles.heroCanvas}`), { opacity: 1 });
        gsap.set(phoneWrap.current, { opacity: 1, y: 54, z: 0, rotateY: -8, rotateX: 5, scale: 0.86 });
        gsap.set(
          sel(
            `.${styles.nav}, .${styles.titleWord}, .${styles.star}, .${styles.model}, .${styles.taglineText}, .${styles.footnote}`
          ),
          { opacity: 1, y: 0, yPercent: 0 }
        );
      };

      if (reduced) {
        root.current?.classList.add(styles.staticFallback);
        finalHero();
        return;
      }

      // ---------- Initial states ----------
      gsap.set(sel(`.${styles.bgDark}`), { opacity: 0 });
      gsap.set(sel(`.${styles.vignette}`), { opacity: 0 });
      gsap.set(sel(`.${styles.heroCanvas}`), { opacity: 0 });
      gsap.set(sel(".r-node"), { scale: 0, transformOrigin: "center", opacity: 0 });
      gsap.set(sel(".r-bracket, .r-ticks"), { opacity: 0 });
      gsap.set(sel(".reticleInner"), { scale: 0.25, rotate: -35, opacity: 0, transformOrigin: "center" });
      gsap.set(sel(`.${styles.kicker}`), { opacity: 0, y: 10 });
      gsap.set(sel(`.${styles.captionWord}`), { yPercent: 118 });
      gsap.set([sel(`.${styles.introSub}`), sel(`.${styles.coords}`)], { opacity: 0, y: 12 });
      gsap.set(phoneWrap.current, {
        opacity: 0,
        y: 130,
        z: -280,
        rotateY: -30,
        rotateX: 14,
        scale: 0.9,
        transformPerspective: 1700,
      });
      gsap.set(sel(`.${styles.nav}`), { opacity: 0, y: -16 });
      gsap.set(sel(`.${styles.titleWord}`), { yPercent: 120 });
      gsap.set(sel(`.${styles.star}`), { opacity: 0 });
      gsap.set(sel(`.${styles.model}`), { opacity: 0, y: 14 });
      gsap.set(sel(`.${styles.taglineText}`), { yPercent: 120 });
      gsap.set(sel(`.${styles.footnote}`), { opacity: 0 });
      gsap.set(sel(`.${styles.scrollCue}`), { opacity: 0 });

      // Independent life: reticle scan sweep
      const scan = gsap.to(sel(".r-scan"), {
        rotation: 360,
        svgOrigin: "200 200",
        repeat: -1,
        ease: "none",
        duration: 2.8,
      });

      // ---------- Load intro (auto-plays the calibration reveal) ----------
      // Keeps the landing frame populated; the scrub only drives zoom + hero.
      const introTl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });
      introTl
        .to(sel(".reticleInner"), { scale: 0.92, rotate: 0, opacity: 1, duration: 1.3 }, 0)
        .to(sel(".r-bracket, .r-ticks"), { opacity: 1, duration: 0.9 }, 0.4)
        .to(sel(".r-node"), { scale: 1, opacity: 1, duration: 0.7, stagger: 0.06, ease: "back.out(2)" }, 0.55)
        .to(sel(`.${styles.kicker}`), { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .to(sel(`.${styles.captionWord}`), { yPercent: 0, duration: 1, stagger: 0.11, ease: "power4.out" }, 0.8)
        .to(sel(`.${styles.introSub}`), { opacity: 1, y: 0, duration: 0.7 }, 1.5)
        .to(sel(`.${styles.coords}`), { opacity: 1, y: 0, duration: 0.7 }, 1.7)
        .to(sel(`.${styles.scrollCue}`), { opacity: 1, duration: 0.6 }, 1.2);

      // ---------- Master scrubbed timeline (zoom-through + hero) ----------
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Phase B — converge + zoom-through (0.4 → 1.9)
      tl.to(sel(".reticleInner"), { scale: 7.5, opacity: 0, rotate: 22, duration: 1.5, ease: "power2.in" }, 0.4);
      tl.to(
        [sel(`.${styles.kicker}`), sel(`.${styles.captionWord}`), sel(`.${styles.introSub}`), sel(`.${styles.coords}`)],
        { opacity: 0, duration: 0.7, ease: "power1.in" },
        0.4
      );
      tl.to(sel(`.${styles.caption}`), { scale: 1.25, duration: 1.1, ease: "power2.in" }, 0.4);
      tl.to(sel(`.${styles.scrollCue}`), { opacity: 0, duration: 0.4 }, 0.4);
      tl.to(sel(`.${styles.bgBlue}`), { opacity: 0, duration: 1.1 }, 0.8);
      tl.to(sel(`.${styles.bgDark}`), { opacity: 1, duration: 1.1 }, 0.8);
      tl.to(sel(`.${styles.vignette}`), { opacity: 1, duration: 1.1 }, 1.0);
      tl.to(sel(`.${styles.heroCanvas}`), { opacity: 1, duration: 1.3 }, 1.3);

      // Phase C — hero resolve (1.7 → 5.4)
      tl.to(
        phoneWrap.current,
        { opacity: 1, y: 54, z: 0, rotateY: -8, rotateX: 5, scale: 0.86, duration: 1.9, ease: "power3.out" },
        1.7
      );
      tl.to(sel(`.${styles.nav}`), { opacity: 1, y: 0, duration: 0.8 }, 2.3);
      tl.to(sel(`.${styles.titleWord}`), { yPercent: 0, duration: 1.1, stagger: 0.14, ease: "power4.out" }, 2.4);
      tl.to(sel(`.${styles.star}`), { opacity: 1, duration: 0.5 }, 3.5);
      tl.to(sel(`.${styles.model}`), { opacity: 1, y: 0, duration: 0.7 }, 3.4);
      tl.to(sel(`.${styles.taglineText}`), { yPercent: 0, duration: 1, stagger: 0.12, ease: "power4.out" }, 3.1);
      tl.to(sel(`.${styles.footnote}`), { opacity: 1, duration: 0.7 }, 3.7);

      // Ongoing scroll parallax on the phone after it resolves
      tl.to(phoneWrap.current, { rotateY: -4, y: 30, duration: 2.2, ease: "none" }, 4.0);

      // Idle float on the inner phone (independent of scroll)
      const float = gsap.to(phone.current, {
        y: "+=14",
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      if (process.env.NODE_ENV !== "production") {
        (window as unknown as Record<string, unknown>).__introTL = introTl;
        (window as unknown as Record<string, unknown>).__scrubTL = tl;
      }

      return () => {
        scan.kill();
        float.kill();
        introTl.kill();
      };
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <div ref={root} className={styles.wrap}>
      <div className={styles.track}>
        <div className={styles.stage} ref={stage}>
          {/* Backgrounds */}
          <div className={`${styles.layer} ${styles.bgBlue}`} />
          <div className={`${styles.layer} ${styles.bgDark}`} />

          {/* Three.js hero atmosphere */}
          <HeroAtmosphere className={`${styles.layer} ${styles.heroCanvas}`} />

          {/* Calibration reticle */}
          <div className={`${styles.layer} ${styles.reticleLayer}`}>
            <CalibrationReticle className={`${styles.reticle} reticleInner`} />
          </div>

          {/* Intro caption — kicker up top, details along the bottom */}
          <div className={`${styles.layer} ${styles.introText}`}>
            <span className={styles.kicker}>{intro.kicker}</span>
            <div className={styles.introBottom}>
              <div className={styles.caption}>
                <MaskWords text={intro.caption} maskClass={styles.captionMask} wordClass={styles.captionWord} />
              </div>
              <div className={styles.introSub}>{intro.sub}</div>
              <div className={styles.coords}>{intro.coords}</div>
            </div>
          </div>

          {/* Vignette */}
          <div className={`${styles.layer} ${styles.vignette}`} />

          {/* Hero phone */}
          <div className={`${styles.layer} ${styles.phoneLayer}`}>
            <div className={styles.phoneWrap} ref={phoneWrap}>
              <div className={styles.phoneGlow} aria-hidden />
              <HeroPhone ref={phone} />
            </div>
          </div>

          {/* Hero UI */}
          <div className={`${styles.layer} ${styles.heroUI}`}>
            <nav className={styles.nav}>
              <span className={styles.navBrand}>{hero.nav.brand}</span>
              <div className={styles.navLinks}>
                {hero.nav.links.map((l, i) => (
                  <a key={l} href="#" className={`${styles.navLink} ${i === 0 ? styles.navLinkActive : ""}`}>
                    {l}
                  </a>
                ))}
              </div>
            </nav>

            <div className={styles.titleBlock}>
              <h1 className={styles.title}>
                <span className={styles.titleWordMask}>
                  <span className={styles.titleWord}>{hero.titleLead.split(" ")[0]}</span>
                </span>{" "}
                <span className={styles.titleWordMask}>
                  <span className={styles.titleWord}>{hero.titleLead.split(" ")[1]}</span>
                </span>{" "}
                <span className={styles.titleWordMask}>
                  <span className={`${styles.titleWord} ${styles.titleAI}`}>{hero.titleAccent}</span>
                </span>
                <span className={styles.star}>{hero.star}</span>
              </h1>
              <span className={styles.model}>{hero.model}</span>
            </div>

            <div className={styles.tagline}>
              {hero.tagline.map((line) => (
                <div key={line} className={styles.taglineLine}>
                  <span className={styles.taglineText}>{line}</span>
                </div>
              ))}
            </div>

            <div className={styles.footnote}>
              <div className={styles.footnoteRule} />
              <div className={styles.footnoteText}>
                {hero.footnote.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>
            </div>

            <div className={styles.scrollCue}>
              <span className={styles.scrollBar}>
                <span className={styles.scrollBarFill} />
              </span>
              Scroll
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
