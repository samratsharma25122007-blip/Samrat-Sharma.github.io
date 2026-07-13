/**
 * Design Tokens — the single source of truth for the RO Care India visual system.
 *
 * Every color, spacing step, radius, shadow and typographic value defined in the
 * Design Language (PRD Part 2) lives here. Tailwind, the DOM components and the
 * Three.js scene all consume these values so the entire experience stays in one
 * rhythm. Never hardcode a raw hex or pixel value elsewhere — import from here.
 */

/** Brand color palette. Never pure white (#FFF) or pure black (#000). */
export const COLORS = {
  // Backgrounds
  bgPrimary: '#F8FCFF',
  bgSecondary: '#F3FAFD',

  // Water / brand blues
  oceanBlue: '#1597FF',
  lightWaterBlue: '#77D7FF',
  crystalCyan: '#DFF8FF',
  skyGradient: '#DDF7FF',
  deepOcean: '#0057C8',
  accent: '#00AEEF',

  // Semantic
  success: '#39C97C',
  danger: '#FF6464',

  // Text
  textPrimary: '#0A1B2B',
  textSecondary: '#4F6778',
  textMuted: '#93A6B5',
} as const;

/** Translucent glass surfaces. */
export const GLASS = {
  background: 'rgba(255, 255, 255, 0.18)',
  border: 'rgba(255, 255, 255, 0.25)',
  blur: '30px',
} as const;

/** Signature gradients from the design language. */
export const GRADIENTS = {
  /** Crystal → primary background (ambient wash). */
  ambient: `linear-gradient(180deg, ${COLORS.crystalCyan} 0%, ${COLORS.bgPrimary} 100%)`,
  /** Light water → ocean (primary CTA / accents). */
  water: `linear-gradient(135deg, ${COLORS.lightWaterBlue} 0%, ${COLORS.oceanBlue} 100%)`,
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

/** Ultra-soft shadow system — nothing harsh. */
export const SHADOWS = {
  sm: '0 10px 30px rgba(0, 0, 0, 0.05)',
  md: '0 20px 60px rgba(0, 0, 0, 0.08)',
  lg: '0 40px 100px rgba(0, 0, 0, 0.12)',
  glow: `0 20px 60px rgba(21, 151, 255, 0.28)`,
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
