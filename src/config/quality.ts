/**
 * Quality Presets (PRD Part 12) — the concrete render budgets behind each tier.
 *
 * Every expensive 3D system reads its numbers from here so a single tier switch
 * consistently scales particles, reflections, waves, bloom, shadows and clouds.
 * The adaptive FPS governor interpolates *within* the active tier's ceilings.
 */
import type { QualityTier } from '@/types/experience';

export interface QualityPreset {
  /** Device pixel ratio ceiling for the renderer. */
  maxDpr: number;
  /** Floating particle count. */
  particles: number;
  /** Square resolution of realtime reflection/refraction targets. */
  reflectionResolution: number;
  /** Ocean FFT / wave subdivision detail. */
  waveSubdivisions: number;
  /** Bloom strength [0,1]. */
  bloom: number;
  /** Shadow map resolution (0 disables shadows). */
  shadowResolution: number;
  /** Volumetric cloud density [0,1]. */
  cloudDensity: number;
  /** Whether realtime reflections update every frame (vs. throttled). */
  realtimeReflections: boolean;
}

export const QUALITY_PRESETS: Record<Exclude<QualityTier, 'adaptive'>, QualityPreset> = {
  ultra: {
    maxDpr: 2,
    particles: 1200,
    reflectionResolution: 1024,
    waveSubdivisions: 256,
    bloom: 0.9,
    shadowResolution: 2048,
    cloudDensity: 1,
    realtimeReflections: true,
  },
  high: {
    maxDpr: 1.75,
    particles: 700,
    reflectionResolution: 512,
    waveSubdivisions: 160,
    bloom: 0.7,
    shadowResolution: 1024,
    cloudDensity: 0.7,
    realtimeReflections: true,
  },
  balanced: {
    maxDpr: 1.25,
    particles: 300,
    reflectionResolution: 256,
    waveSubdivisions: 96,
    bloom: 0.5,
    shadowResolution: 512,
    cloudDensity: 0.4,
    realtimeReflections: false,
  },
};

/**
 * Resolve a tier (possibly 'adaptive') to a concrete preset. 'adaptive' should
 * already be resolved by useQualityTier before render, but we default to 'high'
 * defensively so the scene never reads an undefined budget.
 */
export function resolveQualityPreset(tier: QualityTier): QualityPreset {
  if (tier === 'adaptive') return QUALITY_PRESETS.high;
  return QUALITY_PRESETS[tier];
}

/** Reduced-motion / minimum floor used when accessibility settings demand it. */
export const MINIMAL_PRESET: QualityPreset = {
  maxDpr: 1,
  particles: 0,
  reflectionResolution: 128,
  waveSubdivisions: 48,
  bloom: 0.25,
  shadowResolution: 0,
  cloudDensity: 0.2,
  realtimeReflections: false,
};
