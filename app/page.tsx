import { HeroContent } from '@/components/hero/hero-content';

/**
 * Home — the single continuous experience (PRD Part 13).
 *
 * Phase 1 renders the semantic hero content layer. Subsequent phases mount the
 * persistent R3F world *behind* this DOM without changing the page's structure,
 * preserving the crawlable content and the single-page narrative.
 */
export default function HomePage() {
  return (
    <main>
      <HeroContent />
    </main>
  );
}
