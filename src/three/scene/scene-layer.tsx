'use client';

import dynamic from 'next/dynamic';

import { HeroBackground } from '@/components/hero/hero-background';

/**
 * The WebGL world is client-only and code-split: it never runs during SSR/SSG
 * and its (large) Three.js bundle is fetched separately from the critical HTML,
 * keeping first paint fast (PRD Part 12 bundle strategy).
 */
const ExperienceCanvas = dynamic(
  () => import('@/three/scene/experience-canvas').then((mod) => mod.ExperienceCanvas),
  { ssr: false },
);

/**
 * SceneLayer — mounts the persistent 3D world in a fixed, full-viewport layer
 * behind the DOM content. `pointer-events: none` lets clicks/scroll pass through
 * to the DOM while the world still tracks the cursor via a window listener.
 *
 * The ambient CSS gradient on <body> shows through until the canvas paints, so
 * there is never a blank/white flash (PRD Part 10 load philosophy).
 */
export function SceneLayer() {
  return (
    <>
      {/* Photoreal image background (Option A); no-op until the file exists. */}
      <HeroBackground />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-[100dvh] w-full">
        <ExperienceCanvas />
      </div>
    </>
  );
}
