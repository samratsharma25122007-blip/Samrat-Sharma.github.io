'use client';

import { useEffect, useRef, useState } from 'react';

import { PHOTOREAL_HERO } from '@/config/scene';
import { useExperienceStore } from '@/state/experience-store';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { usePointer } from '@/lib/hooks/use-pointer';

/**
 * HeroBackground — the photoreal hero backdrop (Option A). Renders a looping
 * background video when one is configured (real birds/water/tree motion),
 * otherwise the still image. When the media loads, the store flag flips so the
 * 3D layer switches to compositing only the interactive RO over it; if the file
 * is missing the full procedural scene shows as a graceful fallback.
 *
 * A subtle pointer parallax + slow drift makes the still image feel alive
 * (disabled for reduced-motion); the video already carries its own motion.
 */
export function HeroBackground() {
  const setHeroImageLoaded = useExperienceStore((s) => s.setHeroImageLoaded);
  const loaded = useExperienceStore((s) => s.heroImageLoaded);
  const prefersReducedMotion = usePrefersReducedMotion();
  const pointer = usePointer();
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const [errored, setErrored] = useState(false);

  const useVideo = Boolean(PHOTOREAL_HERO.videoPath);

  // Media served from cache can be ready before React attaches load handlers.
  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    if (el instanceof HTMLImageElement && el.complete) {
      if (el.naturalWidth > 0) setHeroImageLoaded(true);
      else setErrored(true);
    } else if (el instanceof HTMLVideoElement && el.readyState >= 2) {
      setHeroImageLoaded(true);
    }
  }, [setHeroImageLoaded]);

  useEffect(() => {
    if (prefersReducedMotion || !loaded) return;
    let raf = 0;
    const tick = () => {
      const el = mediaRef.current;
      if (el) {
        const t = performance.now() / 1000;
        const driftX = Math.sin(t * 0.12) * 4;
        const driftY = Math.cos(t * 0.09) * 3;
        const zoom = 1.03 + Math.sin(t * 0.06) * 0.008;
        const px = pointer.current.x * PHOTOREAL_HERO.parallaxStrength * 0.5;
        const py = pointer.current.y * PHOTOREAL_HERO.parallaxStrength * 0.3;
        el.style.transform = `scale(${zoom}) translate(${driftX + px}px, ${driftY + py}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pointer, prefersReducedMotion, loaded]);

  if (errored) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {useVideo ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          className="h-full w-full scale-105 object-cover will-change-transform"
          src={PHOTOREAL_HERO.videoPath}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setHeroImageLoaded(true)}
          onError={() => {
            setErrored(true);
            setHeroImageLoaded(false);
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src={PHOTOREAL_HERO.imagePath}
          alt=""
          className="h-full w-full scale-105 object-cover will-change-transform"
          onLoad={() => setHeroImageLoaded(true)}
          onError={() => {
            setErrored(true);
            setHeroImageLoaded(false);
          }}
        />
      )}
    </div>
  );
}
