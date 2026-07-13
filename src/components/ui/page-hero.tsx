import type { ReactNode } from 'react';

/**
 * PageHero — the title band at the top of each content page. Ocean-gradient
 * wash with a serif heading, eyebrow and supporting copy.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-ocean">
      {/* Soft light sheen. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-sheen opacity-20" />
      <div className="relative mx-auto max-w-content px-32 py-96 text-center">
        <p className="text-small font-semibold uppercase tracking-[0.3em] text-white/80">{eyebrow}</p>
        <h1 className="mx-auto mt-16 max-w-[720px] font-display text-section text-white">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-24 max-w-[600px] text-body text-white/90">{subtitle}</p>
        )}
        {children && <div className="mt-32 flex justify-center">{children}</div>}
      </div>
    </section>
  );
}
