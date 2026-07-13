import type { Metadata } from 'next';

import { SITE, CONTACT } from '@/config/site';

/**
 * Centralized SEO (PRD Parts 12 & 13) — Metadata API config plus JSON-LD
 * structured data. Text content lives in the DOM (not the canvas) so the
 * experience stays fully crawlable.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'RO Care India — Premium RO Service & Water Purification Experience',
    template: '%s · RO Care India',
  },
  description: SITE.description,
  keywords: [
    'RO service',
    'RO repair',
    'water purifier service',
    'RO installation',
    'AMC',
    'filter replacement',
    'RO Care India',
    'water purifier AMC',
  ],
  authors: [{ name: SITE.name }],
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.domain,
    siteName: SITE.name,
    title: 'Premium RO Service & Water Purification Experience',
    description:
      "A cinematic interactive experience showcasing RO Care India's premium RO servicing.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RO Care India — Premium RO Service Experience',
    description:
      "A cinematic interactive experience showcasing RO Care India's premium RO servicing.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'Home Services',
};

/** Schema.org LocalBusiness JSON-LD. */
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  description: SITE.description,
  url: SITE.domain,
  email: CONTACT.email,
  telephone: CONTACT.phoneHref.replace('tel:', ''),
  areaServed: 'IN',
  priceRange: '₹₹',
  slogan: SITE.tagline,
  openingHours: 'Mo-Su 08:00-21:00',
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
};
