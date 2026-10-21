const PHRASE = 'STREET SPRITZ HOUSE REPEAT';
const REPEAT_COUNT = 8;

export default function MarqueeBanner() {
  const items = Array.from({ length: REPEAT_COUNT }, (_, i) => i);

  return (
    <div
      role="region"
      aria-label="Street Spritz House Repeat ticker"
      className="relative z-10 w-full overflow-hidden border-y border-black/80 bg-black py-2.5 select-none sm:py-3.5"
    >
      <div className="animate-spritz-marquee flex w-max items-center">
        {/* Primo gruppo */}
        <div className="flex shrink-0 items-center gap-6 pr-6 font-display text-2xl tracking-[0.22em] text-[#ff5c00] sm:text-3xl sm:gap-8 sm:pr-8">
          {items.map((i) => (
            <span key={`a-${i}`} className="flex items-center gap-6 sm:gap-8">
              <span>{PHRASE}</span>
              <img
                src="/tentacolo.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                className="h-6 w-auto shrink-0 object-contain sm:h-8"
              />
            </span>
          ))}
        </div>

        {/* Secondo gruppo identico per loop infinito senza scatti */}
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center gap-6 pr-6 font-display text-2xl tracking-[0.22em] text-[#ff5c00] sm:text-3xl sm:gap-8 sm:pr-8"
        >
          {items.map((i) => (
            <span key={`b-${i}`} className="flex items-center gap-6 sm:gap-8">
              <span>{PHRASE}</span>
              <img
                src="/tentacolo.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                className="h-6 w-auto shrink-0 object-contain sm:h-8"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
