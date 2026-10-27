import { useState, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/** Data dell'evento Vol. 7 — Domenica 1 Novembre 2026, ore 19:00 CET */
const EVENT_DATE = new Date('2026-11-01T19:00:00+01:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const now = Date.now();
  const diff = EVENT_DATE.getTime() - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl tabular-nums text-white sm:text-6xl lg:text-7xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-white/60 sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

export default function UpcomingEvents() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const isLive = timeLeft === null;

  return (
    <section
      id="eventi"
      className="relative flex flex-col justify-center px-3 pt-20 pb-12 sm:px-8 sm:pt-24 sm:pb-20"
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
          index="01"
          kicker="Prossimo appuntamento"
          title="PROSSIMI EVENTI"
        />

        {/* Big Brutalist Teaser Box */}
        <Reveal>
          <div className="relative overflow-hidden rounded-lg border-2 border-white/30 bg-[#141414] p-4 text-white shadow-2xl sm:p-8 lg:p-12">
            {/* Header bar del teaser */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3 font-mono text-[11px] uppercase tracking-wider text-white/70 sm:mb-8 sm:pb-4 sm:text-xs sm:tracking-widest">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5c00] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff5c00] sm:h-3 sm:w-3" />
                </span>
                <span className="font-bold text-[#ff5c00]">
                  {isLive ? 'STATUS: LIVE NOW 🔥' : 'STATUS: CONFERMATO'}
                </span>
              </div>
              <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/80 sm:px-2.5 sm:py-1 sm:text-[11px]">
                VOLUME 07 · 1 NOV 2026
              </span>
            </div>

            <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
              <div>
                <h3 className="font-display text-4xl uppercase tracking-wider text-white sm:text-6xl lg:text-7xl leading-[0.95]">
                  RE{' '}
                  <span className="text-[#ff5c00]">MATTO</span>
                </h3>



                {/* Schede informative */}
                <div className="mt-6 grid grid-cols-2 gap-2 font-mono text-[11px] sm:mt-8 sm:gap-4 sm:text-sm">
                  <div className="rounded border border-white/15 bg-black/40 p-2.5 sm:p-4 backdrop-blur-sm">
                    <div className="text-[9px] uppercase tracking-wider text-white/50 sm:text-xs sm:tracking-widest">Location</div>
                    <div className="mt-1 flex items-center gap-1 font-bold tracking-wider text-white sm:gap-1.5">
                      RE MATTO CAFFÈ
                    </div>
                  </div>
                  <div className="rounded border border-white/15 bg-black/40 p-2.5 sm:p-4 backdrop-blur-sm">
                    <div className="text-[9px] uppercase tracking-wider text-white/50 sm:text-xs sm:tracking-widest">Data & Ora</div>
                    <div className="mt-1 flex items-center gap-1 font-bold tracking-wider text-[#ff5c00] sm:gap-1.5">
                      DOM 1 NOV · 19:00
                    </div>
                  </div>
                  <div className="rounded border border-white/15 bg-black/40 p-2.5 sm:p-4 backdrop-blur-sm">
                    <div className="text-[9px] uppercase tracking-wider text-white/50 sm:text-xs sm:tracking-widest">Indirizzo</div>
                    <div className="mt-1 flex items-center gap-1 font-bold tracking-wider text-white sm:gap-1.5">
                      VIA VOLTURNO 9, LODI
                    </div>
                  </div>
                  <div className="rounded border border-white/15 bg-black/40 p-2.5 sm:p-4 backdrop-blur-sm">
                    <div className="text-[9px] uppercase tracking-wider text-white/50 sm:text-xs sm:tracking-widest">Ingresso</div>
                    <div className="mt-1 flex items-center gap-1 font-bold tracking-wider text-white sm:gap-1.5">
                      FREE ENTRY
                    </div>
                  </div>
                </div>

                {/* Bottoni di azione */}
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                  <a
                    href="#contatti"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#ff5c00] transition-colors hover:bg-transparent hover:text-white sm:w-auto sm:text-sm"
                  >
                    <span>Proponi la tua location ↓</span>
                  </a>
                </div>
              </div>

              {/* Lato destro: Countdown */}
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-black/30 p-6 text-center sm:p-10">
                {isLive ? (
                  <>
                    <div className="mb-4 font-display text-4xl uppercase tracking-wider text-[#ff5c00] sm:text-5xl animate-pulse">
                      È ORA! 🎉
                    </div>
                    <p className="font-mono text-sm text-white/80">
                      La serata è iniziata — ci vediamo al Re Matto!
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 sm:text-xs">
                      Countdown al Vol. 07
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                      <CountdownUnit value={timeLeft.days} label="Giorni" />
                      <span className="font-display text-3xl text-white/30 sm:text-5xl">:</span>
                      <CountdownUnit value={timeLeft.hours} label="Ore" />
                      <span className="font-display text-3xl text-white/30 sm:text-5xl">:</span>
                      <CountdownUnit value={timeLeft.minutes} label="Min" />
                      <span className="font-display text-3xl text-white/30 sm:text-5xl">:</span>
                      <CountdownUnit value={timeLeft.seconds} label="Sec" />
                    </div>

                    <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-[#ff5c00]">
                      <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#ff5c00]" />
                      <span>Dom 1 Nov · 19:00 · Via Volturno 9, Lodi</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
