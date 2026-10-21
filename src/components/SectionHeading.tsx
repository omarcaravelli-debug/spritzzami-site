import Reveal from './Reveal';

export default function SectionHeading({
  index,
  kicker,
  title,
  sub,
}: {
  index: string;
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mb-8 sm:mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/80">
        {index} / {kicker}
      </p>
      <h2 className="mt-2 font-display text-4xl uppercase tracking-wider leading-[0.95] text-white sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {sub && <p className="mt-3 max-w-lg text-sm text-white/90 sm:text-base">{sub}</p>}
    </Reveal>
  );
}
