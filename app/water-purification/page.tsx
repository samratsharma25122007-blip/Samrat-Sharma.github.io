import type { Metadata } from 'next';

import { CONTAMINANTS, WATER_BENEFITS } from '@/config/content';
import { PageShell } from '@/components/layout/page-shell';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { CTABand } from '@/components/ui/cta-band';
import { GlassPanel } from '@/components/ui/glass-panel';

export const metadata: Metadata = {
  title: 'Water Purification',
  description:
    'Why RO water purification matters — the contaminants removed and the healthy minerals retained for safe, great-tasting drinking water.',
};

export default function WaterPurificationPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Water Purification"
        title="Cleaner Water, Healthier Family"
        subtitle="Municipal and borewell water can carry contaminants you can’t see. Multi-stage RO purification makes every glass safe."
      />

      <section className="mx-auto max-w-content px-32 py-96">
        <SectionHeading
          eyebrow="What We Remove"
          title="Contaminants filtered out"
          lead="From dissolved salts to bacteria and microplastics — purified down to 0.0001 microns."
        />
        <ul className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          {CONTAMINANTS.map((item) => (
            <li key={item.id}>
              <GlassPanel className="flex items-center gap-16 p-24">
                <span aria-hidden className="text-[20px] text-danger">
                  ✕
                </span>
                <span className="text-body text-ink">{item.label}</span>
              </GlassPanel>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-content px-32">
        <SectionHeading
          eyebrow="What We Keep"
          title="Healthy by design"
          lead="Purification shouldn’t strip the good stuff — our mineral guard keeps water wholesome."
        />
        <div className="grid gap-24 md:grid-cols-3">
          {WATER_BENEFITS.map((benefit) => (
            <GlassPanel key={benefit.id} className="h-full p-32">
              <span aria-hidden className="text-[20px] text-success">
                ✓
              </span>
              <h3 className="mt-12 font-display text-[22px] text-ink">{benefit.title}</h3>
              <p className="mt-8 text-small text-ink-soft">{benefit.body}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      <CTABand />
    </PageShell>
  );
}
