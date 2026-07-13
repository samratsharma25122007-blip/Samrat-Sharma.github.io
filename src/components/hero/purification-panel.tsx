'use client';

import { useState } from 'react';

import { PURIFICATION_STAGES } from '@/config/site';
import { cn } from '@/lib/utils/cn';
import { GlassPanel } from '@/components/ui/glass-panel';

/**
 * PurificationPanel — the "Our 7-Stage Purification" glass panel (concept
 * artwork, right). Each stage is hoverable/selectable; the active stage is
 * highlighted with a filled blue index. This maps to the Digital-Twin filter
 * stages (PRD Part 4) and will drive the 3D model in a later phase.
 */
export function PurificationPanel() {
  const [active, setActive] = useState(0);

  return (
    <GlassPanel
      as="aside"
      tone="dark"
      data-ui
      className="w-[320px] p-20"
      aria-label="Our 7-stage purification"
    >
      <h2 className="mb-12 font-display text-[20px] font-semibold text-white">
        Our 7-Stage Purification
      </h2>
      <ul className="flex flex-col">
        {PURIFICATION_STAGES.map((stage, i) => {
          const isActive = i === active;
          return (
            <li key={stage.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  'flex w-full items-center gap-12 rounded-md px-10 py-7 text-left transition-colors duration-200 ease-primary',
                  isActive ? 'bg-white/15' : 'hover:bg-white/10',
                )}
              >
                <span
                  className={cn(
                    'flex h-36 w-36 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold transition-colors duration-200',
                    isActive ? 'bg-gradient-ocean text-white' : 'bg-white/15 text-white/80',
                  )}
                >
                  {stage.id}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-small font-semibold leading-tight text-white">
                    {stage.name}
                  </span>
                  <span className="text-[12px] leading-tight text-white/70">{stage.detail}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </GlassPanel>
  );
}
