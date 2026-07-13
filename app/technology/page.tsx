import type { Metadata } from 'next';

import { PURIFICATION_STAGES } from '@/config/site';
import { TECH_HIGHLIGHTS } from '@/config/content';
import { PageShell } from '@/components/layout/page-shell';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { CTABand } from '@/components/ui/cta-band';
import { GlassPanel } from '@/components/ui/glass-panel';

export const metadata: Metadata = {
  title: 'Our Technology',
  description:
    'Inside RO Care India’s 7-stage purification — reverse osmosis, UV, UF, mineral guard and smart TDS control for safe, great-tasting water.',
};

export default function TechnologyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Technology"
        title="7-Stage Purification, Engineered for Purity"
        subtitle="Every drop passes through seven precisely-tuned stages that remove what’s harmful and keep what’s healthy."
      />

      <section className="mx-auto max-w-content px-32 py-96">
        <SectionHeading
          eyebrow="The Process"
          title="How your water is purified"
          lead="A synchronised multi-stage pipeline — each stage does one job exceptionally well."
        />
        <ol className="grid gap-24 md:grid-cols-2 lg:grid-cols-3">
          {PURIFICATION_STAGES.map((stage) => (
            <li key={stage.id}>
              <GlassPanel className="h-full p-32">
                <span className="font-display text-[40px] font-bold text-water">{stage.id}</span>
                <h3 className="mt-12 font-display text-[22px] text-ink">{stage.name}</h3>
                <p className="mt-8 text-small text-ink-soft">{stage.detail}</p>
              </GlassPanel>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-content px-32">
        <SectionHeading eyebrow="Core Technology" title="What makes it exceptional" />
        <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-3">
          {TECH_HIGHLIGHTS.map((tech) => (
            <GlassPanel key={tech.id} className="h-full p-32">
              <h3 className="font-display text-[22px] text-ink">{tech.title}</h3>
              <p className="mt-12 text-small text-ink-soft">{tech.body}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      <CTABand />
    </PageShell>
  );
}
