'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

import { ISLAND_CONFIG, SCENE_COLORS } from '@/config/scene';

/**
 * Island — a soft distant landmass on the left horizon (concept artwork).
 * A low green mound over a sand base, mostly a silhouette to add depth without
 * competing with the RO focal point.
 */
export function Island() {
  const greenMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: SCENE_COLORS.palmLeaf, roughness: 0.9 }),
    [],
  );
  const sandMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: SCENE_COLORS.horizon, roughness: 1 }),
    [],
  );

  return (
    <group position={ISLAND_CONFIG.position as unknown as THREE.Vector3}>
      <mesh scale={ISLAND_CONFIG.scale as unknown as THREE.Vector3} material={greenMaterial}>
        <sphereGeometry args={[1, 24, 16]} />
      </mesh>
      {/* Sand rim just above the waterline. */}
      <mesh position={[0, -0.9, 0]} scale={[ISLAND_CONFIG.scale[0] * 1.05, 0.5, ISLAND_CONFIG.scale[2] * 1.05]} material={sandMaterial}>
        <sphereGeometry args={[1, 24, 16]} />
      </mesh>
    </group>
  );
}
