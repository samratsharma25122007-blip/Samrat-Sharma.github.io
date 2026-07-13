'use client';

import { useExperienceStore } from '@/state/experience-store';
import { SITE, NAV_LINKS } from '@/config/site';
import { PHOTOREAL_HERO } from '@/config/scene';
import { SiteHeader } from '@/components/layout/site-header';
import { HeroSection } from '@/components/hero/hero-section';

/**
 * HomeShell — chooses the hero presentation based on whether the photoreal
 * background image loaded.
 *
 *  - Photoreal (image present): the image (with its baked-in UI) is the hero and
 *    the interactive 3D RO composites on top. The live DOM UI would duplicate
 *    the baked UI, so it is hidden — but a screen-reader/SEO-only layer stays in
 *    the DOM so the page remains crawlable and accessible.
 *  - Fallback (no image): the full functional DOM UI + procedural 3D scene.
 */
export function HomeShell() {
  const photoreal = useExperienceStore((state) => state.heroImageLoaded);

  // Only hide the live UI when the image itself already contains the UI.
  if (photoreal && PHOTOREAL_HERO.imageHasBakedUI) {
    return (
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
