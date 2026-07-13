import { CONTACT, NAV_LINKS, SITE } from '@/config/site';

/**
 * Footer — minimal glass footer with quick links and contact details
 * (concept artwork). Shared across all content pages.
 */
export function Footer() {
  const year = 2026;
  return (
    <footer className="mt-160 border-t border-glass-border bg-bg-secondary">
      <div className="mx-auto grid max-w-frame gap-48 px-32 py-64 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-sub text-ink">
            RO Care <span className="text-ocean">India</span>
          </p>
          <p className="mt-16 text-small text-ink-soft">
            Your trusted partner for RO water purifier sales, installation, repair and maintenance
            across India.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-small font-semibold uppercase tracking-widest text-ink">Explore</h2>
          <ul className="mt-16 flex flex-col gap-12">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="text-small text-ink-soft transition-colors hover:text-ocean">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-small font-semibold uppercase tracking-widest text-ink">Contact</h2>
          <ul className="mt-16 flex flex-col gap-12 text-small text-ink-soft">
            <li>
              <a href={CONTACT.phoneHref} className="transition-colors hover:text-ocean">
                📞 {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className="transition-colors hover:text-ocean">
                ✉️ {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ocean"
              >
                💬 WhatsApp Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-small font-semibold uppercase tracking-widest text-ink">Hours</h2>
          <ul className="mt-16 flex flex-col gap-12 text-small text-ink-soft">
            <li>{CONTACT.hours}</li>
            <li>{CONTACT.serviceArea}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-glass-border">
        <div className="mx-auto max-w-frame px-32 py-24 text-center text-small text-ink-muted">
          © {year} {SITE.name}. All rights reserved. · {SITE.tagline}
        </div>
      </div>
    </footer>
  );
}
