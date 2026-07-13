'use client';

import { useEffect, useState } from 'react';

import { NAV_LINKS } from '@/config/site';
import { cn } from '@/lib/utils/cn';
import { Logo } from '@/components/layout/logo';

/**
 * SiteHeader — the floating top navigation (concept artwork): logo left,
 * centered links, glass "Book Service" pill right. Transparent over the hero;
 * densifies into frosted glass on scroll (PRD Part 11), never fully solid.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-ui
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-400 ease-primary',
        scrolled && 'glass-surface !rounded-none border-x-0 border-t-0',
      )}
    >
      <div className="mx-auto flex h-[88px] max-w-frame items-center justify-between px-32">
        <Logo />

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-32">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="group relative text-small font-medium text-white/90 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                  {/* Water underline grows from the left on hover. */}
                  <span className="absolute -bottom-4 left-0 h-2 w-0 rounded-full bg-water transition-all duration-300 ease-primary group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#book"
          className="inline-flex h-[52px] items-center rounded-full bg-gradient-ocean px-24 text-small font-semibold text-white shadow-glow transition-transform duration-200 ease-primary hover:-translate-y-0.5"
        >
          Book Service
        </a>
      </div>
    </header>
  );
}
