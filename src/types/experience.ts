/**
 * Shared experience types — the vocabulary of the cinematic world.
 */

/** Graphics quality presets (PRD Part 12). */
export type QualityTier = 'ultra' | 'high' | 'balanced' | 'adaptive';

/**
 * Ordered scenes of the single master timeline (PRD Parts 10 & 13).
 * The whole site is one continuous world; this enum tracks narrative focus,
 * not separate pages.
 */
export type SceneId =
  | 'loading'
  | 'hero'
  | 'digital-twin'
  | 'droplet'
  | 'booking'
  | 'success'
  | 'finale';

/** Filter-health timeline stages of the Digital Twin (PRD Part 4). */
export type TimelineStage = 'day1' | 'day30' | 'day90' | 'day180' | 'day365';

/** Booking submission lifecycle. */
export type BookingStatus = 'idle' | 'submitting' | 'success' | 'error';

/** A single ripple impulse fed into the Water Memory System (PRD Part 12). */
export interface RippleImpulse {
  /** Normalized x in [0,1] across the water surface. */
  x: number;
  /** Normalized y in [0,1] across the water surface. */
  y: number;
  /** Relative strength [0,1] — cursor is faint, droplet impact is strongest. */
  strength: number;
}
