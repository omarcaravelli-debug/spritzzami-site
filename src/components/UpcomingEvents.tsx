import { useState, useEffect, useMemo } from 'react';
import { siteConfig } from '../config';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function UpcomingEvents() {
  // Prossimo evento: 14 Novembre 2026 alle 19:30
  const targetDate = useMemo(() => new Date('2026-11-14T19:30:00'), []);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      id="eventi"
      className="relative flex flex-col justify-center border-t-2 border-line px-4 py-16 sm:px-8 sm:py-24"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="02"
          kicker="Save the date"
          title="PROSSIMI EVENTI"
          sub="La prossima tappa del tour Spritzzami sta arrivando. Tieniti pronto."
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* ── Colonna Sinistra: Dettagli & Countdown in stile pixel/retro ── */}
          <Reveal className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-sm bg-black/40 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff5c00]" />
                <span>Next Round · Vol. 07</span>
              </div>

              <h3 className="mt-4 font-display text-5xl uppercase tracking-wider text-white sm:text-7xl lg:text-8xl leading-[0.9]">
                PROSSIMA
                <br />
                TAPPA
              </h3>

              <p className="mt-4 font-mono text-base uppercase tracking-wider text-white/90 sm:text-lg">
                STREET · SPRITZ · HOUSE · MUSIC
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-wider text-white/80 sm:text-sm">
                <span className="flex items-center gap-1.5 rounded bg-white/10 px-3 py-1.5 border border-white/20">
                  <span>📅</span> 14 NOVEMBRE 2026
                </span>
                <span className="flex items-center gap-1.5 rounded bg-white/10 px-3 py-1.5 border border-white/20">
                  <span>📍</span> LOCATION IN ARRIVO · LODI & DINTORNI
                </span>
              </div>
            </div>

            {/* Countdown boxes come da screenshot di riferimento */}
            <div className="mt-8 pt-4 sm:mt-10">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-white/70">
                Countdown all'evento
              </p>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg">
                {[
                  { value: pad(timeLeft.days), label: 'Giorni' },
                  { value: pad(timeLeft.hours), label: 'Ore' },
                  { value: pad(timeLeft.minutes), label: 'Min' },
                  { value: pad(timeLeft.seconds), label: 'Sec' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center rounded border border-white/25 bg-black/35 py-3 sm:py-5 backdrop-blur-sm shadow-inner"
                  >
                    <span className="font-display text-3xl text-white sm:text-5xl lg:text-6xl tracking-wider leading-none">
                      {item.value}
                    </span>
                    <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-white/70 sm:text-[11px]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Azioni */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm border-2 border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#ff5c00] transition-colors hover:bg-transparent hover:text-white sm:text-sm"
                >
                  Seguici su Instagram per la location ↗
                </a>
                <a
                  href="#contatti"
                  className="rounded-sm border border-white/60 px-5 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-[#ff5c00] sm:text-sm"
                >
                  Proponi il tuo locale ↓
                </a>
              </div>
            </div>
          </Reveal>

          {/* ── Colonna Destra: Poster card stile flyer/timeline ── */}
          <Reveal delay={0.15} className="flex">
            <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-md border-2 border-white/30 bg-[#141414] p-6 sm:p-8 text-white shadow-2xl">
              {/* Badge LIVE / SOON */}
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff5c00] animate-ping" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#ff5c00]">
                    LIVE / SOON
                  </span>
                </div>
                <span className="font-mono text-xs text-white/60">VOL. 07</span>
              </div>

              {/* Contenuto grafico centrale */}
              <div className="my-8 flex flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  <img
                    src="/tentacolo.png"
                    alt=""
                    className="h-32 w-auto object-contain sm:h-40 drop-shadow-[0_0_15px_rgba(255,92,0,0.5)]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl text-white/10 sm:text-7xl">07</span>
                  </div>
                </div>

                <div className="border border-[#ff5c00]/60 bg-[#ff5c00]/10 px-4 py-1.5 font-display text-2xl tracking-widest text-[#ff5c00] sm:text-3xl">
                  TIMELINE & LINEUP
                </div>
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-white/80">
                  Opening 19:30 · Aperitivo & Dj Set fino a tardi
                </p>
                <p className="mt-1 font-mono text-[11px] text-white/60">
                  Secret Guest B2B Resident · Drink & Spritz Corner
                </p>
              </div>

              {/* Footer della card flyer */}
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between font-mono text-xs uppercase text-white/75">
                  <span>Biglietti / Ingresso</span>
                  <span className="font-bold text-white">Ingresso Libero</span>
                </div>
                <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-white/50">
                  <span>Capienza limitata</span>
                  <span>Consumazione facoltativa</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
