/**
 * Design Tokens — the single source of truth for the RO Care India visual system.
 *
 * COLORS follow the OFFICIAL tropical-luxury palette (PRD Part 11.5 + the
 * approved concept artwork, which is the ultimate visual authority). The
 * aesthetic is an untouched tropical island at 8:30 AM: ocean blues, golden
 * sunlight, palm greens, cream sand and pure-white cleanliness. Never neon,
 * never flat corporate blue. Tailwind, the DOM and the Three.js scene all
 * consume these values so the whole experience stays in one visual language.
 */

/** Official palette — every value traceable to the approved art direction. */
export const COLORS = {
  // Primary — water
  oceanBlue: '#1F6FBF',
  lagoonBlue: '#3CAEDB',
  crystalWater: '#82DDF5',
  deepOcean: '#0C3D72',

  // Accent — warmth & nature
  sunlightGold: '#F6D26B',
  warmSand: '#F3E4C6',
  palmGreen: '#3E8F57',
  leafHighlight: '#6BCB77',

  // Neutrals — cleanliness
  pureWhite: '#FFFFFF',
  softWhite: '#F8FBFD',
  lightMist: '#EEF7FB',

  // Dark — depth & ink
  deepNavy: '#08243E',
  oceanShadow: '#12395D',
  textPrimary: '#0F172A',
  textSecondary: '#506173',

  // Semantic states (on-brand, non-neon; success = palm green)
  success: '#3E8F57',
  danger: '#E4738B',

  // Semantic background aliases (large fills — never pure white)
  bgPrimary: '#F8FBFD',
  bgSecondary: '#EEF7FB',
} as const;

/**
 * Translucent glass — a subtle blue tint (never grey), bright thin edges, and
 * a highlight sheen. Glass must always read as if reflecting the ocean.
 */
export const GLASS = {
  background: 'rgba(240, 249, 255, 0.18)',
  border: 'rgba(255, 255, 255, 0.28)',
  highlight: 'rgba(255, 255, 255, 0.45)',
  blur: '30px',
} as const;

/**
 * Signature gradients from the art direction. Natural, physically believable —
 * no purple, no cyberpunk.
 */
export const GRADIENTS = {
  /** Ocean Blue → Lagoon Blue (primary CTA / water accents). */
  ocean: `linear-gradient(135deg, ${COLORS.oceanBlue} 0%, ${COLORS.lagoonBlue} 100%)`,
  /** Crystal Water → pale mist (shallow lagoon). */
  lagoon: `linear-gradient(180deg, ${COLORS.crystalWater} 0%, #D9F8FF 100%)`,
  /** Golden Sunrise (morning light glow / hover highlights). */
  sunGlow: `linear-gradient(180deg, ${COLORS.sunlightGold} 0%, #FFE9A6 100%)`,
  /** Warm Sand → cream (beach). */
  beach: `linear-gradient(180deg, ${COLORS.warmSand} 0%, #FFF7EB 100%)`,
  /** Soft ambient page wash (mist → cloud white). */
  ambient: `linear-gradient(180deg, ${COLORS.lightMist} 0%, ${COLORS.softWhite} 100%)`,
  /** Primary CTA alias. */
  water: `linear-gradient(135deg, ${COLORS.oceanBlue} 0%, ${COLORS.lagoonBlue} 100%)`,
  /** Transparent → soft white (glass sheen). */
  sheen: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 100%)',
} as const;

/**
 * Spacing scale (px). Everything follows this scale — no arbitrary values.
 * Keyed by the raw number for ergonomic Tailwind mapping.
 */
export const SPACING = {
  8: '8px',
  16: '16px',
  24: '24px',
  32: '32px',
  48: '48px',
  64: '64px',
  96: '96px',
  128: '128px',
  160: '160px',
  192: '192px',
} as const;

/** Corner radii. Never sharp corners. */
export const RADIUS = {
  sm: '12px',
  md: '20px',
  lg: '32px',
  floating: '40px',
  full: '9999px',
} as const;

/**
 * Ultra-soft shadow system — nothing harsh. Shadows carry a subtle blue tone
 * (Deep Navy #08243E), never pure black, per the art direction.
 */
export const SHADOWS = {
  sm: '0 10px 30px rgba(8, 36, 62, 0.06)',
  md: '0 20px 60px rgba(8, 36, 62, 0.10)',
  lg: '0 40px 100px rgba(8, 36, 62, 0.14)',
  glow: '0 20px 60px rgba(31, 111, 191, 0.30)',
} as const;

/** Typography scale (px + weight + tracking) from the design language. */
export const TYPOGRAPHY = {
  hero: { size: '72px', weight: 700, tracking: '-0.02em', leading: '0.9' },
  section: { size: '52px', weight: 700, tracking: '-0.01em', leading: '1.05' },
  sub: { size: '32px', weight: 600, tracking: '-0.01em', leading: '1.2' },
  body: { size: '18px', weight: 400, tracking: '0', leading: '1.6' },
  small: { size: '15px', weight: 400, tracking: '0', leading: '1.5' },
  button: { size: '16px', weight: 600, tracking: '0', leading: '1' },
} as const;

/** Layout constraints. */
export const LAYOUT = {
  maxWidth: '1440px',
  contentWidth: '1280px',
  columns: 12,
  sectionPadding: { desktop: '160px', mobile: '96px' },
} as const;

/**
 * Numeric color helpers for Three.js (hex → number). Three consumes numbers,
 * not CSS strings, so we expose a parallel numeric map derived from COLORS.
 */
export const COLORS_HEX = Object.fromEntries(
  Object.entries(COLORS).map(([key, value]) => [key, Number.parseInt(value.slice(1), 16)]),
) as Record<keyof typeof COLORS, number>;
