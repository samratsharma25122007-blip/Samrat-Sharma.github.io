/**
 * Scene Config — world-space layout & colors for the 3D environment.
 *
 * Colors derive from the official palette (design tokens) so the 3D world and
 * the DOM share one identity. Positions define the tropical composition: RO
 * centered on its lagoon pedestal, palms framing both sides without covering
 * it, sun front-left for golden 8:30 AM light (PRD Parts 3 & 11.5).
 *
 * When the concept artwork is provided, tune these constants (camera, horizon,
 * palm placement, sun angle) to match it — the artwork is the visual authority.
 */
import { COLORS } from '@/config/design-tokens';

/** Camera setup (PRD Part 3): 35° perspective. */
export const CAMERA_CONFIG = {
  fov: 35,
  near: 0.1,
  far: 1000,
  position: [0, 2.2, 9] as const,
  target: [0, 1.0, 0] as const,
  /** Idle "handheld breathing" amplitude (world units) and speed. */
  breathAmplitude: 0.06,
  breathSpeed: 0.35,
} as const;

/**
 * Sun direction — golden morning light from the FRONT-RIGHT, matching the
 * concept artwork (warm glow and sun glint on the right of frame).
 */
export const SUN_DIRECTION = [0.62, 0.55, 0.42] as const;

/** Ocean plane. */
export const OCEAN_CONFIG = {
  size: 400,
  /** Three summed Gerstner waves: [dirX, dirZ, steepness, wavelength]. */
  waves: {
    a: [1.0, 0.2, 0.28, 34] as const,
    b: [0.7, 0.9, 0.22, 18] as const,
    c: [-0.6, 0.5, 0.16, 9] as const,
  },
  amplitude: 1.0,
  speed: 0.5,
  foamThreshold: 0.55,
} as const;

/**
 * Palm placements (x, z). Per the artwork, palms cluster on the RIGHT to frame
 * the RO, with one distant palm on the left island.
 */
export const PALM_POSITIONS = [
  { position: [6.4, 0, 0.5] as const, scale: 1.35, rotation: -0.2 },
  { position: [8.3, 0, -3] as const, scale: 1.15, rotation: 0.25 },
  { position: [9.6, 0, -6.5] as const, scale: 1.0, rotation: -0.15 },
  { position: [7.3, 0, -9] as const, scale: 0.9, rotation: 0.35 },
  { position: [-9.5, 0, -11] as const, scale: 0.7, rotation: 0.2 },
] as const;

/** Distant island silhouette on the left horizon (concept artwork). */
export const ISLAND_CONFIG = {
  position: [-11, -0.3, -16] as const,
  scale: [7, 1.6, 5] as const,
} as const;

/** Bird flock config (PRD Part 3): occasional far-away gliding birds. */
export const BIRDS_CONFIG = {
  count: 5,
  altitude: 9,
  spread: 22,
  speed: 0.6,
} as const;

/** Scene colors as hex numbers for Three.js materials/lights. */
export const SCENE_COLORS = {
  zenith: 0x4aa3e0, // bright azure
  horizon: parseHex(COLORS.warmSand), // warm sand near horizon
  sunLight: parseHex(COLORS.sunlightGold),
  sunWarm: 0xfff0c4,
  oceanShallow: parseHex(COLORS.crystalWater),
  oceanDeep: parseHex(COLORS.deepOcean),
  foam: 0xffffff,
  ambient: parseHex(COLORS.lightMist),
  palmTrunk: 0x6e4a2f,
  palmLeaf: parseHex(COLORS.palmGreen),
  palmLeafHighlight: parseHex(COLORS.leafHighlight),
  fog: parseHex(COLORS.crystalWater),
} as const;

/** Parse a #rrggbb string to a Three-friendly 0xrrggbb number. */
function parseHex(hex: string): number {
  return Number.parseInt(hex.replace('#', ''), 16);
}
