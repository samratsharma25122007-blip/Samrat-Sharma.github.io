/**
 * ScrollIndicator — a droplet-in-mouse cue that invites exploration
 * (concept artwork, bottom-right; PRD Part 11). Gentle bounce; hidden from
 * assistive tech as it is decorative.
 */
export function ScrollIndicator() {
  return (
    <div data-ui className="flex flex-col items-center gap-8 text-white/70" aria-hidden>
      <span className="flex h-40 w-24 items-start justify-center rounded-full border border-white/50 p-4">
        <span className="h-8 w-4 animate-bounce rounded-full bg-water" />
      </span>
      <span className="text-[12px] tracking-wide">Scroll to explore</span>
    </div>
  );
}
