/**
 * Site Config — business facts, contact details and SEO metadata.
 *
 * Centralized so copy and contact info are edited in exactly one place.
 * Placeholder phone number is clearly marked for the owner to replace.
 */

export const SITE = {
  name: 'RO Care India',
  tagline: 'Water Gives Life',
  domain: 'https://samrat-sharma.github.io',
  description:
    'India’s most trusted RO water purifier service. Certified technicians, genuine spare parts, same-day doorstep service and Annual Maintenance Contracts.',
  locale: 'en_IN',
} as const;

export const CONTACT = {
  // TODO(owner): replace with the real business number before launch.
  phone: '+91 99999 99999',
  phoneHref: 'tel:+919999999999',
  whatsapp: '919999999999',
  whatsappHref: 'https://wa.me/919999999999',
  email: 'rocareindia123@gmail.com',
  emailHref: 'mailto:rocareindia123@gmail.com',
  hours: 'Mon–Sun: 8:00 AM – 9:00 PM',
  serviceArea: 'Across India · 19,000+ PIN codes',
} as const;

/** Hero trust badges (PRD Part 3). */
export const HERO_FEATURES = [
  { id: 'verified', label: 'Background-verified technicians', icon: 'shield' },
  { id: 'genuine', label: 'Genuine spare parts', icon: 'certificate' },
  { id: 'experience', label: '13+ years of expertise', icon: 'clock' },
  { id: 'support', label: '24×7 customer support', icon: 'headset' },
  { id: 'coverage', label: '19,000+ PIN codes served', icon: 'pin' },
] as const;

/** Company proof points (count-up stats). */
export const TRUST_STATS = [
  { id: 'years', value: 13, suffix: '+', label: 'Years Experience' },
  { id: 'customers', value: 1_000_000, suffix: '+', label: 'Customers Served' },
  { id: 'pincodes', value: 19_000, suffix: '+', label: 'PIN Codes' },
  { id: 'satisfaction', value: 98, suffix: '%', label: 'Customer Satisfaction' },
] as const;
