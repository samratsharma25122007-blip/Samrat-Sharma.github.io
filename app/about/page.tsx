import type { Metadata } from 'next';

import { TRUST_STATS } from '@/config/site';
import { WHY_US } from '@/config/content';
import { PageShell } from '@/components/layout/page-shell';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { CTABand } from '@/components/ui/cta-band';
import { GlassPanel } from '@/components/ui/glass-panel';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'RO Care India — 13+ years of trusted RO water purifier service, a million customers served, and a mission to make safe water effortless.',
};

/** Nicely formatted count values (e.g. 1000000 → 1M+). */
function formatStat(value: number, suffix: string): string {
  if (value >= 1_000_000) return `${value / 1_000_000}M${suffix}`;
  if (value >= 1_000) return `${Math.round(value / 1000)}K${suffix}`;
  return `${value}${suffix}`;
}

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us"
        title="Trusted for Safe Water Since Day One"
        subtitle="We built RO Care India on a simple promise — honest, expert RO service that keeps families drinking safe, healthy water."
      />

      {/* Stats */}
      <section className="mx-auto max-w-content px-32 py-96">
        <div className="grid gap-24 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <GlassPanel key={stat.id} className="p-32 text-center">
              <p className="font-display text-[40px] font-bold text-ocean">
                {formatStat(stat.value, stat.suffix)}
              </p>
              <p className="mt-8 text-small text-ink-soft">{stat.label}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-[760px] px-32">
        <SectionHeading eyebrow="Our Story" title="Purity, made personal" />
        <div className="flex flex-col gap-24 text-body text-ink-soft">
          <p>
            What began as a small team of technicians has grown into one of India’s most trusted RO
            service networks — serving over a million homes across 19,000+ PIN codes. Along the way,
            one thing never changed: our obsession with doing the job right.
          </p>
          <p>
            Every technician is certified and background-verified. Every part we fit is genuine.
            Every price is transparent. Because clean water isn’t a luxury — it’s the foundation of a
            healthy family, and we treat it that way.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-content px-32 py-96">
        <SectionHeading eyebrow="What We Stand For" title="Our promise to you" />
        <div className="grid gap-16 md:grid-cols-2">
          {WHY_US.map((point) => (
            <GlassPanel key={point} className="flex items-center gap-16 p-24">
              <span aria-hidden className="text-[20px] text-success">
                ✓
              </span>
              <span className="text-body text-ink">{point}</span>
            </GlassPanel>
          ))}
        </div>
      </section>

      <CTABand />
    </PageShell>
  );
}
