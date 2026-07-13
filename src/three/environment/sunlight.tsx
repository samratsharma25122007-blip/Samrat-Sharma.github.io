'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

import { SCENE_COLORS, SUN_DIRECTION } from '@/config/scene';

interface SunlightProps {
  /** Shadow map resolution; 0 disables shadow casting (perf/quality tiers). */
  shadowResolution: number;
}

/**
 * Sunlight — golden 8:30 AM morning light (PRD Part 11.5).
 *
 * A warm directional key from front-left, a cool sky/warm ground hemisphere for
 * believable indirect bounce, and a soft ambient fill. Shadows are opt-in via
 * the quality tier to protect the frame budget.
 */
export function Sunlight({ shadowResolution }: SunlightProps) {
  const sunPosition = useMemo(
    () => new THREE.Vector3(...SUN_DIRECTION).multiplyScalar(40),
    [],
  );

  const castShadow = shadowResolution > 0;

  return (
    <>
      <directionalLight
        position={sunPosition}
        intensity={2.1}
        color={SCENE_COLORS.sunLight}
        castShadow={castShadow}
        shadow-mapSize-width={shadowResolution || 512}
        shadow-mapSize-height={shadowResolution || 512}
        shadow-camera-near={1}
        shadow-camera-far={80}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0004}
      />
      {/* Cool sky above, warm sand bounce below. */}
      <hemisphereLight args={[SCENE_COLORS.zenith, SCENE_COLORS.horizon, 0.7]} />
      <ambientLight intensity={0.25} color={SCENE_COLORS.ambient} />
    </>
  );
}
