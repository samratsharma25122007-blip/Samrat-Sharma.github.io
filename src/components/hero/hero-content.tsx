import { CONTACT, HERO_FEATURES, SITE } from '@/config/site';

/**
 * HeroContent — the semantic DOM layer of the hero (PRD Parts 3 & 12).
 *
 * This is real, crawlable, accessible markup that sits above the (future) 3D
 * canvas. Kept free of animation logic; motion is applied by a wrapper hook in
 * a later phase so this component stays a single-responsibility content layer.
 */
export function HeroContent() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto flex min-h-[100dvh] max-w-content flex-col justify-center px-24 py-96"
    >
      <p className="mb-24 inline-flex w-fit items-center gap-8 rounded-full glass-surface px-24 py-8 text-small font-medium text-deep">
        <span aria-hidden className="h-8 w-8 rounded-full bg-ocean" />
        India’s most trusted RO service — {SITE.tagline}
      </p>

      <h1
        id="hero-heading"
        className="max-w-[650px] font-display text-hero text-ink"
      >
        Pure Water.
        <br />
        <span className="bg-gradient-water bg-clip-text text-transparent">Protected Family.</span>
      </h1>

      <p className="mt-24 max-w-[540px] text-body text-ink-soft">
        Certified technicians, genuine spare parts and same-day doorstep service.
        Keep your family drinking safe, healthy water — effortlessly.
      </p>

      <div className="mt-48 flex flex-wrap items-center gap-16">
        <a
          href="#book"
          className="inline-flex h-[64px] items-center justify-center rounded-md bg-gradient-water px-32 text-button text-white shadow-glow transition-transform duration-200 ease-primary hover:-translate-y-1 focus-visible:-translate-y-1"
        >
          Book a Service
        </a>
        <a
          href={CONTACT.phoneHref}
          className="inline-flex h-[64px] items-center justify-center rounded-md glass-surface px-32 text-button text-deep transition-transform duration-200 ease-primary hover:-translate-y-1"
        >
          Call {CONTACT.phone}
        </a>
      </div>

      <ul className="mt-64 flex flex-wrap gap-x-32 gap-y-16" aria-label="Why choose RO Care India">
        {HERO_FEATURES.map((feature) => (
          <li key={feature.id} className="flex items-center gap-8 text-small text-ink-soft">
            <span aria-hidden className="text-ocean">
              ◆
            </span>
            {feature.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
