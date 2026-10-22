import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { siteConfig } from '../config';

export default function UpcomingEvents() {
  return (
    <section
      id="eventi"
      className="relative flex flex-col justify-center border-t-2 border-line px-3 py-12 sm:px-8 sm:py-20"
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
          kicker="Top Secret"
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
                <span className="font-bold text-[#ff5c00]">STATUS: IN PREPARAZIONE</span>
              </div>
              <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/80 sm:px-2.5 sm:py-1 sm:text-[11px]">
                VOLUME 07 · STAY TUNED
              </span>
            </div>

            <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
              <div>
                <h3 className="font-display text-4xl uppercase tracking-wider text-white sm:text-6xl lg:text-7xl leading-[0.95]">
                  WORK IN <br />
                  <span className="text-[#ff5c00]">PROGRESS</span>
                </h3>

                <p className="mt-4 max-w-xl font-body text-sm text-white/80 sm:mt-5 sm:text-lg">
                  Stiamo cucinando una nuova location per il prossimo round.
                </p>

                {/* Schede informative / Dettagli riservati */}
                <div className="mt-6 grid grid-cols-2 gap-2 font-mono text-[11px] sm:mt-8 sm:gap-4 sm:text-sm">
                  <div className="rounded border border-white/15 bg-black/40 p-2.5 sm:p-4 backdrop-blur-sm">
                    <div className="text-[9px] uppercase tracking-wider text-white/50 sm:text-xs sm:tracking-widest">Location</div>
                    <div className="mt-1 flex items-center gap-1 font-bold tracking-wider text-white sm:gap-1.5">
                      [TOP SECRET]
                    </div>
                  </div>
                  <div className="rounded border border-white/15 bg-black/40 p-2.5 sm:p-4 backdrop-blur-sm">
                    <div className="text-[9px] uppercase tracking-wider text-white/50 sm:text-xs sm:tracking-widest">Data & Ora</div>
                    <div className="mt-1 flex items-center gap-1 font-bold tracking-wider text-[#ff5c00] sm:gap-1.5">
                      IN ARRIVO A BREVE
                    </div>
                  </div>
                  <div className="rounded border border-white/15 bg-black/40 p-2.5 sm:p-4 backdrop-blur-sm">
                    <div className="text-[9px] uppercase tracking-wider text-white/50 sm:text-xs sm:tracking-widest">Line-up</div>
                    <div className="mt-1 flex items-center gap-1 font-bold tracking-wider text-white sm:gap-1.5">
                      SECRET GUESTS
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

              {/* Lato Grafico: tentacolo */}
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-black/30 p-8 text-center sm:p-12">
                <div className="relative mb-6 flex items-center justify-center">
                  <img
                    src="/tentacolo.png"
                    alt="Spritzzami in arrivo"
                    width={208}
                    height={208}
                    loading="lazy"
                    decoding="async"
                    className="h-40 w-auto object-contain opacity-90 drop-shadow-[0_0_25px_rgba(255,92,0,0.6)] sm:h-52"
                  />
                </div>

                <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                  Operazione Vol. 07
                </div>
                <p className="mt-2 font-mono text-xs text-white/80">
                  Gli annunci ufficiali verranno rilasciati prima sulle nostre storie IG.
                </p>

                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm border border-white/80 bg-white/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[#ff5c00] active:scale-95"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span>Avvisami su Instagram ↗</span>
                </a>
                <span className="mt-1.5 block font-mono text-[10px] text-white/60">
                  Tocca la campanella sul profilo per non perdertelo
                </span>

                <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-[#ff5c00]">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#ff5c00]" />
                  <span>Aggiornamenti in arrivo</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
