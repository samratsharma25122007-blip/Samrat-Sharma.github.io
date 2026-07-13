'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { SCENE_COLORS } from '@/config/scene';

interface ParticlesProps {
  /** Particle count from the active quality preset (0 disables). */
  count: number;
  animate: boolean;
}

const FIELD = { width: 24, height: 12, depth: 16 };

/**
 * Particles — tiny drifting pollen/dust motes catching the morning light
 * (PRD Part 3). A single Points cloud; positions drift upward and wrap, so the
 * field never obviously loops. Skipped entirely when count is 0.
 */
export function Particles({ count, animate }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const drift = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD.width;
      positions[i * 3 + 1] = Math.random() * FIELD.height;
      positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD.depth - 2;
      drift[i] = 0.05 + Math.random() * 0.12;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, speeds: drift };
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!animate || !pointsRef.current || count === 0) return;
    const position = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = position.array as Float32Array;
    for (let i = 0; i < count; i += 1) {
      let y = array[i * 3 + 1] + speeds[i] * delta;
      if (y > FIELD.height) y = 0;
      array[i * 3 + 1] = y;
      // Subtle lateral shimmer.
      array[i * 3] += Math.sin((y + i) * 0.5) * delta * 0.05;
    }
    position.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.05}
        color={SCENE_COLORS.sunWarm}
        transparent
        opacity={0.5}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
