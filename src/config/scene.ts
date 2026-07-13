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
  position: [0, 2.4, 9] as const,
  target: [0, 1.2, 0] as const,
  /** Idle "handheld breathing" amplitude (world units) and speed. */
  breathAmplitude: 0.06,
  breathSpeed: 0.35,
} as const;

/** Sun direction for golden morning light — front-left, ~40° elevation. */
export const SUN_DIRECTION = [-0.6, 0.62, 0.5] as const;

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

/** Palm placements (x, z) framing the composition on both sides. */
export const PALM_POSITIONS = [
  { position: [-6.5, 0, -2] as const, scale: 1.15, rotation: 0.2 },
  { position: [-8.5, 0, -6] as const, scale: 1.0, rotation: -0.3 },
  { position: [7.2, 0, -2.5] as const, scale: 1.2, rotation: -0.15 },
  { position: [9.0, 0, -6.5] as const, scale: 0.95, rotation: 0.35 },
] as const;

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
