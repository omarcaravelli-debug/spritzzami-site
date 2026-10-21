import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig } from '../config';

const LINKS = [
  { href: '#mappa', label: 'Memories' },
  { href: '#eventi', label: 'Prossimi eventi' },
  { href: '#chi-siamo', label: 'Chi siamo' },
  { href: '#contatti', label: 'Contatti' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/25 bg-[#ff5c00]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Logo Spritzzami" className="h-8 w-8 object-contain" />
          <span className="font-display text-2xl tracking-widest text-white uppercase">
            Spritzzami
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              className="border border-white/50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#ff5c00]"
            >
              {siteConfig.instagramHandle} ↗
            </a>
          </li>
        </ul>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/20 bg-[#ff5c00] md:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/15 px-6 py-4 font-mono text-sm uppercase tracking-widest text-white hover:bg-white/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                className="block px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest text-white"
              >
                {siteConfig.instagramHandle} ↗
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
