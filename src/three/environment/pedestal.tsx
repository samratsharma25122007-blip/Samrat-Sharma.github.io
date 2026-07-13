'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

import { SCENE_COLORS } from '@/config/scene';

/**
 * Pedestal — the floating Italian-marble platform the RO stands on (PRD Part 3).
 *
 * A glossy white cylinder just above the shallow lagoon. The RO model mounts on
 * top of this in Phase 3; for now it anchors the composition's focal point.
 */
export function Pedestal() {
  const marble = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SCENE_COLORS.foam,
        roughness: 0.18,
        metalness: 0.05,
        envMapIntensity: 0.6,
      }),
    [],
  );

  return (
    <group position={[0, 0.12, 0]}>
      <mesh material={marble} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.95, 0.25, 64]} />
      </mesh>
      {/* Wet base ring where the marble meets the lagoon. */}
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 0.04, 64]} />
        <meshStandardMaterial color={SCENE_COLORS.oceanShallow} roughness={0.3} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
