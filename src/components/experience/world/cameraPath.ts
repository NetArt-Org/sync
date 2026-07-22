// Camera-flight keyframes. One node per chapter boundary (7 nodes / 6 chapters).
// The camera dollies forward through −Z, panning/tilting through each zone.
// Everything about the flight is tunable here.

export type CamNode = {
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
};

export const CAM_NODES: CamNode[] = [
  // 0.0 — Intro: facing the SYNC core / reticle at origin
  { pos: [0, 0, 14], look: [0, 0, 0], fov: 42 },
  // 1/6 — pushing through into the dark
  { pos: [0, 0.4, 6], look: [0, 0, -8], fov: 46 },
  // 2/6 — Problem: flying among scattered monoliths
  { pos: [2.4, 1.1, -9], look: [-1.2, 0.2, -20], fov: 54 },
  // 3/6 — Converge: monoliths aligning into one lattice ahead
  { pos: [-1.6, 0.6, -27], look: [0.4, 0.1, -42], fov: 46 },
  // 4/6 — Sync Pulse: framing the phone (anchored near z = −58)
  { pos: [0, 0.1, -46], look: [0, 0, -58], fov: 38 },
  // 5/6 — Outcomes: sweeping past radiating outcome pillars
  { pos: [1.8, 0.9, -66], look: [-0.6, 0.2, -82], fov: 52 },
  // 1.0 — Close: pulling back to a wide, calm vista
  { pos: [0, 2.6, -80], look: [0, 0.4, -94], fov: 44 },
];

function smootherstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type CamSample = {
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
};

/** Sample the camera flight at a global 0..1 progress. */
export function sampleCamera(progress: number): CamSample {
  const segCount = CAM_NODES.length - 1;
  const scaled = Math.max(0, Math.min(1, progress)) * segCount;
  const i = Math.min(segCount - 1, Math.floor(scaled));
  const t = smootherstep(scaled - i);
  const a = CAM_NODES[i];
  const b = CAM_NODES[i + 1];
  return {
    pos: [lerp(a.pos[0], b.pos[0], t), lerp(a.pos[1], b.pos[1], t), lerp(a.pos[2], b.pos[2], t)],
    look: [
      lerp(a.look[0], b.look[0], t),
      lerp(a.look[1], b.look[1], t),
      lerp(a.look[2], b.look[2], t),
    ],
    fov: lerp(a.fov, b.fov, t),
  };
}
