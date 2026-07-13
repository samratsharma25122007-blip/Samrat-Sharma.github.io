'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { PALM_POSITIONS, SCENE_COLORS } from '@/config/scene';

/** Build a single drooping, tapered frond geometry (reused by every palm). */
function createFrondGeometry(): THREE.BufferGeometry {
  const length = 3.4;
  const geo = new THREE.PlaneGeometry(0.7, length, 6, 14);
  const pos = geo.attributes.position;
  const half = length / 2;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const t = (y + half) / length; // 0 at base, 1 at tip
    // Leaf-shape taper: widen slightly then taper to a point.
    const width = Math.sin(t * Math.PI * 0.9) * (1 - t * 0.35);
    pos.setX(i, x * Math.max(width, 0.05));
    // Droop downward quadratically + a central-spine ripple for feathering.
    const droop = -Math.pow(t, 2) * 1.3;
    const feather = Math.sin(x * 12.0) * 0.02 * (1 - t);
    pos.setZ(i, droop + feather);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

interface PalmTreeProps {
  position: readonly [number, number, number];
  scale: number;
  rotation: number;
  phase: number;
  animate: boolean;
}

const FROND_COUNT = 14;

/** A single procedural palm: bent trunk + a radial crown of drooping fronds. */
function PalmTree({ position, scale, rotation, phase, animate }: PalmTreeProps) {
  const crownRef = useRef<THREE.Group>(null);

  const frondGeometry = useMemo(() => createFrondGeometry(), []);
  useEffect(() => () => frondGeometry.dispose(), [frondGeometry]);

  const trunkMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: SCENE_COLORS.palmTrunk, roughness: 0.9 }),
    [],
  );
  const leafMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SCENE_COLORS.palmLeaf,
        roughness: 0.6,
        side: THREE.DoubleSide,
      }),
    [],
  );
  useEffect(
    () => () => {
      trunkMaterial.dispose();
      leafMaterial.dispose();
    },
    [trunkMaterial, leafMaterial],
  );

  const fronds = useMemo(
    () =>
      Array.from({ length: FROND_COUNT }, (_, i) => {
        const angle = (i / FROND_COUNT) * Math.PI * 2 + Math.random() * 0.2;
        // Two layered rings: an upper flatter canopy and a lower drooping one.
        const ring = i % 2;
        const pitch = -0.15 - ring * 0.45 - Math.random() * 0.15;
        const frondScale = 0.9 + Math.random() * 0.25;
        return { angle, pitch, frondScale, key: i };
      }),
    [],
  );

  useFrame((state) => {
    if (!animate || !crownRef.current) return;
    const t = state.clock.elapsedTime;
    // Wind: gentle crown sway (leaves move more than the trunk).
    crownRef.current.rotation.z = Math.sin(t * 0.6 + phase) * 0.05;
    crownRef.current.rotation.x = Math.cos(t * 0.45 + phase) * 0.035;
  });

  return (
    <group position={position as unknown as THREE.Vector3} rotation-y={rotation} scale={scale}>
      {/* Trunk — tall, tapered, gently curved. */}
      <mesh position={[0, 2.1, 0]} rotation-z={0.12} material={trunkMaterial} castShadow>
        <cylinderGeometry args={[0.1, 0.2, 4.2, 10]} />
      </mesh>

      {/* Crown of fronds. */}
      <group ref={crownRef} position={[0.42, 4.2, 0]}>
        {fronds.map((frond) => (
          <mesh
            key={frond.key}
            geometry={frondGeometry}
            material={leafMaterial}
            rotation={[frond.pitch, frond.angle, 0]}
            scale={frond.frondScale}
            castShadow
          />
        ))}
        {/* Coconut cluster. */}
        {[0.12, -0.12].map((x, i) => (
          <mesh key={i} position={[x, -0.08, 0.05]}>
            <sphereGeometry args={[0.11, 10, 10]} />
            <meshStandardMaterial color={SCENE_COLORS.palmTrunk} roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

interface PalmFieldProps {
  animate: boolean;
}

/** PalmField — frames the composition with palms on both sides (PRD Part 3). */
export function PalmField({ animate }: PalmFieldProps) {
  return (
    <group>
      {PALM_POSITIONS.map((palm, i) => (
        <PalmTree
          key={i}
          position={palm.position}
          scale={palm.scale}
          rotation={palm.rotation}
          phase={i * 1.7}
          animate={animate}
        />
      ))}
    </group>
  );
}
