'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { useExperienceStore } from '@/state/experience-store';
import { MINIMAL_PRESET, resolveQualityPreset } from '@/config/quality';
import { CAMERA_CONFIG, SCENE_COLORS } from '@/config/scene';

import { SkyDome } from '@/three/environment/sky-dome';
import { Sunlight } from '@/three/environment/sunlight';
import { Ocean } from '@/three/environment/ocean';
import { Pedestal } from '@/three/environment/pedestal';
import { PalmField } from '@/three/environment/palm-trees';
import { Island } from '@/three/environment/island';
import { Birds } from '@/three/environment/birds';
import { Particles } from '@/three/environment/particles';
import { PostProcessing } from '@/three/environment/post-processing';
import { CameraRig } from '@/three/camera/camera-rig';

/**
 * ExperienceCanvas — the single persistent 3D world (PRD Parts 3, 10 & 13).
 *
 * One Canvas hosts the entire cinematic experience so the world never resets
 * between narrative beats. Render budgets come from the active quality preset;
 * reduced-motion collapses to a minimal, still preset. Everything mounts under
 * Suspense for lazy asset streaming.
 */
export function ExperienceCanvas() {
  const quality = useExperienceStore((state) => state.quality);
  const prefersReducedMotion = usePrefersReducedMotion();

  const preset = prefersReducedMotion ? MINIMAL_PRESET : resolveQualityPreset(quality);
  const animate = !prefersReducedMotion;
  const sparkle = preset.realtimeReflections ? 0.6 : 0.3;

  return (
    <Canvas
      dpr={[1, preset.maxDpr]}
      shadows={preset.shadowResolution > 0}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{
        fov: CAMERA_CONFIG.fov,
        near: CAMERA_CONFIG.near,
        far: CAMERA_CONFIG.far,
        position: [...CAMERA_CONFIG.position],
      }}
      onCreated={({ scene, gl }) => {
        // Light haze far off so the foreground lagoon stays crystal clear.
        scene.fog = new THREE.Fog(SCENE_COLORS.fog, 90, 280);
        gl.setClearColor(SCENE_COLORS.zenith, 1);
      }}
    >
      <Suspense fallback={null}>
        <SkyDome cloudDensity={preset.cloudDensity} animate={animate} />
        <Sunlight shadowResolution={preset.shadowResolution} />
        <Ocean subdivisions={preset.waveSubdivisions} sparkle={sparkle} animate={animate} />
        <Island />
        <Pedestal />
        <PalmField animate={animate} />
        <Birds animate={animate} />
        <Particles count={preset.particles} animate={animate} />
        <CameraRig animate={animate} />
        <PostProcessing bloom={preset.bloom} />
      </Suspense>
    </Canvas>
  );
}
