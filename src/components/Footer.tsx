import { siteConfig } from '../config';

export default function Footer() {
  return (
    <footer className="border-t-2 border-line px-4 pb-6 pt-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="select-none overflow-hidden text-center">
          <span className="text-outline-white block w-full whitespace-nowrap font-display text-[clamp(2rem,9vw,8.5rem)] uppercase leading-none">
            Spritzzami
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono text-xs text-white/80">
            © {new Date().getFullYear()} Spritzzami — {siteConfig.city}
          </p>
          <p className="font-mono text-xs text-white/70">
            bevi responsabilmente, il polpo guida sempre sobrio
          </p>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-80"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {siteConfig.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  );
}
