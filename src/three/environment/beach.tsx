'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Beach — a warm cream-sand shore on the right that the palms grow from and
 * that meets the lagoon (concept artwork). A broad low landmass; a darker wet
 * band sits at the waterline for a believable transition.
 */
export function Beach() {
  const sand = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0xf1e3c4, roughness: 1 }),
    [],
  );
  const wetSand = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0xd9c39a, roughness: 0.8 }),
    [],
  );

  return (
    <group position={[14, -1.7, -8]}>
      {/* Sand mass set back on the right so the lagoon stays dominant. */}
      <mesh scale={[8, 2.4, 11]} material={sand} receiveShadow rotation-y={-0.4}>
        <sphereGeometry args={[1, 40, 24]} />
      </mesh>
      {/* Wet-sand shoreline band just above the waterline. */}
      <mesh position={[-4, 1.1, 2]} scale={[6, 0.5, 8]} material={wetSand} rotation-y={-0.4}>
        <sphereGeometry args={[1, 32, 18]} />
      </mesh>
    </group>
  );
}
