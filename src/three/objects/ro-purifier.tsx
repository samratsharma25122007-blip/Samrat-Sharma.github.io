'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

import { SCENE_COLORS } from '@/config/scene';

interface ROPurifierProps {
  /** When false, the idle sway holds still (reduced motion). */
  animate: boolean;
  /** External rotation (radians) applied from user drag interaction. */
  rotationRef: React.MutableRefObject<number>;
  /** World position of the RO base (defaults to the procedural pedestal top). */
  position?: readonly [number, number, number];
  /** Uniform scale (photoreal composite tunes this to the image). */
  scale?: number;
}

/**
 * ROPurifier — the hero centerpiece, a procedural countertop RO matching the
 * reference frames: a tall glossy black front with a white body, a thin blue
 * LED, a "P" brand mark and a water stream into a glass tumbler (PRD Parts 3 & 4).
 *
 * Built from rounded primitives with physically-based clearcoat materials and a
 * fully modeled back so it reads correctly through a 360° drag rotation. The
 * node layout mirrors a real GLB so an authored model can replace it later
 * without rewiring the scene or interaction.
 */
export function ROPurifier({
  animate,
  rotationRef,
  position = [0, 0.25, 0],
  scale = 1,
}: ROPurifierProps) {
  const group = useRef<THREE.Group>(null);
  const streamRef = useRef<THREE.Mesh>(null);

  const whiteBody = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xeef2f5,
        roughness: 0.4,
        metalness: 0.05,
        clearcoat: 0.6,
        clearcoatRoughness: 0.4,
      }),
    [],
  );
  const blackPanel = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x0b0e12,
        roughness: 0.15,
        metalness: 0.4,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.2,
      }),
    [],
  );
  const ledMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SCENE_COLORS.oceanShallow,
        emissive: new THREE.Color(SCENE_COLORS.oceanShallow),
        emissiveIntensity: 2.4,
        toneMapped: false,
      }),
    [],
  );
  // "RO CARE INDIA" branding drawn to a canvas texture (no external font).
  const brandingTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.clearRect(0, 0, 512, 256);
    ctx.fillStyle = '#eef4f8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '700 96px Georgia, serif';
    ctx.fillText('RO', 256, 96);
    ctx.font = '600 40px Arial, sans-serif';
    try {
      ctx.letterSpacing = '10px';
    } catch {
      /* letterSpacing unsupported — fall back to default */
    }
    ctx.fillText('CARE INDIA', 256, 176);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, []);

  useEffect(
    () => () => {
      brandingTexture?.dispose();
    },
    [brandingTexture],
  );
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.4,
        ior: 1.33,
        transparent: true,
        opacity: 0.55,
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
        opacity: 0.8,
        ior: 1.33,
      }),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const idle = animate ? Math.sin(state.clock.elapsedTime * 0.2) * 0.05 : 0;
    // Ease toward user-driven rotation + idle sway.
    group.current.rotation.y += (idle + rotationRef.current - group.current.rotation.y) * 0.08;

    if (streamRef.current && animate) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 12) * 0.06;
      streamRef.current.scale.x = s;
      streamRef.current.scale.z = s;
    }
  });

  return (
    <group ref={group} position={position as unknown as THREE.Vector3} scale={scale}>
      {/* White outer body (tall slab). */}
      <RoundedBox
        args={[0.82, 1.5, 0.56]}
        radius={0.09}
        smoothness={4}
        position={[0, 0.98, 0]}
        material={whiteBody}
        castShadow
        receiveShadow
      />

      {/* Glossy black front panel. */}
      <RoundedBox
        args={[0.7, 1.34, 0.08]}
        radius={0.05}
        smoothness={4}
        position={[0, 1.04, 0.26]}
        material={blackPanel}
        castShadow
      />

      {/* "RO CARE INDIA" branding on the upper front. */}
      {brandingTexture && (
        <mesh position={[0, 1.44, 0.311]}>
          <planeGeometry args={[0.42, 0.21]} />
          <meshBasicMaterial map={brandingTexture} transparent toneMapped={false} />
        </mesh>
      )}

      {/* Vertical blue LED strip. */}
      <mesh position={[0, 1.02, 0.311]} material={ledMaterial}>
        <boxGeometry args={[0.035, 0.26, 0.02]} />
      </mesh>

      {/* Recessed dispensing area + nozzle. */}
      <RoundedBox args={[0.5, 0.34, 0.1]} radius={0.03} smoothness={3} position={[0, 0.5, 0.28]} material={blackPanel} />
      <mesh position={[0, 0.62, 0.32]} material={blackPanel}>
        <cylinderGeometry args={[0.028, 0.02, 0.09, 12]} />
      </mesh>

      {/* Back vents for a believable 360° read. */}
      {[-0.18, 0, 0.18].map((x, i) => (
        <mesh key={i} position={[x, 1.1, -0.29]} material={whiteBody}>
          <boxGeometry args={[0.06, 0.7, 0.01]} />
        </mesh>
      ))}

      {/* Water stream into the glass. */}
      <mesh ref={streamRef} position={[0, 0.4, 0.32]} material={waterMaterial}>
        <cylinderGeometry args={[0.012, 0.012, 0.34, 8]} />
      </mesh>

      {/* Glass tumbler with water on the podium. */}
      <group position={[0, 0.14, 0.34]}>
        <mesh material={glassMaterial} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.24, 24]} />
        </mesh>
        <mesh position={[0, -0.03, 0]} material={waterMaterial}>
          <cylinderGeometry args={[0.088, 0.07, 0.15, 24]} />
        </mesh>
      </group>
    </group>
  );
}
