import { useEffect, useRef } from 'react';

const PHRASE = 'STREET SPRITZ HOUSE REPEAT';
const REPEAT_COUNT = 8;
/** Pixel al secondo – più alto = più veloce */
const SPEED_PX_PER_SEC = 60;

export default function MarqueeBanner() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: REPEAT_COUNT }, (_, i) => i);

  /*
   * Calcola la durata dell'animazione in base alla larghezza reale del primo
   * gruppo, così il banner scorre sempre alla stessa velocità percepita
   * indipendentemente dalla viewport. Ricalcola su resize / orientamento.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setDuration = () => {
      const firstGroup = track.firstElementChild as HTMLElement | null;
      if (!firstGroup) return;
      const groupWidth = firstGroup.offsetWidth;
      const duration = groupWidth / SPEED_PX_PER_SEC;
      track.style.animationDuration = `${duration}s`;
    };

    setDuration();

    // Ricalcola su resize / cambio orientamento
    window.addEventListener('resize', setDuration);
    window.addEventListener('orientationchange', setDuration);

    // Riavvia l'animazione quando il tab torna visibile (fix freeze iOS/Android)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && track) {
        track.style.animationName = 'none';
        // Force reflow per riavviare l'animazione
        void track.offsetWidth;
        track.style.animationName = '';
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', setDuration);
      window.removeEventListener('orientationchange', setDuration);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const groupClasses =
    'flex shrink-0 items-center gap-4 pr-4 font-display text-xl tracking-[0.18em] text-[#ff5c00] ' +
    'sm:text-3xl sm:gap-8 sm:pr-8 sm:tracking-[0.22em]';

  return (
    <div
      role="region"
      aria-label="Street Spritz House Repeat ticker"
      className="relative z-10 w-full overflow-hidden border-y border-black/80 bg-black py-2 select-none sm:py-3.5"
    >
      <div
        ref={trackRef}
        className="marquee-track flex w-max items-center"
      >
        {/* Primo gruppo */}
        <div className={groupClasses}>
          {items.map((i) => (
            <span key={`a-${i}`} className="flex items-center gap-4 sm:gap-8 whitespace-nowrap">
              <span>{PHRASE}</span>
              <img
                src="/tentacolo.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                loading="eager"
                decoding="async"
                width={32}
                height={32}
                className="h-5 w-auto shrink-0 object-contain sm:h-8"
              />
            </span>
          ))}
        </div>

        {/* Secondo gruppo identico per loop infinito senza stacco */}
        <div aria-hidden="true" className={groupClasses}>
          {items.map((i) => (
            <span key={`b-${i}`} className="flex items-center gap-4 sm:gap-8 whitespace-nowrap">
              <span>{PHRASE}</span>
              <img
                src="/tentacolo.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                loading="eager"
                decoding="async"
                width={32}
                height={32}
                className="h-5 w-auto shrink-0 object-contain sm:h-8"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
