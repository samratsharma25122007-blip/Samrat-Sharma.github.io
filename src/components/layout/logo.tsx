import { cn } from '@/lib/utils/cn';

interface LogoProps {
  className?: string;
  /** 'light' = white text (over imagery); 'dark' = ink text (light pages). */
  tone?: 'light' | 'dark';
}

/**
 * Logo — "RO CARE INDIA" wordmark with a water-droplet counter in the O and the
 * "PURE WATER. PROTECTED LIFE." tagline (concept artwork top-left).
 */
export function Logo({ className, tone = 'light' }: LogoProps) {
  const isDark = tone === 'dark';
  return (
    <a
      href="/"
      className={cn('flex flex-col leading-none', isDark ? 'text-ink' : 'text-white', className)}
      aria-label="RO Care India — home"
    >
      <span className="flex items-center font-display text-[34px] font-bold tracking-tight">
        R
        <span className="relative inline-flex items-center justify-center">
          <span aria-hidden className="text-[34px]">
            O
          </span>
          <svg viewBox="0 0 24 24" className="absolute h-12 w-12 fill-water" aria-hidden>
            <path d="M12 4c2.5 3 4 5.2 4 7.4a4 4 0 0 1-8 0C8 9.2 9.5 7 12 4Z" />
          </svg>
        </span>
      </span>
      <span
        className={cn(
          'mt-1 text-[13px] font-semibold tracking-[0.35em]',
          isDark ? 'text-ink-soft' : 'text-white/90',
        )}
      >
        CARE INDIA
      </span>
      <span
        className={cn(
          'mt-1 text-[8px] font-medium tracking-[0.28em]',
          isDark ? 'text-ink-muted' : 'text-white/60',
        )}
      >
        PURE WATER. PROTECTED LIFE.
      </span>
    </a>
  );
}
