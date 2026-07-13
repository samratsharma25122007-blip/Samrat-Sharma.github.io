import { HERO_STATS } from '@/config/site';
import { GlassPanel } from '@/components/ui/glass-panel';

/** Small outline icons for each stat (concept artwork bottom strip). */
const STAT_ICONS: Record<string, React.ReactNode> = {
  impurity: <path d="M12 3.5c3 3.6 5.5 6.6 5.5 9.6a5.5 5.5 0 0 1-11 0c0-3 2.5-6 5.5-9.6Z" />,
  mineral: <path d="M3 12c3-2 6-2 9 0s6 2 9 0M3 16c3-2 6-2 9 0s6 2 9 0" />,
  safe: <path d="M12 3.5 5.5 6v5c0 4 2.8 7 6.5 8.5 3.7-1.5 6.5-4.5 6.5-8.5V6L12 3.5Zm-1.2 9 1 1.8 2.6-3.4" />,
  families: <path d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 19c0-2.5 2.2-4 5-4s5 1.5 5 4m1-4c2.4.2 4 1.6 4 4" />,
};

/**
 * StatsBar — the floating glass metrics strip beneath the RO (concept artwork):
 * impurity removal, mineral retention, safe water and happy families.
 */
export function StatsBar() {
  return (
    <GlassPanel tone="dark" data-ui className="flex w-full max-w-3xl items-center px-16 py-16">
      <ul className="flex w-full items-center justify-between">
        {HERO_STATS.map((stat, i) => (
          <li
            key={stat.id}
            className="flex items-center gap-12 px-16"
            style={i > 0 ? { borderLeft: '1px solid rgba(255,255,255,0.18)' } : undefined}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-28 w-28 shrink-0 stroke-water"
              fill="none"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {STAT_ICONS[stat.id]}
            </svg>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[20px] font-semibold text-white">{stat.value}</span>
              <span className="text-[12px] text-white/70">{stat.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}
