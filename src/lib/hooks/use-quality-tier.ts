'use client';

import { useEffect } from 'react';

import { useExperienceStore } from '@/state/experience-store';
import type { QualityTier } from '@/types/experience';

/** Heuristic hardware capability detection (PRD Part 12). */
function detectTier(): Exclude<QualityTier, 'adaptive'> {
  if (typeof navigator === 'undefined') return 'high';

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;

  if (saveData) return 'balanced';
  if (isMobile) return memory >= 6 && cores >= 6 ? 'high' : 'balanced';
  if (cores >= 8 && memory >= 8) return 'ultra';
  if (cores >= 4) return 'high';
  return 'balanced';
}

/**
 * Resolves the effective graphics tier on mount when the store is 'adaptive',
 * and exposes the current tier plus a manual setter (for a Settings menu).
 * Detection runs once; the FPS governor refines effects within the tier later.
 */
export function useQualityTier(): {
  quality: QualityTier;
  setQuality: (tier: QualityTier) => void;
} {
  const quality = useExperienceStore((state) => state.quality);
  const setQuality = useExperienceStore((state) => state.setQuality);

  useEffect(() => {
    if (quality === 'adaptive') {
      setQuality(detectTier());
    }
  }, [quality, setQuality]);

  return { quality, setQuality };
}
