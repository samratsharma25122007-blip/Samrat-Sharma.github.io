import { create } from 'zustand';

import type { BookingStatus, QualityTier, SceneId, TimelineStage } from '@/types/experience';

/**
 * Experience Store — the shared world state for the entire cinematic journey.
 *
 * A single store keeps Hero, Digital Twin, Droplet and Booking in sync without
 * prop drilling. The 3D scene and the DOM overlay both subscribe here, which is
 * what lets the world feel continuous (PRD Parts 10 & 13).
 *
 * Keep this lean: high-frequency values (pointer position, per-frame ripple
 * buffers) live in refs inside the render loop, NOT here, to avoid re-renders.
 */
interface ExperienceState {
  /** Current narrative focus on the master timeline. */
  scene: SceneId;
  /** True once the loading sequence has fully completed. */
  hasLoaded: boolean;
  /** Digital-twin filter-health stage. */
  timelineStage: TimelineStage;
  /** RO health as a continuous 0 (new) → 1 (fully degraded) value. */
  roHealth: number;
  /** Active graphics preset. */
  quality: QualityTier;
  /** Whether the user has enabled ambient audio (off by default, PRD Part 12). */
  audioEnabled: boolean;
  /**
   * True once the photoreal hero background image has loaded. When true the 3D
   * layer renders only the interactive RO (composited over the image); when
   * false it renders the full procedural scene as a graceful fallback.
   */
  heroImageLoaded: boolean;
  /** Booking submission lifecycle. */
  bookingStatus: BookingStatus;

  setScene: (scene: SceneId) => void;
  setHasLoaded: (loaded: boolean) => void;
  setTimelineStage: (stage: TimelineStage) => void;
  setRoHealth: (health: number) => void;
  setQuality: (quality: QualityTier) => void;
  toggleAudio: () => void;
  setHeroImageLoaded: (loaded: boolean) => void;
  setBookingStatus: (status: BookingStatus) => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  scene: 'loading',
  hasLoaded: false,
  timelineStage: 'day1',
  roHealth: 0,
  quality: 'adaptive',
  audioEnabled: false,
  heroImageLoaded: false,
  bookingStatus: 'idle',

  setScene: (scene) => set({ scene }),
  setHasLoaded: (hasLoaded) => set({ hasLoaded }),
  setTimelineStage: (timelineStage) => set({ timelineStage }),
  setRoHealth: (roHealth) => set({ roHealth: Math.min(1, Math.max(0, roHealth)) }),
  setQuality: (quality) => set({ quality }),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  setHeroImageLoaded: (heroImageLoaded) => set({ heroImageLoaded }),
  setBookingStatus: (bookingStatus) => set({ bookingStatus }),
}));
