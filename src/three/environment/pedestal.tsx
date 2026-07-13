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
        color: 0xfbf6ec, // warm cream marble (concept artwork)
        roughness: 0.16,
        metalness: 0.04,
        envMapIntensity: 0.7,
      }),
    [],
  );

  const rim = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SCENE_COLORS.oceanShallow,
        emissive: new THREE.Color(SCENE_COLORS.oceanShallow),
        emissiveIntensity: 0.8,
        roughness: 0.4,
      }),
    [],
  );

  return (
    <group position={[0, 0.12, 0]}>
      <mesh material={marble} castShadow receiveShadow>
        <cylinderGeometry args={[0.92, 0.98, 0.26, 64]} />
      </mesh>
      {/* Glowing crystal rim at the base of the marble (artwork signature). */}
      <mesh position={[0, -0.15, 0]} material={rim}>
        <torusGeometry args={[0.96, 0.02, 12, 64]} />
      </mesh>
      {/* Wet base ring where the marble meets the lagoon. */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.04, 64]} />
        <meshStandardMaterial
          color={SCENE_COLORS.oceanShallow}
          roughness={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
