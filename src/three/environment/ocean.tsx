'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { oceanFragmentShader, oceanVertexShader } from '@/three/shaders/ocean';
import { OCEAN_CONFIG, SCENE_COLORS, SUN_DIRECTION } from '@/config/scene';

interface OceanProps {
  /** Plane subdivisions (from the active quality preset). */
  subdivisions: number;
  /** Sparkle intensity [0,1] (reduced under low quality / reduced motion). */
  sparkle: number;
  /** When false, waves hold near-still (reduced motion). */
  animate: boolean;
}

/**
 * Ocean — a large custom-shader water plane (PRD Parts 3 & 11.5).
 *
 * The geometry is baked into the XZ plane so the Gerstner shader operates in the
 * same space it displaces (avoids the rotated-plane axis pitfall). Uniforms are
 * created once; only `uTime` and the camera position update per frame.
 */
export function Ocean({ subdivisions, sparkle, animate }: OceanProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      OCEAN_CONFIG.size,
      OCEAN_CONFIG.size,
      subdivisions,
      subdivisions,
    );
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, [subdivisions]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveSpeed: { value: OCEAN_CONFIG.speed },
      uAmplitude: { value: OCEAN_CONFIG.amplitude },
      uWaveA: { value: new THREE.Vector4(...OCEAN_CONFIG.waves.a) },
      uWaveB: { value: new THREE.Vector4(...OCEAN_CONFIG.waves.b) },
      uWaveC: { value: new THREE.Vector4(...OCEAN_CONFIG.waves.c) },
      uShallowColor: { value: new THREE.Color(SCENE_COLORS.oceanShallow) },
      uMidColor: { value: new THREE.Color(SCENE_COLORS.oceanMid) },
      uDeepColor: { value: new THREE.Color(SCENE_COLORS.oceanDeep) },
      uFoamColor: { value: new THREE.Color(SCENE_COLORS.foam) },
      uSkyColor: { value: new THREE.Color(SCENE_COLORS.zenith) },
      uSunColor: { value: new THREE.Color(SCENE_COLORS.sunWarm) },
      uSunDirection: { value: new THREE.Vector3(...SUN_DIRECTION) },
      uCameraPosition: { value: new THREE.Vector3() },
      uFoamThreshold: { value: OCEAN_CONFIG.foamThreshold },
      uSparkle: { value: sparkle },
      uLagoonRadius: { value: 6.0 },
    }),
    // Uniform objects are stable; sparkle is synced in an effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    uniforms.uSparkle.value = sparkle;
  }, [sparkle, uniforms]);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;
    if (animate) {
      material.uniforms.uTime.value += delta;
    }
    material.uniforms.uCameraPosition.value.copy(state.camera.position);
  });

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={oceanVertexShader}
        fragmentShader={oceanFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
