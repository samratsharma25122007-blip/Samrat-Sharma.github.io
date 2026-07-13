'use client';

import { cn } from '@/lib/utils/cn';

interface WaterButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: 'solid' | 'glass';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * WaterButton — a pill with real flowing water inside (cinematic redesign):
 * two layered wave crests drift horizontally beneath the label, so the fill
 * looks liquid rather than a flat gradient. Lifts on hover.
 */
export function WaterButton({
  href,
  children,
  external,
  variant = 'solid',
  className,
  onClick,
}: WaterButtonProps) {
  return (
    <a
      href={href}
      data-ui
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group relative inline-flex h-[62px] items-center justify-center overflow-hidden rounded-full px-40 text-button transition-transform duration-300 ease-primary hover:-translate-y-1',
        variant === 'solid'
          ? 'text-white shadow-glow'
          : 'glass-surface text-white',
        className,
      )}
    >
      {variant === 'solid' && (
        <>
          {/* Deep water base. */}
          <span aria-hidden className="absolute inset-0 bg-gradient-ocean" />
          {/* Flowing wave crests. */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[140%] w-[200%]"
            style={{ animation: 'water-flow 6s linear infinite, water-bob 3s ease-in-out infinite' }}
          >
            <svg viewBox="0 0 240 60" preserveAspectRatio="none" className="h-full w-full">
              <path
                d="M0 30 Q30 18 60 30 T120 30 T180 30 T240 30 V60 H0 Z"
                fill="rgba(130,221,245,0.45)"
              />
              <path
                d="M0 38 Q30 28 60 38 T120 38 T180 38 T240 38 V60 H0 Z"
                fill="rgba(207,234,255,0.35)"
              />
            </svg>
          </span>
          {/* Glass sheen. */}
          <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-sheen opacity-30" />
        </>
      )}
      <span className="relative z-10 flex items-center gap-12">{children}</span>
    </a>
  );
}
