import * as THREE from "three";

// Per-chapter atmosphere for the convergence scene. Kept deep and clean (near
// black with a cool cast) so the additive streams + bloomed core read as the
// only light — a premium, cinematic backdrop rather than a technical one.

const FOG_STOPS: string[] = [
  "#05060c", // intro — near-black, cinematic
  "#050609", // problem
  "#070915", // converge — a touch of blue enters
  "#08091a", // pulse — deepest blue
  "#060712", // outcomes
  "#05060d", // outcomes edge
  "#040509", // close — calm, dark
];

const FOG_NEAR = 6;
const FOG_FAR = 26;

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
