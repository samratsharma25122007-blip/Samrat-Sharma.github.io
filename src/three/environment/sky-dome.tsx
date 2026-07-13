'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { skyFragmentShader, skyVertexShader } from '@/three/shaders/sky';
import { SCENE_COLORS, SUN_DIRECTION } from '@/config/scene';

interface SkyDomeProps {
  /** Cloud density [0,1] from the active quality preset. */
  cloudDensity: number;
  /** When false, clouds hold still (reduced motion). */
  animate: boolean;
}

/**
 * SkyDome — a bright azure gradient sky with a warm horizon, soft sun glow and
 * minimal drifting clouds (PRD Part 11.5). Rendered on the inside of a large
 * sphere so it always surrounds the camera.
 */
export function SkyDome({ cloudDensity, animate }: SkyDomeProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uZenithColor: { value: new THREE.Color(SCENE_COLORS.zenith) },
      uHorizonColor: { value: new THREE.Color(SCENE_COLORS.horizon) },
      uSunColor: { value: new THREE.Color(SCENE_COLORS.sunWarm) },
      uSunDirection: { value: new THREE.Vector3(...SUN_DIRECTION) },
      uTime: { value: 0 },
      uCloudDensity: { value: cloudDensity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    uniforms.uCloudDensity.value = cloudDensity;
  }, [cloudDensity, uniforms]);

  useFrame((_, delta) => {
    if (animate && materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh scale={[500, 500, 500]} frustumCulled={false}>
      <sphereGeometry args={[1, 32, 16]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={skyVertexShader}
        fragmentShader={skyFragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}
