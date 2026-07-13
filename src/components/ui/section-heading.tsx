/**
 * SectionHeading — consistent centered section header (eyebrow + serif title +
 * optional lead) used across the content pages.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mx-auto mb-64 max-w-[640px] text-center">
      <p className="text-small font-semibold uppercase tracking-[0.25em] text-ocean">{eyebrow}</p>
      <h2 className="mt-12 font-display text-sub text-ink md:text-[40px]">{title}</h2>
      {lead && <p className="mt-16 text-body text-ink-soft">{lead}</p>}
    </div>
  );
}
