// All copy + metrics sourced from syncmedia.io. Kept in one place so the
// section stays data-driven.

// ---- Intro / cinematic narrative (oryzo-style beats, Sync content) ----

export const intro = {
  // Phase A — brand-blue artboard, measurement reticle calibrating
  kicker: "SYNC · CALIBRATION",
  caption: "Single-source cross-media intelligence",
  sub: "Locking every screen into one measured view.",
  hud: ["REACH", "FREQ", "DEDUP", "LIFT"],
  coords: "34.2M · 9 SCREENS · 94% MATCH",
};

export const hero = {
  nav: {
    brand: "SYNC",
    links: ["INTRO", "PLATFORM", "PULSE", "CONTACT"],
  },
  // Phase C — the culminating "Powered by AI" screen
  titleLead: "Powered by",
  titleAccent: "AI",
  star: "*",
  model: "SYNC · PULSE",
  tagline: ["Media is now cross-screen.", "Measurement should be too."],
  footnote: ["* WORLDPANEL", "BY NUMERATOR"],
};

export const pulseEyebrow = "SYNC PULSE · MOBILE";

export const pulseHeadline = {
  lead: "Sync",
  accent: "Pulse",
};

export const pulseDescription =
  "Your cross-media intelligence — in your pocket. Track reach, frequency, and outcome lift in real time, across every screen. Built for operators who decide on the move.";

export type PulseFeature = {
  icon: "reach" | "lift" | "alert";
  title: string;
  body: string;
};

export const pulseFeatures: PulseFeature[] = [
  {
    icon: "reach",
    title: "Live cross-screen reach & dedup",
    body: "One audience view, de-duplicated across TV, CTV, YouTube & digital.",
  },
  {
    icon: "lift",
    title: "Outcome-tied lift, refreshed hourly",
    body: "Search, commerce & app response connected to exposure in near-real-time.",
  },
  {
    icon: "alert",
    title: "Push alerts on frequency waste",
    body: "Catch overlap and over-delivery before it eats the plan.",
  },
];

export const pulseCtas = {
  primary: "Get on Google Play",
  secondary: "See it live",
};

export const pulsePartner = {
  label: "POWERED IN PARTNERSHIP WITH",
  name: "Worldpanel",
  sub: "by Numerator",
};

export type PulseStat = {
  value: string;
  label: string;
};

export const pulseStats: PulseStat[] = [
  { value: "TV · CTV", label: "YouTube & Digital — one view" },
  { value: "< 60s", label: "Data refresh latency" },
  { value: "Android & CTV", label: "Available now" },
];

// ---- Phone dashboard content ----

export const dashboard = {
  status: "Live · Updated just now",
  avatar: "RM",
  impact: {
    tag: "24h",
    value: "+20.3%",
    label: "Incremental reach",
  },
  metrics: [
    { key: "DEDUP", value: "93%", delta: "2% vs yest.", tone: "down" as const },
    { key: "LIFT", value: "3.3x", delta: "0.4x", tone: "up" as const },
    { key: "FREQUENCY", value: "2.0 avg", delta: "healthy", tone: "flat" as const },
    { key: "WASTAGE", value: "11%", delta: "flag", tone: "warn" as const },
  ],
  trend: {
    label: "Reach Trend",
    sub: "Last 24h · cross-screen",
    badge: "+26%",
    // normalised 0..1 points for the area sparkline
    points: [0.22, 0.3, 0.26, 0.42, 0.38, 0.55, 0.5, 0.68, 0.62, 0.8, 0.74, 0.95],
  },
  alert: {
    title: "Frequency spike on Connected TV",
    sub: "15% budget overlap · last 6h",
    cta: "Optimize",
  },
  channelMix: [
    { name: "TV", value: 39 },
    { name: "OTT", value: 27 },
    { name: "YouTube", value: 16 },
    { name: "Meta", value: 11 },
    { name: "Digital", value: 7 },
  ],
  footer: "SYNCED WITH WORLDPANEL BY NUMERATOR",
};

export const floatingCards = {
  alert: {
    kind: "Push alert",
    body: "CTV overlap detected",
    time: "now",
  },
  lift: {
    kind: "Outcome lift",
    body: "+20.3% · 24h",
    time: "now",
  },
};
