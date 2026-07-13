/**
 * HeroFX — "living" overlays on the photoreal image (PRD Part 10): a breathing
 * sun-glow, drifting light motes, gliding birds and a water-shimmer band. Purely
 * decorative (aria-hidden), CSS-driven and reduced-motion aware.
 *
 * Note: overlays can only *add* motion on top of the still photo — the baked
 * palms/water can't be moved. For full scene motion (waves, swaying trees) use a
 * looping background video (see HeroBackground's video support).
 *
 * Positions are a fixed set (no Math.random) to avoid hydration mismatch.
 */
const MOTES = [
  { left: '18%', top: '68%', size: 6, duration: 14, delay: 0 },
  { left: '32%', top: '80%', size: 4, duration: 18, delay: 3 },
  { left: '46%', top: '74%', size: 5, duration: 16, delay: 6 },
  { left: '60%', top: '82%', size: 3, duration: 20, delay: 2 },
  { left: '72%', top: '70%', size: 5, duration: 15, delay: 8 },
  { left: '84%', top: '78%', size: 4, duration: 19, delay: 5 },
  { left: '26%', top: '60%', size: 3, duration: 22, delay: 10 },
  { left: '54%', top: '64%', size: 4, duration: 17, delay: 1 },
] as const;

const BIRDS = [
  { top: '16%', size: 34, duration: 26, delay: 0 },
  { top: '22%', size: 26, duration: 32, delay: 6 },
  { top: '12%', size: 30, duration: 29, delay: 13 },
  { top: '27%', size: 22, duration: 36, delay: 20 },
] as const;

function Bird({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 40 16"
      fill="none"
      stroke="rgba(30, 42, 56, 0.7)"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M2 11 Q10 2 20 10 Q30 2 38 11" />
    </svg>
  );
}

export function HeroFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {/* Sun-glow near the scene's light source (upper-right). */}
      <div
        className="hero-sun-glow absolute h-[520px] w-[520px] rounded-full"
        style={{ right: '-4%', top: '2%' }}
      />

      {/* Shimmering light bands over the water. */}
      <div className="hero-water-shimmer" />

      {/* Gliding birds. */}
      {BIRDS.map((bird, i) => (
        <div
          key={i}
          className="hero-bird"
          style={{
            top: bird.top,
            animationDuration: `${bird.duration}s`,
            animationDelay: `${bird.delay}s`,
          }}
        >
          <Bird size={bird.size} />
        </div>
      ))}

      {/* Drifting light motes. */}
      {MOTES.map((mote, i) => (
        <span
          key={i}
          className="hero-mote"
          style={{
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            animationDuration: `${mote.duration}s`,
            animationDelay: `${mote.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
