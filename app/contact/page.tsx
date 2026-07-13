import type { Metadata } from 'next';

import { CONTACT } from '@/config/site';
import { PageShell } from '@/components/layout/page-shell';
import { PageHero } from '@/components/ui/page-hero';
import { GlassPanel } from '@/components/ui/glass-panel';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book an RO service or ask a question. Call, WhatsApp or email RO Care India — certified technicians, same-day doorstep service across India.',
};

const CONTACT_ITEMS = [
  { icon: '📞', label: 'Phone', value: CONTACT.phone, href: CONTACT.phoneHref, external: false },
  { icon: '✉️', label: 'Email', value: CONTACT.email, href: CONTACT.emailHref, external: false },
  { icon: '💬', label: 'WhatsApp', value: 'Chat with us', href: CONTACT.whatsappHref, external: true },
  { icon: '🕒', label: 'Working Hours', value: CONTACT.hours, href: null, external: false },
  { icon: '📍', label: 'Service Area', value: CONTACT.serviceArea, href: null, external: false },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Get In Touch"
        title="Book a Service or Ask a Question"
        subtitle="Reach out and our team will get back to you as soon as possible — usually within 30 minutes."
      />

      <section className="mx-auto grid max-w-content gap-48 px-32 py-96 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact details */}
        <div className="flex flex-col gap-16">
          {CONTACT_ITEMS.map((item) => {
            const inner = (
              <GlassPanel className="flex items-center gap-16 p-24">
                <span
                  aria-hidden
                  className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-md bg-crystal text-[22px]"
                >
                  {item.icon}
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-[16px] text-ink">{item.label}</span>
                  <span className="text-small text-ink-soft">{item.value}</span>
                </span>
              </GlassPanel>
            );
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="transition-transform duration-200 ease-primary hover:-translate-y-0.5"
              >
                {inner}
              </a>
            ) : (
              <div key={item.label}>{inner}</div>
            );
          })}
        </div>

        {/* Form */}
        <GlassPanel className="p-32">
          <h2 className="font-display text-sub text-ink">Request a callback</h2>
          <p className="mt-8 text-small text-ink-soft">
            Fill this in and we’ll reach out to confirm your booking.
          </p>
          <div className="mt-24">
            <ContactForm />
          </div>
        </GlassPanel>
      </section>
    </PageShell>
  );
}
