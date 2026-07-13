'use client';

import { useEffect, useRef, useState } from 'react';

import { PHOTOREAL_HERO } from '@/config/scene';
import { useExperienceStore } from '@/state/experience-store';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { usePointer } from '@/lib/hooks/use-pointer';

/**
 * HeroBackground — the photoreal AI-rendered scene as a full-bleed background
 * (Option A). When it loads, the store flag flips so the 3D layer switches to
 * rendering only the interactive RO over this image; if the file is missing the
 * flag stays false and the full procedural scene shows as a graceful fallback.
 *
 * Adds a very subtle pointer-driven drift + slow zoom so the still image feels
 * alive, echoing the reference video (disabled for reduced-motion).
 */
export function HeroBackground() {
  const setHeroImageLoaded = useExperienceStore((s) => s.setHeroImageLoaded);
  const loaded = useExperienceStore((s) => s.heroImageLoaded);
  const prefersReducedMotion = usePrefersReducedMotion();
  const pointer = usePointer();
  const imgRef = useRef<HTMLImageElement>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !loaded) return;
    let raf = 0;
    const tick = () => {
      const el = imgRef.current;
      if (el) {
        const x = pointer.current.x * PHOTOREAL_HERO.parallaxStrength;
        const y = pointer.current.y * PHOTOREAL_HERO.parallaxStrength * 0.6;
        el.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pointer, prefersReducedMotion, loaded]);

  if (errored) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={PHOTOREAL_HERO.imagePath}
        alt=""
        className="h-full w-full scale-105 object-cover will-change-transform"
        onLoad={() => setHeroImageLoaded(true)}
        onError={() => {
          setErrored(true);
          setHeroImageLoaded(false);
        }}
      />
    </div>
  );
}
