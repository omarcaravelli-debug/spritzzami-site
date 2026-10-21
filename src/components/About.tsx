import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { events, pastEvents } from '../data/events';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setValue(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

const PHOTOS_TOTAL = events.reduce((n, e) => n + e.photos.length, 0);

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const serate = useCountUp(pastEvents.length, inView);
  const foto = useCountUp(PHOTOS_TOTAL, inView);
  const spritz = useCountUp(12847, inView);

  return (
    <section
      id="chi-siamo"
      className="flex flex-col justify-center border-t-2 border-line px-4 py-16 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="03" kicker="Chi siamo" title="Otto tentacoli, un solo spritz" />

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-white">
              <p>
                Spritzzami è nato una sera sui Navigli: troppi spritz, pochi posti che
                li fanno come si deve. Così abbiamo iniziato a farli noi.
              </p>
              <p>
                Una serata, un quartiere, un locale diverso. Noi portiamo banco e
                musica, voi portate gli amici.
              </p>
              <p className="text-white/80">
                Vuoi la serata nel tuo locale o a una festa privata? Scrivici sotto.
              </p>
            </div>

            <div ref={ref} className="mt-10 grid grid-cols-3 gap-3 sm:mt-12 sm:gap-6">
              {[
                { value: serate, label: 'serate fatte', suffix: '' },
                { value: spritz, label: 'spritz versati*', suffix: '+' },
                { value: foto, label: 'foto in archivio', suffix: '' },
              ].map((s) => (
                <div key={s.label} className="border-t-2 border-white pt-3 sm:pt-4">
                  <div className="font-display text-3xl text-white sm:text-5xl lg:text-6xl tracking-wide">
                    {s.value.toLocaleString('it-IT')}
                    {s.suffix}
                  </div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-white/80 sm:mt-2 sm:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] text-white/70">
              * stima generosa ma non troppo
            </p>
          </Reveal>

          {/* il polpo in cornice, come una foto appuntata */}
          <Reveal delay={0.15}>
            <figure className="mx-auto max-w-xs -rotate-3 bg-white p-3 pb-12 shadow-[10px_10px_0_rgba(0,0,0,0.2)]">
              <div className="bg-[#ff5c00]/10 p-6">
                <img src="/logo.png" alt="Il polpo Spritzzami" className="w-full" />
              </div>
              <figcaption className="mt-3 text-center font-mono text-xs font-bold uppercase tracking-widest text-[#ff5c00]">
                Il boss, in persona
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
