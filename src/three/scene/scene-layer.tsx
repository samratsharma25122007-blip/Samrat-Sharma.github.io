'use client';

import dynamic from 'next/dynamic';

import { HERO_MODE, PHOTOREAL_HERO } from '@/config/scene';
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
  // Resolve the backdrop source per mode:
  //  - photoreal-image: the baked image (or its video), RO composited over it.
  //  - cinematic: a clean empty-podium image/video, if one has been provided;
  //    otherwise the living procedural world is the backdrop.
  let backdrop: { src: string; kind: 'image' | 'video' } | null = null;
  if (HERO_MODE === 'photoreal-image') {
    backdrop = PHOTOREAL_HERO.videoPath
      ? { src: PHOTOREAL_HERO.videoPath, kind: 'video' }
      : { src: PHOTOREAL_HERO.imagePath, kind: 'image' };
  } else if (HERO_MODE === 'cinematic' && PHOTOREAL_HERO.cinematicSrc) {
    backdrop = { src: PHOTOREAL_HERO.cinematicSrc, kind: PHOTOREAL_HERO.cinematicKind };
  }

  return (
    <>
      {backdrop && <HeroBackground src={backdrop.src} kind={backdrop.kind} />}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-[100dvh] w-full">
        <ExperienceCanvas />
      </div>
    </>
  );
}
