import { HeroContent } from '@/components/hero/hero-content';
import { PurificationPanel } from '@/components/hero/purification-panel';
import { StatsBar } from '@/components/hero/stats-bar';
import { ScrollIndicator } from '@/components/hero/scroll-indicator';

/**
 * HeroSection — the full-viewport hero composition (concept artwork):
 * left text column, right 7-Stage Purification panel, a floating stats bar and
 * a scroll cue, all over the persistent 3D world. Regions are anchored so they
 * never collide with the header or each other. The RO renders in the 3D layer
 * behind, centered between the columns.
 */
export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100dvh] w-full overflow-hidden"
    >
      {/* Dark-left legibility gradient so white text reads over the bright ocean. */}
      <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0 -z-[1]" />

      {/* Center band (between header and the stats bar): hero text + panel. */}
      <div className="absolute inset-x-0 top-[88px] bottom-[148px] flex items-center">
        <div className="mx-auto flex w-full max-w-frame items-center justify-between gap-32 px-32">
          <HeroContent />
          <div className="hidden shrink-0 xl:block">
            <PurificationPanel />
          </div>
        </div>
      </div>

      {/* Floating stats bar (left) + scroll cue (right), anchored to the bottom. */}
      <div className="absolute inset-x-0 bottom-40">
        <div className="mx-auto flex max-w-frame items-end justify-between gap-24 px-32">
          <div className="w-full max-w-2xl">
            <StatsBar />
          </div>
          <div className="mb-8 hidden lg:block">
            <ScrollIndicator />
          </div>
        </div>
      </div>
    </section>
  );
}
