import { SceneLayer } from '@/three/scene/scene-layer';
import { SiteHeader } from '@/components/layout/site-header';
import { HeroSection } from '@/components/hero/hero-section';

/**
 * Home — the single continuous experience (PRD Part 13).
 *
 * The persistent R3F world (SceneLayer) sits in a fixed layer behind the DOM;
 * the floating glass navigation and the hero composition render above it. This
 * preserves the single-page cinematic narrative while keeping text accessible
 * to users and search engines alike.
 */
export default function HomePage() {
  return (
    <>
      <SceneLayer />
      <SiteHeader />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
