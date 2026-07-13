'use client';

import { usePathname } from 'next/navigation';

import { CONTACT, NAV_LINKS } from '@/config/site';
import { cn } from '@/lib/utils/cn';
import { Logo } from '@/components/layout/logo';

const WHATSAPP_BOOK = `${CONTACT.whatsappHref}?text=${encodeURIComponent(
  'Hi RO Care India, I would like to book a service.',
)}`;

/**
 * PageHeader — the functional sticky glass navigation used on the content pages
 * (dark text on a light ambient background). Highlights the active route.
 */
export function PageHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass-surface !rounded-none border-x-0 border-t-0">
      <div className="mx-auto flex h-[80px] max-w-frame items-center justify-between px-32">
        <Logo tone="dark" className="scale-90 md:scale-100" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-32">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href.replace(/\/$/, ''));
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group relative text-small font-medium transition-colors duration-200',
                      active ? 'text-ocean' : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute -bottom-4 left-0 h-2 rounded-full bg-water transition-all duration-300 ease-primary',
                        active ? 'w-full' : 'w-0 group-hover:w-full',
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={WHATSAPP_BOOK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[52px] items-center rounded-full bg-gradient-ocean px-24 text-small font-semibold text-white shadow-glow transition-transform duration-200 ease-primary hover:-translate-y-0.5"
        >
          Book Service
        </a>
      </div>
    </header>
  );
}
