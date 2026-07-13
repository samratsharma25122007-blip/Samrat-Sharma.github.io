import { CONTACT } from '@/config/site';

/**
 * HeroHotspots — invisible, accessible click targets positioned over the
 * buttons painted into the photoreal background image, so the baked UI actually
 * works. The booking CTAs open a pre-filled WhatsApp chat; Contact opens email.
 *
 * Positions are percentage-based to track the image (object-cover), sized a
 * little larger than the artwork buttons to stay forgiving of the gentle drift.
 * `data-ui` keeps the RO drag-rotation from triggering on these.
 */
const WHATSAPP_BOOK = `${CONTACT.whatsappHref}?text=${encodeURIComponent(
  'Hi RO Care India, I would like to book a service.',
)}`;

const HOTSPOTS = [
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
  {
    label: 'Contact RO Care India by email',
    href: CONTACT.emailHref,
    style: { left: '68%', top: '3%', width: '9%', height: '6%' },
    external: false,
  },
] as const;

export function HeroHotspots() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {HOTSPOTS.map((spot) => (
        <a
          key={spot.label}
          data-ui
          href={spot.href}
          aria-label={spot.label}
          {...(spot.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="pointer-events-auto absolute rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          style={spot.style}
        >
          <span className="sr-only">{spot.label}</span>
        </a>
      ))}
    </div>
  );
}
