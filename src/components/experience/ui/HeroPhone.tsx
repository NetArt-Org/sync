"use client";

import { forwardRef } from "react";
import styles from "./phone.module.css";
import PhoneDashboard from "./PhoneDashboard";

/** Sync Pulse phone — the hero object framed by the camera in Chapter 4. */
const HeroPhone = forwardRef<HTMLDivElement>(function HeroPhone(_, ref) {
  return (
    <div className={styles.phone} ref={ref}>
      <span className={styles.notch} aria-hidden />
      <div className={styles.screen}>
        <PhoneDashboard />
      </div>
    </div>
  );
});

export default HeroPhone;
