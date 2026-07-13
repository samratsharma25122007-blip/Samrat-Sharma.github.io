import { CONTACT, HERO_HIGHLIGHTS } from '@/config/site';

/** Minimal outline icons for the hero highlights (24px, rounded, thin). */
const HIGHLIGHT_ICONS: Record<string, React.ReactNode> = {
  droplet: <path d="M12 3.5c3 3.6 5.5 6.6 5.5 9.6a5.5 5.5 0 0 1-11 0c0-3 2.5-6 5.5-9.6Z" />,
  leaf: <path d="M5 19c0-7 5-12 14-12 0 9-5 14-12 14-1.5 0-2-1-2-2Zm2 0c3-4 6-6 9-7" />,
  shield: (
    <path d="M12 3.5 5.5 6v5c0 4 2.8 7 6.5 8.5 3.7-1.5 6.5-4.5 6.5-8.5V6L12 3.5Zm-1.2 9 1 1.8 2.6-3.4" />
  ),
};

function HighlightIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-24 w-24 stroke-water"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {HIGHLIGHT_ICONS[name]}
    </svg>
  );
}

/**
 * HeroContent — the left-column DOM of the hero, matching the concept artwork:
 * white typography over the living ocean, eyebrow, serif headline, RO-technology
 * copy, three highlights and the primary CTA (PRD Parts 3 & 12). Crawlable,
 * accessible markup; layout is owned by HeroSection.
 */
export function HeroContent() {
  return (
    <div className="max-w-[560px]">
      <p className="mb-16 text-small font-semibold uppercase tracking-[0.3em] text-water">
        Premium Water Purification
      </p>

      <h1
        id="hero-heading"
        className="font-display text-hero text-white drop-shadow-[0_2px_20px_rgba(8,36,62,0.4)]"
      >
        Pure Water.
        <br />
        Protected Life.
      </h1>

      <p className="mt-24 max-w-[480px] text-body text-white/90">
        Advanced RO purification technology that removes impurities, retains essential
        minerals, and delivers pure, healthy, great-tasting water for your family.
      </p>

      <ul className="mt-32 flex flex-wrap gap-x-32 gap-y-16" aria-label="Key benefits">
        {HERO_HIGHLIGHTS.map((highlight) => (
          <li key={highlight.id} className="flex items-center gap-8 text-small text-white/85">
            <HighlightIcon name={highlight.icon} />
            {highlight.label}
          </li>
        ))}
      </ul>

      <div className="mt-48 flex flex-wrap items-center gap-16">
        <a
          href="#book"
          data-ui
          className="group inline-flex h-[64px] items-center gap-16 rounded-full bg-gradient-ocean pl-32 pr-16 text-button text-white shadow-glow transition-transform duration-200 ease-primary hover:-translate-y-4 focus-visible:-translate-y-4"
        >
          Book Your Service
          <span className="flex h-40 w-40 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 ease-primary group-hover:translate-x-4">
            <svg
              viewBox="0 0 24 24"
              className="h-20 w-20 stroke-white"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>
        <a
          href={CONTACT.phoneHref}
          data-ui
          className="inline-flex h-[64px] items-center justify-center rounded-full glass-surface px-32 text-button text-white transition-transform duration-200 ease-primary hover:-translate-y-1"
        >
          Call {CONTACT.phone}
        </a>
      </div>
    </div>
  );
}
