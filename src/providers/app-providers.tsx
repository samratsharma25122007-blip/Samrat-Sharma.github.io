'use client';

import { type ReactNode } from 'react';

import { SmoothScrollProvider } from '@/providers/smooth-scroll-provider';
import { useQualityTier } from '@/lib/hooks/use-quality-tier';

/**
 * AppProviders — composes all client-side providers in one place so the root
 * layout stays declarative. Add future contexts (audio, settings) here.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  // Resolve the graphics tier as early as possible (adaptive → concrete).
  useQualityTier();

  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
