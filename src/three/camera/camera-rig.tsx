'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { CAMERA_CONFIG } from '@/config/scene';
import { PARALLAX } from '@/config/motion';
import { usePointer } from '@/lib/hooks/use-pointer';

interface CameraRigProps {
  /** When false, the camera holds a still base pose (reduced motion). */
  animate: boolean;
}

const BASE = new THREE.Vector3(...CAMERA_CONFIG.position);
const TARGET = new THREE.Vector3(...CAMERA_CONFIG.target);

/**
 * CameraRig — the storyteller camera (PRD Parts 3 & 10).
 *
 * Adds imperceptible "handheld breathing" plus a smooth, damped mouse parallax
 * so the world feels alive without ever calling attention to itself. Drives the
 * scene's default camera directly; owns no geometry.
 */
export function CameraRig({ animate }: CameraRigProps) {
  const camera = useThree((state) => state.camera);
  const pointer = usePointer();
  const offset = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Damped pointer parallax (RO layer depth from the motion config).
    const targetX = pointer.current.x * PARALLAX.ro;
    const targetY = pointer.current.y * PARALLAX.ro;
    const damping = 1 - Math.pow(0.001, delta);
    offset.current.x += (targetX - offset.current.x) * damping;
    offset.current.y += (targetY - offset.current.y) * damping;

    const breathX = animate
      ? Math.sin(t * CAMERA_CONFIG.breathSpeed) * CAMERA_CONFIG.breathAmplitude
      : 0;
    const breathY = animate
      ? Math.cos(t * CAMERA_CONFIG.breathSpeed * 0.8) * CAMERA_CONFIG.breathAmplitude * 0.6
      : 0;

    camera.position.set(
      BASE.x + offset.current.x + breathX,
      BASE.y + offset.current.y + breathY,
      BASE.z,
    );
    camera.lookAt(TARGET);
  });

  return null;
}
