'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * GradientEnvironment — a lightweight procedural image-based lighting map so the
 * RO's glossy black and glass materials pick up believable tropical reflections
 * (sky blue above, warm sun glow, deep water below) without fetching an external
 * HDRI. Built once from a canvas gradient, pre-filtered via PMREM and assigned
 * to `scene.environment` so all PBR materials use it automatically.
 */
export function GradientEnvironment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Vertical gradient: sky → horizon → water.
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#cfeaff');
    grad.addColorStop(0.46, '#6fb0dc');
    grad.addColorStop(0.54, '#2b7fae');
    grad.addColorStop(1, '#0c3d72');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Warm sun glow, upper-right (matches the scene's light direction).
    const sun = ctx.createRadialGradient(380, 54, 0, 380, 54, 150);
    sun.addColorStop(0, 'rgba(255, 240, 205, 0.95)');
    sun.addColorStop(1, 'rgba(255, 240, 205, 0)');
    ctx.fillStyle = sun;
    ctx.fillRect(0, 0, 512, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;

    const pmrem = new THREE.PMREMGenerator(gl);
    const envRT = pmrem.fromEquirectangular(texture);
    scene.environment = envRT.texture;

    texture.dispose();
    pmrem.dispose();

    return () => {
      scene.environment = null;
      envRT.texture.dispose();
    };
  }, [gl, scene]);

  return null;
}
