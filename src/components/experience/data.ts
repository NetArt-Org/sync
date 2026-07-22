// Single content source for the SYNC immersive homepage.
// All copy/metrics are SYNC's real messaging (syncmedia.io).

export const nav = {
  brand: "SYNC",
  links: [
    { label: "Overview", chapter: 0 },
    { label: "Platform", chapter: 2 },
    { label: "Sync Pulse", chapter: 3 },
    { label: "Outcomes", chapter: 4 },
  ],
  cta: "Book a Demo",
};

export const intro = {
  eyebrow: "Single-Source Cross-Media Intelligence",
  titleLead: "Partnered with",
  titleAccent: "Kantar",
  star: "*",
  footnote: ["* WORLDPANEL", "BY NUMERATOR"],
  sub: "Measure the same people across every screen — then connect exposure to outcomes.",
  hudCoords: "34.2M REACH · 9 SCREENS · 94% MATCH",
  reticleKicker: "SYNC · CALIBRATION",
};

export const problem = {
  kicker: "The Problem",
  title: "Most media measurement still lives in silos",
  body: "TV is measured one way. Digital is measured another. Outcomes live somewhere else entirely — inflating reach, hiding overlap, and blurring what actually changed behaviour.",
  points: [
    {
      id: "fragmented",
      title: "Fragmented audience view",
      body: "Platform reports show delivery in pieces, not the same people across screens.",
    },
    {
      id: "overlap",
      title: "Inflated reach, unclear overlap",
      body: "Without de-duplication, audience numbers overstate what a campaign truly delivered.",
    },
    {
      id: "proof",
      title: "Weak proof of impact",
      body: "Impressions alone do not show what drove search, commerce or app behaviour.",
    },
  ],
};

export const converge = {
  kicker: "Why SYNC",
  title: "One source of truth, from exposure to outcome",
  body: "SYNC unifies the same audience across screens, then connects that exposure history to downstream behaviour — clearer reach, smarter frequency, stronger proof.",
  pillars: [
    {
      id: "clarity",
      title: "Single-source clarity",
      body: "Measure the same people across linear TV, OTT, YouTube, Meta and digital — not stitched reports.",
    },
    {
      id: "outcome",
      title: "Outcome intelligence",
      body: "Connect exposure to search, commerce, app usage and the custom KPIs that matter to the business.",
    },
    {
      id: "action",
      title: "Action, not dashboards",
      body: "A decision layer for strategy, analytics and commercial teams. Ready to use, ready to defend.",
    },
  ],
  stats: [
    { value: "60+", label: "Brands measured" },
    { value: "9", label: "Screens unified" },
    { value: "24h", label: "To first insight" },
    { value: "94%", label: "Dedup accuracy" },
  ],
};

export const pulse = {
  kicker: "Sync Pulse · Mobile",
  titleLead: "Sync",
  titleAccent: "Pulse",
  desc: "Your cross-media intelligence — in your pocket. Track reach, frequency, and outcome lift in real time, across every screen.",
  features: [
    {
      icon: "reach" as const,
      title: "Live cross-screen reach & dedup",
      body: "One audience view, de-duplicated across TV, CTV, YouTube & digital.",
    },
    {
      icon: "lift" as const,
      title: "Outcome-tied lift, refreshed hourly",
      body: "Search, commerce & app response connected to exposure in near-real-time.",
    },
    {
      icon: "alert" as const,
      title: "Push alerts on frequency waste",
      body: "Catch overlap and over-delivery before it eats the plan.",
    },
  ],
  ctas: { primary: "Get on Google Play", secondary: "See it live" },
};

export const outcomes = {
  kicker: "Outcomes",
  title: "See what media exposure actually changes",
  body: "Most reporting stops at impressions. SYNC links ad exposure to the downstream signals that matter — search, commerce and app behaviour.",
  metrics: [
    { label: "Conversion Lift", value: "+24%", delta: "+3.2pp" },
    { label: "Ad Recall / Brand Lift", value: "+18%", delta: "+2.1pp" },
    { label: "Incremental Sales", value: "+31%", delta: "+4.8pp" },
    { label: "Performance Index", value: "+15%", delta: "+1.8pp" },
  ],
  channels: ["General search", "Marketplace demand", "Quick-commerce", "App usage"],
};

export const close = {
  kicker: "Our Philosophy",
  titleLines: ["Media is now cross-screen.", "Measurement should be too."],
  body: "Budgets are tighter, mixes are broader, and proof is expected. SYNC gives senior teams one honest view of audiences, overlap and outcomes — so every media decision stands on evidence.",
  ctas: { primary: "Book a Demo", secondary: "View Methodology" },
  partners: ["Kantar", "Worldpanel by Numerator"],
  footer: "SYNC — Single-source cross-media measurement for modern advertising",
};

// ---- Sync Pulse phone dashboard (Chapter 4) ----
export const dashboard = {
  status: "Live · Updated just now",
  avatar: "RM",
  impact: { tag: "24h", value: "+20.3%", label: "Incremental reach" },
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
  alert: { kind: "Push alert", body: "CTV overlap detected", time: "now" },
  lift: { kind: "Outcome lift", body: "+20.3% · 24h", time: "now" },
};
