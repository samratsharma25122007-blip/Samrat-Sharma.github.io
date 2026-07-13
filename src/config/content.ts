/**
 * Content — real RO-service copy for the sub-pages, kept data-driven so pages
 * stay consistent and easy to edit in one place.
 */

/** Our Technology — advantages of the 7-stage system. */
export const TECH_HIGHLIGHTS = [
  {
    id: 'ro',
    title: 'Reverse Osmosis',
    body: 'A high-pressure semi-permeable membrane strips out dissolved salts, heavy metals and chemicals down to 0.0001 microns.',
  },
  {
    id: 'uv',
    title: 'UV Sterilisation',
    body: 'Ultraviolet light neutralises bacteria, viruses and cysts without adding any chemicals to your water.',
  },
  {
    id: 'uf',
    title: 'UF Membrane',
    body: 'Ultrafiltration captures suspended particles and microbes, ideal even when input water pressure is low.',
  },
  {
    id: 'mineral',
    title: 'Mineral Guard',
    body: 'Essential minerals like calcium and magnesium are re-introduced, so purified water stays healthy and great-tasting.',
  },
  {
    id: 'tds',
    title: 'Smart TDS Control',
    body: 'A TDS controller balances the mineral level precisely for the healthiest, best-tasting output.',
  },
  {
    id: 'copper',
    title: 'Copper & Alkaline',
    body: 'Optional copper and alkaline cartridges add wellness benefits and gently raise the pH of your drinking water.',
  },
] as const;

/** Water Purification — what gets removed. */
export const CONTAMINANTS = [
  { id: 'salts', label: 'Dissolved salts & TDS' },
  { id: 'metals', label: 'Heavy metals (lead, arsenic, mercury)' },
  { id: 'bacteria', label: 'Bacteria & viruses' },
  { id: 'chlorine', label: 'Chlorine & bad odour' },
  { id: 'pesticides', label: 'Pesticides & nitrates' },
  { id: 'micro', label: 'Microplastics & sediment' },
] as const;

/** Water Purification — benefits retained. */
export const WATER_BENEFITS = [
  { id: 'minerals', title: 'Healthy Minerals', body: 'Calcium, magnesium and other essentials are retained for everyday wellness.' },
  { id: 'taste', title: 'Great Taste', body: 'Balanced TDS means clean, sweet-tasting water your family will actually enjoy.' },
  { id: 'safe', title: '100% Safe', body: 'Lab-grade multi-stage purification makes every glass safe for kids and elders.' },
] as const;

/** Service — what we offer. */
export const SERVICES = [
  { id: 'installation', icon: '🔧', title: 'RO Installation', body: 'Professional setup with proper mounting, plumbing and water-quality checks.' },
  { id: 'repair', icon: '🛠️', title: 'RO Repair', body: 'Same-day diagnosis and repair of leaks, low flow, motor and membrane faults.' },
  { id: 'filter', icon: '🔄', title: 'Filter Replacement', body: 'Genuine sediment, carbon and RO membrane replacement to keep water pure.' },
  { id: 'amc', icon: '📋', title: 'AMC Plans', body: 'Annual Maintenance Contracts with scheduled servicing and priority support.' },
  { id: 'testing', icon: '🧪', title: 'Water Testing', body: 'Free TDS and water-quality testing so you always know what you drink.' },
  { id: 'sales', icon: '💧', title: 'New RO Sales', body: 'Buy the right purifier for your water type at the best price with expert guidance.' },
] as const;

/** Service — AMC plan tiers. */
export const AMC_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹1,499',
    period: '/year',
    featured: false,
    features: [
      { text: '2 scheduled services', included: true },
      { text: 'Free service visits', included: true },
      { text: 'Labour charges included', included: true },
      { text: 'Spare parts extra', included: false },
      { text: 'Filters extra', included: false },
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '₹2,999',
    period: '/year',
    featured: true,
    features: [
      { text: '4 scheduled services', included: true },
      { text: 'Free service visits', included: true },
      { text: 'Labour charges included', included: true },
      { text: 'Sediment & carbon filters', included: true },
      { text: 'RO membrane extra', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹4,999',
    period: '/year',
    featured: false,
    features: [
      { text: '4 scheduled services', included: true },
      { text: 'Priority same-day support', included: true },
      { text: 'Labour charges included', included: true },
      { text: 'All filters included', included: true },
      { text: 'RO membrane included', included: true },
    ],
  },
] as const;

/** Why choose RO Care India. */
export const WHY_US = [
  'Certified & background-verified technicians',
  '100% genuine spare parts & filters',
  'Transparent pricing — no hidden charges',
  'Same-day & doorstep service',
  '30-day service warranty',
  'Support for all major RO brands',
] as const;

/** Brands serviced. */
export const BRANDS = [
  'Kent', 'Aquaguard', 'Pureit', 'Livpure', 'AO Smith', 'Blue Star',
  'Havells', 'Eureka Forbes', 'LG', 'Whirlpool', 'Faber', 'Others',
] as const;

/** Problem types for the contact form. */
export const PROBLEM_TYPES = [
  'RO Installation',
  'RO Repair',
  'Filter Replacement',
  'AMC Plan',
  'Water Testing',
  'New RO Purchase',
  'Other',
] as const;
