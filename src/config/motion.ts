/**
 * Motion Config — the single source of truth for the Motion Design Bible (PRD Part 7).
 *
 * Every easing curve and duration used anywhere in the experience is defined here
 * so the whole site animates in one coherent rhythm. GSAP, Framer/CSS and the
 * Three.js camera rig all pull from these constants.
 */

/** Signature easing curves (cubic-bezier control points). */
export const EASING = {
  /** Primary — used almost everywhere. */
  primary: [0.22, 0.61, 0.36, 1] as const,
  /** Secondary — deep, expressive ease-out. */
  secondary: [0.16, 1, 0.3, 1] as const,
  /** Bounce — gentle overshoot for playful accents. */
  bounce: [0.34, 1.56, 0.64, 1] as const,
} as const;

/** CSS-string forms of the easing curves. */
export const EASING_CSS = {
  primary: `cubic-bezier(${EASING.primary.join(',')})`,
  secondary: `cubic-bezier(${EASING.secondary.join(',')})`,
  bounce: `cubic-bezier(${EASING.bounce.join(',')})`,
} as const;

/** GSAP-string forms (GSAP wants "x,y,z,w" inside CustomEase-like power, so we pass raw). */
export const EASING_GSAP = EASING_CSS;

/** Duration ladder (seconds — GSAP native unit). */
export const DURATION = {
  tiny: 0.15,
  buttonHover: 0.22,
  cardHover: 0.35,
  sectionReveal: 0.8,
  premium: 0.7,
  heroIntro: 4.5,
  camera: 1.8,
  environment: 2.5,
  sceneTransition: 1.8,
} as const;

/** Duration ladder in milliseconds (for CSS / Web Animations). */
export const DURATION_MS = Object.fromEntries(
  Object.entries(DURATION).map(([key, value]) => [key, value * 1000]),
) as Record<keyof typeof DURATION, number>;

/**
 * Hero page-load choreography (PRD Part 7) — absolute start times in seconds.
 * Nothing appears together; everything is staggered.
 */
export const LOAD_TIMELINE = {
  ambienceStart: 0.2,
  sky: 0.5,
  ocean: 0.9,
  palms: 1.4,
  sunlight: 1.8,
  particles: 2.2,
  pedestal: 2.6,
  cameraDolly: 3.2,
  headline: 3.6,
  subheadline: 3.9,
  icons: 4.2,
  button: 4.5,
} as const;

/** Word-by-word headline reveal (PRD Part 10 refinement). */
export const HEADLINE = {
  translateY: 20,
  rotate: 2,
  duration: 0.9,
  stagger: 0.1,
} as const;

/** Subheadline reveal. */
export const SUBHEADLINE = {
  translateY: 18,
  delay: 0.4,
} as const;

/**
 * Layered parallax response (fraction of pointer travel), PRD Part 10.
 * Depth-ordered: sky is furthest (least movement), foreground UI moves most.
 */
export const PARALLAX = {
  sky: 0.01,
  clouds: 0.02,
  mountains: 0.03,
  trees: 0.05,
  ro: 0.08,
  text: 0.01,
  buttons: 0.02,
  cards: 0.04,
} as const;
