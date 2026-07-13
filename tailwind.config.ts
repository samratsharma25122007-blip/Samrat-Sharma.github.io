import type { Config } from 'tailwindcss';

import { COLORS, GLASS, GRADIENTS, RADIUS, SHADOWS, TYPOGRAPHY } from './src/config/design-tokens';
import { EASING_CSS } from './src/config/motion';

/**
 * Full px-based spacing scale (0–400 in 1px steps) plus a 1px `px` step.
 * Numeric utilities therefore mean exactly N pixels (p-20 = 20px), which keeps
 * the design-token rhythm (8/16/24/32/48/64/96/128/160/192) available while
 * avoiding accidental rem fallbacks for in-between values.
 */
const spacingScale: Record<string, string> = { px: '1px' };
for (let i = 0; i <= 400; i += 1) {
  spacingScale[i] = `${i}px`;
}

/**
 * Tailwind is configured purely from the design tokens (single source of truth).
 * No arbitrary values live here — everything derives from src/config.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { primary: COLORS.bgPrimary, secondary: COLORS.bgSecondary },
        // Water blues
        ocean: COLORS.oceanBlue,
        lagoon: COLORS.lagoonBlue,
        water: COLORS.lagoonBlue,
        crystal: COLORS.crystalWater,
        deep: COLORS.deepOcean,
        // Warmth & nature
        gold: COLORS.sunlightGold,
        sand: COLORS.warmSand,
        palm: COLORS.palmGreen,
        leaf: COLORS.leafHighlight,
        // Neutrals & dark
        mist: COLORS.lightMist,
        navy: COLORS.deepNavy,
        shadow: COLORS.oceanShadow,
        // Semantic
        success: COLORS.success,
        danger: COLORS.danger,
        ink: {
          DEFAULT: COLORS.textPrimary,
          soft: COLORS.textSecondary,
          muted: COLORS.textSecondary,
        },
        glass: { DEFAULT: GLASS.background, border: GLASS.border, highlight: GLASS.highlight },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // Headings use Playfair Display (serif) per the concept artwork.
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      fontSize: {
        hero: [TYPOGRAPHY.hero.size, { lineHeight: TYPOGRAPHY.hero.leading, letterSpacing: TYPOGRAPHY.hero.tracking, fontWeight: TYPOGRAPHY.hero.weight }],
        section: [TYPOGRAPHY.section.size, { lineHeight: TYPOGRAPHY.section.leading, letterSpacing: TYPOGRAPHY.section.tracking, fontWeight: TYPOGRAPHY.section.weight }],
        sub: [TYPOGRAPHY.sub.size, { lineHeight: TYPOGRAPHY.sub.leading, letterSpacing: TYPOGRAPHY.sub.tracking, fontWeight: TYPOGRAPHY.sub.weight }],
        body: [TYPOGRAPHY.body.size, { lineHeight: TYPOGRAPHY.body.leading }],
        small: [TYPOGRAPHY.small.size, { lineHeight: TYPOGRAPHY.small.leading }],
      },
      spacing: spacingScale,
      borderRadius: {
        sm: RADIUS.sm,
        md: RADIUS.md,
        lg: RADIUS.lg,
        floating: RADIUS.floating,
      },
      boxShadow: {
        soft: SHADOWS.sm,
        medium: SHADOWS.md,
        large: SHADOWS.lg,
        glow: SHADOWS.glow,
      },
      backdropBlur: {
        glass: GLASS.blur,
      },
      backgroundImage: {
        'gradient-ambient': GRADIENTS.ambient,
        'gradient-water': GRADIENTS.water,
        'gradient-ocean': GRADIENTS.ocean,
        'gradient-lagoon': GRADIENTS.lagoon,
        'gradient-sun': GRADIENTS.sunGlow,
        'gradient-beach': GRADIENTS.beach,
        'gradient-sheen': GRADIENTS.sheen,
      },
      transitionTimingFunction: {
        primary: EASING_CSS.primary,
        secondary: EASING_CSS.secondary,
        bounce: EASING_CSS.bounce,
      },
      maxWidth: {
        frame: '1440px',
        content: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
