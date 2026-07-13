'use client';

import { Bloom, EffectComposer } from '@react-three/postprocessing';

interface PostProcessingProps {
  /** Bloom strength from the active quality preset (0 disables the composer). */
  bloom: number;
}

/**
 * PostProcessing — very subtle bloom for the sun glint and water sparkle
 * (PRD Part 11.5). ACES Filmic tone mapping is configured on the renderer, so
 * this stays a light touch; the composer is skipped entirely when bloom is 0.
 */
export function PostProcessing({ bloom }: PostProcessingProps) {
  if (bloom <= 0) return null;
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={bloom}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.28}
        mipmapBlur
      />
    </EffectComposer>
  );
}
