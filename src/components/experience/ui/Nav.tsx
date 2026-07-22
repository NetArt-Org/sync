"use client";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import styles from "../experience.module.css";
import { nav } from "../data";
import { useExperience, CHAPTER_COUNT } from "../store";

function scrollToChapter(i: number) {
  const y = (i / CHAPTER_COUNT) * (document.documentElement.scrollHeight - window.innerHeight);
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(y, true);
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/** Persistent top navigation (fixed, outside the smoothed content). */
export default function Nav() {
  const active = useExperience((s) => s.activeChapter);

  return (
    <nav className={styles.nav}>
      <button className={styles.navBrand} onClick={() => scrollToChapter(0)} type="button">
        {nav.brand}
        <span className={styles.navBrandDot} />
      </button>

      <div className={styles.navLinks}>
        {nav.links.map((l) => (
          <button
            key={l.label}
            type="button"
            className={`${styles.navLink} ${active === l.chapter ? styles.navLinkActive : ""}`}
            onClick={() => scrollToChapter(l.chapter)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <button className={styles.navCta} type="button" onClick={() => scrollToChapter(CHAPTER_COUNT - 1)}>
        {nav.cta}
      </button>
    </nav>
  );
}
