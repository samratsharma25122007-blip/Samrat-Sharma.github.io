import { createElement, type ElementType, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

interface GlassPanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Render as a different element (e.g. 'nav', 'aside'). Defaults to 'div'. */
  as?: ElementType;
  /** 'light' = frosted white glass; 'dark' = navy glass for white text. */
  tone?: 'light' | 'dark';
}

/**
 * GlassPanel — the shared frosted-glass surface behind every UI element
 * (PRD Part 11). Subtle blue-tinted blur, a bright hairline edge and a soft
 * shadow; never grey. Composed via the `.glass-surface` base plus a bright
 * top-edge highlight. Forwards arbitrary attributes (e.g. `data-ui`, `aria-*`).
 */
export function GlassPanel({
  children,
  className,
  as = 'div',
  tone = 'light',
  ...rest
}: GlassPanelProps) {
  return createElement(
    as,
    {
      className: cn(
        tone === 'dark' ? 'glass-dark' : 'glass-surface',
        'relative overflow-hidden rounded-lg',
        'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-sheen',
        className,
      ),
      ...rest,
    },
    children,
  );
}
