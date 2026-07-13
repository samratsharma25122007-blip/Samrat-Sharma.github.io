import type { Metadata } from 'next';

import { AMC_PLANS, BRANDS, SERVICES, WHY_US } from '@/config/content';
import { CONTACT } from '@/config/site';
import { cn } from '@/lib/utils/cn';
import { PageShell } from '@/components/layout/page-shell';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassPanel } from '@/components/ui/glass-panel';

export const metadata: Metadata = {
  title: 'Service',
  description:
    'RO installation, repair, filter replacement, water testing and Annual Maintenance Contracts (AMC) from certified technicians across India.',
};

const WHATSAPP_BOOK = `${CONTACT.whatsappHref}?text=${encodeURIComponent(
  'Hi RO Care India, I would like to book a service.',
)}`;

export default function ServicePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Services"
        title="Complete RO Care, Start to Finish"
        subtitle="From brand-new installation to same-day repairs and worry-free maintenance — one trusted partner for everything."
      />

      {/* Services grid */}
      <section className="mx-auto max-w-content px-32 py-96">
        <SectionHeading eyebrow="What We Do" title="Services we offer" />
        <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <GlassPanel key={service.id} className="h-full p-32">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-md bg-crystal text-[28px]">
                {service.icon}
              </div>
              <h3 className="mt-16 font-display text-[22px] text-ink">{service.title}</h3>
              <p className="mt-8 text-small text-ink-soft">{service.body}</p>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* AMC plans */}
      <section className="mx-auto max-w-content px-32">
        <SectionHeading
          eyebrow="Maintenance Contracts"
          title="Choose your AMC plan"
          lead="Keep your purifier running like new with affordable Annual Maintenance Contracts."
        />
        <div className="grid gap-24 md:grid-cols-3">
          {AMC_PLANS.map((plan) => (
            <GlassPanel
              key={plan.id}
              className={cn(
                'flex h-full flex-col p-32',
                plan.featured && 'ring-2 ring-ocean',
              )}
            >
              {plan.featured && (
                <span className="mb-16 w-fit rounded-full bg-gradient-ocean px-16 py-4 text-[12px] font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-[24px] text-ink">{plan.name}</h3>
              <p className="mt-8 font-display text-[36px] font-bold text-ink">
                {plan.price}
                <span className="text-small font-medium text-ink-muted">{plan.period}</span>
              </p>
              <ul className="mt-24 flex flex-1 flex-col gap-12">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-8 text-small">
                    <span aria-hidden className={feature.included ? 'text-success' : 'text-ink-muted'}>
                      {feature.included ? '✓' : '✕'}
                    </span>
                    <span className={feature.included ? 'text-ink' : 'text-ink-muted'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_BOOK}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'mt-32 inline-flex h-[56px] items-center justify-center rounded-full text-button transition-transform duration-200 ease-primary hover:-translate-y-1',
                  plan.featured
                    ? 'bg-gradient-ocean text-white shadow-glow'
                    : 'border-2 border-ocean text-ocean',
                )}
              >
                Get Started
              </a>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-content px-32 py-128">
        <div className="grid gap-48 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-small font-semibold uppercase tracking-[0.25em] text-ocean">Why Us</p>
            <h2 className="mt-12 font-display text-sub text-ink">Reliable service you can trust</h2>
            <ul className="mt-24 flex flex-col gap-16">
              {WHY_US.map((point) => (
                <li key={point} className="flex items-center gap-12 text-body text-ink-soft">
                  <span aria-hidden className="text-success">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <GlassPanel className="p-32">
            <h3 className="font-display text-[22px] text-ink">Brands we service</h3>
            <div className="mt-24 flex flex-wrap gap-12">
              {BRANDS.map((brand) => (
                <span
                  key={brand}
                  className="rounded-full border border-glass-border bg-bg-secondary px-16 py-8 text-small font-medium text-ink-soft"
                >
                  {brand}
                </span>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>
    </PageShell>
  );
}
