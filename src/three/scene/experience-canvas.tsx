'use client';

import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { useDragRotate } from '@/lib/hooks/use-drag-rotate';
import { useExperienceStore } from '@/state/experience-store';
import { MINIMAL_PRESET, resolveQualityPreset } from '@/config/quality';
import { CAMERA_CONFIG, PHOTOREAL_HERO, SCENE_COLORS } from '@/config/scene';

import { SkyDome } from '@/three/environment/sky-dome';
import { Sunlight } from '@/three/environment/sunlight';
import { Ocean } from '@/three/environment/ocean';
import { Beach } from '@/three/environment/beach';
import { Pedestal } from '@/three/environment/pedestal';
import { PalmField } from '@/three/environment/palm-trees';
import { Island } from '@/three/environment/island';
import { Birds } from '@/three/environment/birds';
import { Particles } from '@/three/environment/particles';
import { PostProcessing } from '@/three/environment/post-processing';
import { CameraRig } from '@/three/camera/camera-rig';
import { ROPurifier } from '@/three/objects/ro-purifier';

const PHOTOREAL_CAM_POS = new THREE.Vector3(...PHOTOREAL_HERO.cameraPosition);
const PHOTOREAL_CAM_TARGET = new THREE.Vector3(...PHOTOREAL_HERO.cameraTarget);

/** Fixes the camera to frame the RO on the image's podium (no rig movement). */
function StaticCamera() {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.position.copy(PHOTOREAL_CAM_POS);
    camera.lookAt(PHOTOREAL_CAM_TARGET);
  }, [camera]);
  return null;
}

/**
 * ExperienceCanvas — the single persistent 3D world (PRD Parts 3, 10 & 13).
 *
 * Two composition modes share one canvas:
 *  - Procedural (default / fallback): the full hand-built ocean-island scene.
 *  - Photoreal (Option A): once the hero background image loads, only the
 *    interactive RO + a shadow-catcher render over the transparent canvas so the
 *    RO composites onto the photoreal image.
 *
 * The transparent clear is harmless in procedural mode because the sky dome
 * fills the view; in photoreal mode it lets the image show through.
 */
export function ExperienceCanvas() {
  const quality = useExperienceStore((state) => state.quality);
  const photoreal = useExperienceStore((state) => state.heroImageLoaded);
  const prefersReducedMotion = usePrefersReducedMotion();

  const preset = prefersReducedMotion ? MINIMAL_PRESET : resolveQualityPreset(quality);
  const animate = !prefersReducedMotion;
  const sparkle = preset.realtimeReflections ? 0.6 : 0.3;

  // Drag-to-rotate the RO (window-level so it works behind the DOM).
  const roRotation = useDragRotate();

  return (
    <Canvas
      dpr={[1, preset.maxDpr]}
      shadows
      gl={{
        antialias: true,
        alpha: true,
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
        scene.fog = new THREE.Fog(SCENE_COLORS.fog, 90, 280);
        // Transparent clear — sky dome covers it in procedural mode.
        gl.setClearColor(SCENE_COLORS.zenith, 0);
      }}
    >
      <Suspense fallback={null}>
        {photoreal ? (
          <>
            <Sunlight shadowResolution={1024} />
            <ROPurifier
              animate={animate}
              rotationRef={roRotation}
              position={PHOTOREAL_HERO.roPosition}
              scale={PHOTOREAL_HERO.roScale}
            />
            {/* Shadow-catcher grounds the RO on the image's pedestal. */}
            <mesh
              rotation-x={-Math.PI / 2}
              position-y={PHOTOREAL_HERO.shadowPlaneY}
              receiveShadow
            >
              <planeGeometry args={[6, 6]} />
              <shadowMaterial opacity={0.26} />
            </mesh>
            <StaticCamera />
          </>
        ) : (
          <>
            <SkyDome cloudDensity={preset.cloudDensity} animate={animate} />
            <Sunlight shadowResolution={preset.shadowResolution} />
            <Ocean subdivisions={preset.waveSubdivisions} sparkle={sparkle} animate={animate} />
            <Island />
            <Beach />
            <Pedestal />
            <ROPurifier animate={animate} rotationRef={roRotation} />
            <PalmField animate={animate} />
            <Birds animate={animate} />
            <Particles count={preset.particles} animate={animate} />
            <CameraRig animate={animate} />
            <PostProcessing bloom={preset.bloom} />
          </>
        )}
      </Suspense>
    </Canvas>
  );
}
