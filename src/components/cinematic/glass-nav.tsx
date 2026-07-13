'use client';

import { useEffect, useState } from 'react';

import { CINEMATIC_NAV, CONTACT } from '@/config/site';
import { cn } from '@/lib/utils/cn';

const WHATSAPP_BOOK = `${CONTACT.whatsappHref}?text=${encodeURIComponent(
  'Hi RO Care India, I would like to book a service.',
)}`;

/**
 * GlassNav — a floating frosted-glass capsule centered at the top (PRD Part 11,
 * cinematic redesign). Minimal items, oversized letter-spacing, water-tinted
 * glass. It gently settles (subtle lift/opacity) after the intro.
 */
export function GlassNav() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <header
      data-ui
      className={cn(
        'fixed left-1/2 top-24 z-50 -translate-x-1/2 transition-all duration-[1200ms] ease-primary',
        entered ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0',
      )}
    >
      <nav
        aria-label="Primary"
        className="glass-surface flex items-center gap-8 rounded-full px-16 py-8 md:gap-16"
      >
        <a
          href="/"
          aria-label="RO Care India — home"
          className="px-12 font-display text-[18px] font-bold tracking-tight text-white"
        >
          RO<span className="text-water">·</span>
        </a>
        <ul className="flex items-center gap-4 md:gap-8">
          {CINEMATIC_NAV.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="rounded-full px-16 py-8 text-[13px] font-medium tracking-wide text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={WHATSAPP_BOOK}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 rounded-full bg-white/90 px-20 py-8 text-[13px] font-semibold text-deep transition-transform duration-200 ease-primary hover:-translate-y-0.5"
        >
          Book
        </a>
      </nav>
    </header>
  );
}
