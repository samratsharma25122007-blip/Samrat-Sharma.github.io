import { HeroContent } from '@/components/hero/hero-content';
import { SceneLayer } from '@/three/scene/scene-layer';

/**
 * Home — the single continuous experience (PRD Part 13).
 *
 * The persistent R3F world (SceneLayer) sits in a fixed layer behind the DOM;
 * the semantic, crawlable content renders above it. This preserves the
 * single-page cinematic narrative while keeping text accessible to users and
 * search engines alike.
 */
export default function HomePage() {
  return (
    <>
      <SceneLayer />
      <main>
        <HeroContent />
      </main>
    </>
  );
}
