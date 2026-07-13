'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

import { SCENE_COLORS } from '@/config/scene';

interface ROPurifierProps {
  /** When false, the idle sway holds still (reduced motion). */
  animate: boolean;
  /** External rotation (radians) applied from user drag interaction. */
  rotationRef: React.MutableRefObject<number>;
}

/**
 * ROPurifier — the hero centerpiece, a procedural countertop RO matching the
 * concept artwork: glossy white top, charcoal body, blue LED strip and a thin
 * water stream pouring into a glass tumbler (PRD Parts 3 & 4).
 *
 * Built from rounded primitives with physically-based materials. Modeled around
 * a clean node structure so a real Draco-compressed GLB can replace it later
 * without changing the surrounding scene or interaction wiring.
 */
export function ROPurifier({ animate, rotationRef }: ROPurifierProps) {
  const group = useRef<THREE.Group>(null);
  const streamRef = useRef<THREE.Mesh>(null);

  // Premium clearcoat materials.
  const whiteBody = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xf3f6f8,
        roughness: 0.35,
        metalness: 0.05,
        clearcoat: 0.8,
        clearcoatRoughness: 0.3,
      }),
    [],
  );
  const darkBody = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x15191e,
        roughness: 0.28,
        metalness: 0.35,
        clearcoat: 1,
        clearcoatRoughness: 0.25,
      }),
    [],
  );
  const ledMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SCENE_COLORS.oceanShallow,
        emissive: new THREE.Color(SCENE_COLORS.oceanShallow),
        emissiveIntensity: 2.2,
      }),
    [],
  );
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.05,
        metalness: 0,
        transmission: 0.9,
        thickness: 0.4,
        ior: 1.33,
        transparent: true,
        opacity: 0.6,
      }),
    [],
  );
  const waterMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: SCENE_COLORS.oceanShallow,
        roughness: 0.1,
        transmission: 0.6,
        transparent: true,
        opacity: 0.7,
        ior: 1.33,
      }),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    // Idle: very subtle yaw sway (front stays toward camera) + user drag.
    const idle = animate ? Math.sin(state.clock.elapsedTime * 0.2) * 0.06 : 0;
    group.current.rotation.y += (idle + rotationRef.current - group.current.rotation.y) * 0.08;

    // Gentle water-stream shimmer.
    if (streamRef.current && animate) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 12) * 0.06;
      streamRef.current.scale.x = s;
      streamRef.current.scale.z = s;
    }
  });

  return (
    <group ref={group} position={[0, 0.25, 0]}>
      {/* Charcoal main body. */}
      <RoundedBox args={[0.86, 0.98, 0.52]} radius={0.08} smoothness={4} position={[0, 0.72, 0]} material={darkBody} castShadow />

      {/* White top cap. */}
      <RoundedBox args={[0.92, 0.36, 0.56]} radius={0.1} smoothness={4} position={[0, 1.32, 0]} material={whiteBody} castShadow />

      {/* Recessed dispensing niche on the front. */}
      <RoundedBox args={[0.46, 0.5, 0.12]} radius={0.04} smoothness={3} position={[0, 0.62, 0.24]} material={darkBody} />

      {/* Blue vertical LED strip. */}
      <mesh position={[0, 1.0, 0.27]} material={ledMaterial}>
        <boxGeometry args={[0.04, 0.28, 0.02]} />
      </mesh>

      {/* Dispensing nozzle. */}
      <mesh position={[0, 0.74, 0.28]} material={darkBody}>
        <cylinderGeometry args={[0.03, 0.02, 0.1, 12]} />
      </mesh>

      {/* Water stream into the glass. */}
      <mesh ref={streamRef} position={[0, 0.52, 0.28]} material={waterMaterial}>
        <cylinderGeometry args={[0.012, 0.012, 0.36, 8]} />
      </mesh>

      {/* Glass tumbler on the front tray. */}
      <group position={[0, 0.16, 0.3]}>
        <mesh material={glassMaterial}>
          <cylinderGeometry args={[0.1, 0.08, 0.22, 24]} />
        </mesh>
        {/* Water inside the glass. */}
        <mesh position={[0, -0.02, 0]} material={waterMaterial}>
          <cylinderGeometry args={[0.088, 0.07, 0.14, 24]} />
        </mesh>
      </group>
    </group>
  );
}
