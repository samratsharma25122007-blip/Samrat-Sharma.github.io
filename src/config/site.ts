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

/** Minimal cinematic nav — only a few items float in the glass capsule. */
export const CINEMATIC_NAV = [
  { id: 'story', label: 'Story', href: '#story' },
  { id: 'technology', label: 'Technology', href: '/technology/' },
  { id: 'service', label: 'Service', href: '/service/' },
  { id: 'contact', label: 'Contact', href: '/contact/' },
] as const;

/** Primary navigation (concept artwork) — real routes. */
export const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'technology', label: 'Our Technology', href: '/technology/' },
  { id: 'purification', label: 'Water Purification', href: '/water-purification/' },
  { id: 'service', label: 'Service', href: '/service/' },
  { id: 'about', label: 'About Us', href: '/about/' },
  { id: 'contact', label: 'Contact', href: '/contact/' },
] as const;

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

/** Hero inline highlights — matches the concept artwork's three feature marks. */
export const HERO_HIGHLIGHTS = [
  { id: 'advanced', label: 'Advanced Purification', icon: 'droplet' },
  { id: 'mineral', label: 'Mineral Retention', icon: 'leaf' },
  { id: 'safe', label: '100% Safe & Reliable', icon: 'shield' },
] as const;

/** Hero stats bar — matches the concept artwork's bottom metric strip. */
export const HERO_STATS = [
  { id: 'impurity', value: '99.9%', label: 'Impurity Removal' },
  { id: 'mineral', value: 'Mineral', label: 'Retention' },
  { id: 'safe', value: '100%', label: 'Safe Water' },
  { id: 'families', value: '1M+', label: 'Happy Families' },
] as const;

/** The 7-stage purification pipeline (concept artwork right panel / Digital Twin). */
export const PURIFICATION_STAGES = [
  { id: '01', name: 'Sediment Filter', detail: 'Removes dust, sand & particles' },
  { id: '02', name: 'Pre-Carbon Filter', detail: 'Reduces chlorine & impurities' },
  { id: '03', name: 'RO Membrane', detail: 'Removes dissolved salts & chemicals' },
  { id: '04', name: 'Post Carbon Filter', detail: 'Enhances taste & removes odor' },
  { id: '05', name: 'Mineral Cartridge', detail: 'Retains essential minerals' },
  { id: '06', name: 'UV Purification', detail: 'Kills bacteria & viruses' },
  { id: '07', name: 'TDS Controller', detail: 'Balances TDS for better health' },
] as const;

/** Company proof / trust badges. */
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
