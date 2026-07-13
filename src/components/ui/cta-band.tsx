import { CONTACT } from '@/config/site';

const WHATSAPP_BOOK = `${CONTACT.whatsappHref}?text=${encodeURIComponent(
  'Hi RO Care India, I would like to book a service.',
)}`;

/**
 * CTABand — a recurring "book a service" call-to-action used at the foot of the
 * content pages.
 */
export function CTABand() {
  return (
    <section className="mx-auto mt-128 max-w-content px-32">
      <div className="relative overflow-hidden rounded-lg bg-gradient-ocean px-32 py-64 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-sheen opacity-20" />
        <div className="relative">
          <h2 className="font-display text-sub text-white">Ready for pure, healthy water?</h2>
          <p className="mx-auto mt-16 max-w-[520px] text-body text-white/90">
            Book a certified technician at your doorstep — same-day service, genuine parts,
            transparent pricing.
          </p>
          <div className="mt-32 flex flex-wrap justify-center gap-16">
            <a
              href={WHATSAPP_BOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[60px] items-center rounded-full bg-white px-32 text-button text-ocean transition-transform duration-200 ease-primary hover:-translate-y-1"
            >
              💬 Book on WhatsApp
            </a>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex h-[60px] items-center rounded-full border-2 border-white/70 px-32 text-button text-white transition-transform duration-200 ease-primary hover:-translate-y-1"
            >
              📞 Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
