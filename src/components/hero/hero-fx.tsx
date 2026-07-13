/**
 * HeroFX — subtle "living" overlays on the photoreal image (PRD Part 10):
 * a breathing sun-glow near the scene's light source and a few drifting light
 * motes. Purely decorative (aria-hidden) and CSS-driven, so it costs almost
 * nothing and honors reduced-motion via the global media query.
 *
 * Mote positions are a fixed set (no Math.random) to avoid hydration mismatch.
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

export function HeroFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {/* Sun-glow near the scene's light source (upper-right). */}
      <div
        className="hero-sun-glow absolute h-[520px] w-[520px] rounded-full"
        style={{ right: '-4%', top: '2%' }}
      />
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
