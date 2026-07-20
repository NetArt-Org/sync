export type PlatformId =
  | "tv"
  | "youtube"
  | "meta"
  | "instagram"
  | "search"
  | "ott"
  | "retail";

export interface PlatformPlacement {
  id: PlatformId;
  /** Position of the card center, as a percentage of the visual stage. */
  top: string;
  left: string;
  /** Resting tilt, in degrees. */
  rotate: number;
  /** Stagger order for entrance + float phase offset. */
  order: number;
  /** Relative depth for parallax (0 = stage plane, 1 = closest to viewer). */
  depth: number;
}

export const PLATFORM_PLACEMENTS: PlatformPlacement[] = [
  { id: "tv", top: "9%", left: "16%", rotate: -6, order: 0, depth: 0.6 },
  { id: "youtube", top: "2%", left: "54%", rotate: 4, order: 1, depth: 0.8 },
  { id: "meta", top: "13%", left: "88%", rotate: -4, order: 2, depth: 0.5 },
  { id: "instagram", top: "46%", left: "6%", rotate: 5, order: 3, depth: 0.7 },
  { id: "search", top: "50%", left: "94%", rotate: -5, order: 4, depth: 0.65 },
  { id: "ott", top: "84%", left: "20%", rotate: -3, order: 5, depth: 0.55 },
  { id: "retail", top: "87%", left: "80%", rotate: 6, order: 6, depth: 0.75 },
];
