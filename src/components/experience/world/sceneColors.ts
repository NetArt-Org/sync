import * as THREE from "three";

// Per-chapter atmosphere: fog colour (also the clear/background tint) sampled
// by global progress. Brand-blue calibration → cold silos → converging warmth
// → deep product dark → outcome blues → calm close.

const FOG_STOPS: string[] = [
  "#1c3f95", // intro — brand blue artboard
  "#12276b", // intro/problem edge
  "#0a1430", // problem — cold, isolated navy
  "#0d1c48", // converge — brand blue returning
  "#060f22", // pulse — deep product dark
  "#08182c", // outcomes — blue-teal depth
  "#050c1a", // close — calm navy
];

const FOG_NEAR = 8;
const FOG_FAR = 46;

const _a = new THREE.Color();
const _b = new THREE.Color();

/** Interpolated fog/background colour for a global 0..1 progress. */
export function sampleFog(progress: number, target: THREE.Color): THREE.Color {
  const segCount = FOG_STOPS.length - 1;
  const scaled = Math.max(0, Math.min(1, progress)) * segCount;
  const i = Math.min(segCount - 1, Math.floor(scaled));
  const t = scaled - i;
  _a.set(FOG_STOPS[i]);
  _b.set(FOG_STOPS[i + 1]);
  return target.copy(_a).lerp(_b, t);
}

export const FOG = { near: FOG_NEAR, far: FOG_FAR };
