// Camera choreography for the hero sculpture (a single object at the world
// origin). The camera performs one continuous cinematic move: it pushes in and
// orbits so different surfaces are revealed, travels close over the form at the
// climax, then eases back out — never cutting. One node per chapter boundary
// (7 nodes / 6 chapters). All framing is tunable here.

export type CamNode = {
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
};

export const CAM_NODES: CamNode[] = [
  // 0.0 — Intro: the sculpture framed, calm, at a cinematic distance
  { pos: [0, 0.3, 7.2], look: [0, 0, 0], fov: 40 },
  // 1/6 — beginning to drift in and around
  { pos: [1.4, 0.5, 5.8], look: [0, 0, 0], fov: 42 },
  // 2/6 — Problem: orbiting right, closer
  { pos: [2.3, 0.1, 4.3], look: [0, 0, 0], fov: 46 },
  // 3/6 — Why SYNC: pushed in close, travelling over the surface
  { pos: [0.2, 0.2, 3.0], look: [0, 0, 0], fov: 52 },
  // 4/6 — Sync Pulse: swing left so the form sits beside the phone
  { pos: [-2.1, 0.4, 3.6], look: [0.2, 0, 0], fov: 46 },
  // 5/6 — Outcomes: easing back to reveal the whole silhouette
  { pos: [0.6, 0.7, 5.2], look: [0, 0, 0], fov: 44 },
  // 1.0 — Close: wide, still, resolved
  { pos: [0, 0.4, 7.0], look: [0, 0, 0], fov: 42 },
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
