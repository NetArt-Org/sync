"use client";

import { forwardRef } from "react";
import { Activity, AlertTriangle } from "lucide-react";
import styles from "./SyncPulse.module.css";
import { dashboard } from "./data";

function sparkPaths(points: number[], w: number, h: number) {
  const pad = 3;
  const step = (w - pad * 2) / (points.length - 1);
  const y = (v: number) => h - pad - v * (h - pad * 2);
  const line = points
    .map((v, i) => `${i === 0 ? "M" : "L"}${(pad + i * step).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${(pad + (points.length - 1) * step).toFixed(1)},${h - pad} L${pad},${h - pad} Z`;
  return { line, area };
}

/**
 * The dashboard shown on the phone screen. Rendered as crisp DOM (not a texture)
 * so every metric stays sharp while the phone twists in 3D.
 */
const PhoneDashboard = forwardRef<HTMLDivElement>(function PhoneDashboard(_, ref) {
  const { line, area } = sparkPaths(dashboard.trend.points, 260, 56);
  const d = dashboard;

  return (
    <div className={styles.dash} ref={ref}>
      <div className={`${styles.dashTop} ${styles.dashItem}`}>
        <span className={styles.live}>
          <span className={styles.liveDot} />
          {d.status}
        </span>
        <span className={styles.avatar}>{d.avatar}</span>
      </div>

      {/* Impact hero metric */}
      <div className={`${styles.card} ${styles.impact} ${styles.dashItem}`}>
        <div className={styles.rowBetween}>
          <span className={styles.cardKicker}>
            <Activity size={12} /> Impact
          </span>
          <span className={styles.tag}>{d.impact.tag}</span>
        </div>
        <div className={styles.impactValue}>{d.impact.value}</div>
        <div className={styles.impactLabel}>{d.impact.label}</div>
      </div>

      {/* 2x2 metric grid */}
      <div className={`${styles.grid2} ${styles.dashItem}`}>
        {d.metrics.map((m) => (
          <div key={m.key} className={`${styles.card} ${styles.metric}`}>
            <span className={styles.cardKicker}>{m.key}</span>
            <div className={styles.metricValue}>{m.value}</div>
            <div className={`${styles.metricDelta} ${styles[m.tone]}`}>{m.delta}</div>
          </div>
        ))}
      </div>

      {/* Reach trend sparkline */}
      <div className={`${styles.card} ${styles.trend} ${styles.dashItem}`}>
        <div className={styles.trendHead}>
          <div>
            <div className={styles.trendTitle}>{d.trend.label}</div>
            <div className={styles.trendSub}>{d.trend.sub}</div>
          </div>
          <span className={styles.trendBadge}>{d.trend.badge}</span>
        </div>
        <svg className={styles.spark} viewBox="0 0 260 56" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#sparkFill)" />
          <path
            d={line}
            fill="none"
            stroke="#7bb8ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Alert row */}
      <div className={`${styles.card} ${styles.alert} ${styles.dashItem}`}>
        <span className={styles.alertIcon}>
          <AlertTriangle size={15} />
        </span>
        <div>
          <div className={styles.alertTitle}>{d.alert.title}</div>
          <div className={styles.alertSub}>{d.alert.sub}</div>
        </div>
        <button className={styles.alertBtn} type="button">
          {d.alert.cta} →
        </button>
      </div>

      {/* Channel mix */}
      <div className={`${styles.card} ${styles.mix} ${styles.dashItem}`}>
        <div className={styles.mixHead}>Channel Mix</div>
        {d.channelMix.map((ch) => (
          <div key={ch.name} className={styles.mixRow}>
            <span className={styles.mixName}>{ch.name}</span>
            <span className={styles.mixTrack}>
              <span className={styles.mixFill} style={{ width: `${ch.value}%` }} />
            </span>
            <span className={styles.mixVal}>{ch.value}%</span>
          </div>
        ))}
      </div>

      <div className={`${styles.dashFooter} ${styles.dashItem}`}>{d.footer}</div>
    </div>
  );
});

export default PhoneDashboard;
