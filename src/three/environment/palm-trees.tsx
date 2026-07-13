'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { PALM_POSITIONS, SCENE_COLORS } from '@/config/scene';

/** Build a single drooping, tapered frond geometry (reused by every palm). */
function createFrondGeometry(): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(0.55, 2.8, 1, 8);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // y runs -1.4..1.4 along the frond; normalize to 0..1 from base to tip.
    const t = (y + 1.4) / 2.8;
    // Taper width toward the tip, and droop downward quadratically.
    pos.setX(i, x * (1 - t * 0.8));
    pos.setZ(i, -Math.pow(t, 2) * 0.9);
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

const FROND_COUNT = 9;

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
        const angle = (i / FROND_COUNT) * Math.PI * 2;
        const pitch = -0.5 - Math.random() * 0.2;
        return { angle, pitch, key: i };
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
      {/* Trunk — slightly bent via a mid pivot. */}
      <mesh position={[0, 1.7, 0]} rotation-z={0.08} material={trunkMaterial} castShadow>
        <cylinderGeometry args={[0.12, 0.22, 3.4, 8]} />
      </mesh>

      {/* Crown of fronds. */}
      <group ref={crownRef} position={[0.28, 3.4, 0]}>
        {fronds.map((frond) => (
          <mesh
            key={frond.key}
            geometry={frondGeometry}
            material={leafMaterial}
            rotation={[frond.pitch, frond.angle, 0]}
            position={[0, 0, 0]}
            castShadow
          />
        ))}
        {/* Coconut cluster hint. */}
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color={SCENE_COLORS.palmTrunk} roughness={0.8} />
        </mesh>
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
