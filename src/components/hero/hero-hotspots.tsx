import { CONTACT, NAV_LINKS } from '@/config/site';

/**
 * HeroHotspots — invisible, accessible click targets over the buttons and nav
 * painted into the photoreal background image, so the baked UI actually works.
 * Nav items route to the real pages; booking CTAs open a pre-filled WhatsApp.
 *
 * Positions are percentage-based (tracking the object-cover image) and sized a
 * little larger than the artwork elements to stay forgiving of the drift.
 * `data-ui` keeps the RO drag-rotation from triggering on these.
 */
const WHATSAPP_BOOK = `${CONTACT.whatsappHref}?text=${encodeURIComponent(
  'Hi RO Care India, I would like to book a service.',
)}`;

/** Approximate horizontal placement of each baked nav item. */
const NAV_POSITIONS: Record<string, { left: string; width: string }> = {
  home: { left: '27%', width: '6%' },
  technology: { left: '34%', width: '10%' },
  purification: { left: '45%', width: '12%' },
  service: { left: '58%', width: '6%' },
  about: { left: '64%', width: '7%' },
  contact: { left: '71%', width: '7%' },
};

type Hotspot = {
  label: string;
  href: string;
  style: React.CSSProperties;
  external: boolean;
};

const NAV_HOTSPOTS: Hotspot[] = NAV_LINKS.map((link) => ({
  label: link.label,
  href: link.href,
  style: { top: '3%', height: '5%', ...NAV_POSITIONS[link.id] },
  external: false,
}));

const CTA_HOTSPOTS: Hotspot[] = [
  {
    label: 'Book a service on WhatsApp',
    href: WHATSAPP_BOOK,
    style: { right: '3%', top: '2.5%', width: '12%', height: '7%' },
    external: true,
  },
  {
    label: 'Book your service on WhatsApp',
    href: WHATSAPP_BOOK,
    style: { left: '3%', top: '64%', width: '17%', height: '8%' },
    external: true,
  },
];

export function HeroHotspots() {
  const hotspots = [...NAV_HOTSPOTS, ...CTA_HOTSPOTS];
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {hotspots.map((spot) => (
        <a
          key={spot.label}
          data-ui
          href={spot.href}
          aria-label={spot.label}
          {...(spot.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="pointer-events-auto absolute rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          style={spot.style}
        >
          <span className="sr-only">{spot.label}</span>
        </a>
      ))}
    </div>
  );
}
