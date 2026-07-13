import { CONTACT } from '@/config/site';
import { Reveal } from '@/components/cinematic/reveal';
import { WaterButton } from '@/components/ui/water-button';

const WHATSAPP_BOOK = `${CONTACT.whatsappHref}?text=${encodeURIComponent(
  'Hi RO Care India, I would like to book a service.',
)}`;

/**
 * CinematicStory — the homepage as one continuous, minimal scroll story. The
 * living 3D world + RO sit fixed behind (SceneLayer); each chapter floats one
 * idea in oversized type and reveals gently on scroll. Almost no body copy —
 * the visuals carry the narrative.
 */
export function CinematicStory() {
  return (
    <>
      {/* Chapter 1 — Hero */}
      <section
        id="story"
        aria-label="Introduction"
        className="relative flex min-h-[100svh] flex-col justify-end px-24 pb-96 md:px-64"
      >
        <div className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-t from-deep/45 via-transparent to-deep/15" />
        <Reveal>
          <p className="mb-16 text-small font-medium uppercase tracking-[0.4em] text-white/80">
            Water Gives Life
          </p>
          <h1 className="max-w-[12ch] font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.92] tracking-tight text-white drop-shadow-[0_4px_40px_rgba(8,36,62,0.5)]">
            Pure Water. Protected Life.
          </h1>
          <div className="mt-40 flex flex-wrap items-center gap-24">
            <WaterButton href={WHATSAPP_BOOK} external>
              Book Service
            </WaterButton>
            <span className="text-small text-white/70">Drag the purifier to explore ↻</span>
          </div>
        </Reveal>
      </section>

      {/* Chapter 2 — Philosophy */}
      <ChapterLine align="center" eyebrow="The Philosophy">
        Every drop,
        <br />
        perfected.
      </ChapterLine>

      {/* Chapter 3 — Technology */}
      <section className="relative flex min-h-[100svh] flex-col items-end justify-center px-24 text-right md:px-64">
        <Reveal>
          <p className="mb-16 text-small font-medium uppercase tracking-[0.4em] text-white/80">
            The Technology
          </p>
          <h2 className="max-w-[14ch] font-display text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[0.95] text-white drop-shadow-[0_4px_40px_rgba(8,36,62,0.5)]">
            Seven stages. Zero compromise.
          </h2>
          <a
            href="/technology/"
            className="mt-32 inline-block border-b border-white/50 pb-4 text-body text-white/90 transition-colors hover:border-white hover:text-white"
          >
            Explore the technology →
          </a>
        </Reveal>
      </section>

      {/* Chapter 4 — Trust */}
      <ChapterLine align="left" eyebrow="Trusted Across India">
        A million homes.
        <br />
        Thirteen years.
      </ChapterLine>

      {/* Chapter 5 — Closing CTA */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-24 text-center">
        <div className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-b from-transparent to-deep/50" />
        <Reveal>
          <h2 className="max-w-[16ch] font-display text-[clamp(2.6rem,8vw,6rem)] font-bold leading-[0.95] text-white drop-shadow-[0_4px_40px_rgba(8,36,62,0.5)]">
            Ready when you are.
          </h2>
          <div className="mt-40 flex flex-wrap justify-center gap-16">
            <WaterButton href={WHATSAPP_BOOK} external>
              Book Service
            </WaterButton>
            <WaterButton href={CONTACT.phoneHref} variant="glass">
              Call {CONTACT.phone}
            </WaterButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/** A single massive line chapter with a small eyebrow. */
function ChapterLine({
  children,
  eyebrow,
  align,
}: {
  children: React.ReactNode;
  eyebrow: string;
  align: 'left' | 'center';
}) {
  return (
    <section
      className={`relative flex min-h-[100svh] flex-col justify-center px-24 md:px-64 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <Reveal>
        <p className="mb-16 text-small font-medium uppercase tracking-[0.4em] text-white/80">
          {eyebrow}
        </p>
        <p className="font-display text-[clamp(2.4rem,8vw,6rem)] font-bold leading-[0.95] text-white drop-shadow-[0_4px_40px_rgba(8,36,62,0.5)]">
          {children}
        </p>
      </Reveal>
    </section>
  );
}
