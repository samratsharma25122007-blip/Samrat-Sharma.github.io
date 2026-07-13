'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { BIRDS_CONFIG } from '@/config/scene';

interface BirdsProps {
  animate: boolean;
}

/**
 * Birds — a few distant seagulls gliding across the sky (PRD Part 3, concept
 * artwork). Each bird is a lightweight V of two wing planes that flap gently and
 * drift horizontally, wrapping around so the flock never obviously loops.
 */
export function Birds({ animate }: BirdsProps) {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  const birds = useMemo(
    () =>
      Array.from({ length: BIRDS_CONFIG.count }, (_, i) => ({
        key: i,
        z: -14 - Math.random() * 10,
        y: BIRDS_CONFIG.altitude + Math.random() * 3,
        offset: Math.random() * BIRDS_CONFIG.spread,
        phase: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 0.4,
      })),
    [],
  );

  const wingMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
    [],
  );

  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    birds.forEach((bird, i) => {
      const group = groupRefs.current[i];
      if (!group) return;
      // Drift across X and wrap.
      let x = ((bird.offset + t * BIRDS_CONFIG.speed) % BIRDS_CONFIG.spread) - BIRDS_CONFIG.spread / 2;
      group.position.set(x, bird.y + Math.sin(t * 0.5 + bird.phase) * 0.3, bird.z);
      // Flap wings.
      const flap = Math.sin(t * 6 + bird.phase) * 0.4;
      const left = group.children[0] as THREE.Mesh;
      const right = group.children[1] as THREE.Mesh;
      if (left && right) {
        left.rotation.z = 0.5 + flap;
        right.rotation.z = -0.5 - flap;
      }
    });
  });

  return (
    <group>
      {birds.map((bird, i) => (
        <group
          key={bird.key}
          ref={(el) => {
            groupRefs.current[i] = el;
          }}
          position={[0, bird.y, bird.z]}
          scale={bird.scale}
        >
          <mesh position={[-0.18, 0, 0]} rotation={[0, 0, 0.5]} material={wingMaterial}>
            <planeGeometry args={[0.5, 0.08]} />
          </mesh>
          <mesh position={[0.18, 0, 0]} rotation={[0, 0, -0.5]} material={wingMaterial}>
            <planeGeometry args={[0.5, 0.08]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
