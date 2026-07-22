"use client";

import { forwardRef } from "react";
import styles from "./SyncPulse.module.css";
import PhoneDashboard from "./PhoneDashboard";

/**
 * The Sync Pulse phone used as the hero object in the final screen.
 * Reuses the crisp CSS phone frame + live dashboard; the ref points at the
 * frame so the orchestrator can add an idle float.
 */
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
