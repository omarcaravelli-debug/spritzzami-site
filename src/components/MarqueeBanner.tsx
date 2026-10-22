import { useEffect, useRef } from 'react';

const PHRASE = 'STREET SPRITZ HOUSE REPEAT';
const REPEAT_COUNT = 8;
/** Pixel al secondo – velocità di scorrimento costante */
const SPEED_PX_PER_SEC = 60;

export default function MarqueeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: REPEAT_COUNT }, (_, i) => i);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let rafId = 0;
    const setDuration = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const firstGroup = track.firstElementChild as HTMLElement | null;
        if (!firstGroup) return;
        const groupWidth = firstGroup.offsetWidth;
        const duration = groupWidth / SPEED_PX_PER_SEC;
        track.style.animationDuration = `${duration}s`;
      });
    };

    setDuration();

    // Ricalcola su resize o cambio orientamento
    window.addEventListener('resize', setDuration, { passive: true });
    window.addEventListener('orientationchange', setDuration, { passive: true });

    // Pausa l'animazione quando il banner non è visibile nella viewport (risparmio CPU/batteria)
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        },
        { threshold: 0 }
      );
      observer.observe(container);
    }

    // Riavvia l'animazione quando il tab torna visibile dopo standby/background
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && track) {
        track.style.animationName = 'none';
        void track.offsetWidth;
        track.style.animationName = '';
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', setDuration);
      window.removeEventListener('orientationchange', setDuration);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer?.disconnect();
    };
  }, []);

  const groupClasses =
    'flex shrink-0 items-center gap-4 pr-4 font-display text-xl tracking-[0.18em] text-[#ff5c00] ' +
    'sm:text-3xl sm:gap-8 sm:pr-8 sm:tracking-[0.22em]';

  return (
    <div
      ref={containerRef}
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
                loading="lazy"
                decoding="async"
                width={32}
                height={32}
                className="h-5 w-auto shrink-0 object-contain sm:h-8"
              />
            </span>
          ))}
        </div>

        {/* Secondo gruppo identico per loop continuo senza scatti */}
        <div aria-hidden="true" className={groupClasses}>
          {items.map((i) => (
            <span key={`b-${i}`} className="flex items-center gap-4 sm:gap-8 whitespace-nowrap">
              <span>{PHRASE}</span>
              <img
                src="/tentacolo.png"
                alt=""
                aria-hidden="true"
                draggable={false}
                loading="lazy"
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
