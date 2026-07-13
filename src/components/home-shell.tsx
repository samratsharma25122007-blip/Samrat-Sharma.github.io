'use client';

import { useExperienceStore } from '@/state/experience-store';
import { SITE, NAV_LINKS } from '@/config/site';
import { HERO_MODE, PHOTOREAL_HERO } from '@/config/scene';
import { SiteHeader } from '@/components/layout/site-header';
import { HeroSection } from '@/components/hero/hero-section';
import { HeroFX } from '@/components/hero/hero-fx';
import { HeroHotspots } from '@/components/hero/hero-hotspots';
import { GlassNav } from '@/components/cinematic/glass-nav';
import { CinematicStory } from '@/components/cinematic/cinematic-story';

/**
 * HomeShell — chooses the hero presentation.
 *
 *  - Cinematic (redesign): the living procedural 3D world + RO behind, with a
 *    floating glass-capsule nav and a minimal scroll story on top.
 *  - Photoreal-image: the baked image backdrop + composited RO (baked UI hidden,
 *    hotspots make it clickable), or the full functional DOM as a fallback.
 */
export function HomeShell() {
  const photoreal = useExperienceStore((state) => state.heroImageLoaded);

  if (HERO_MODE === 'cinematic') {
    return (
      <>
        <GlassNav />
        <main>
          <CinematicStory />
        </main>
      </>
    );
  }

  // Photoreal-image mode: hide the live UI when the image bakes in its own.
  if (photoreal && PHOTOREAL_HERO.imageHasBakedUI) {
    return (
      <>
        <HeroFX />
        <HeroHotspots />
        <main className="sr-only">
          <h1>Pure Water. Protected Life.</h1>
          <p>{SITE.description}</p>
          <nav aria-label="Primary">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
