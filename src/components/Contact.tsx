import { siteConfig } from '../config';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function Contact() {
  const labelCls = 'font-mono text-[10px] uppercase tracking-widest text-white/80';

  return (
    <section
      id="contatti"
      className="flex flex-col justify-center border-t-2 border-line px-4 py-16 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          kicker="Contatti"
          title="SCRIVICI"
          sub="Collaborazioni, Sponsor etc."
        />

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-14">
          <Reveal>
            <p className={labelCls}>WhatsApp</p>
            <a
              href="https://wa.me/qr/KWTNLVYR56MUO1?s=r"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block break-words font-display text-2xl text-white underline decoration-white decoration-4 underline-offset-8 transition-opacity hover:opacity-80 sm:text-3xl lg:text-4xl tracking-wider"
            >
              Chatta su WhatsApp ↗
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={labelCls}>Instagram · DM</p>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block break-words font-display text-2xl text-white underline decoration-white decoration-4 underline-offset-8 transition-opacity hover:opacity-80 sm:text-3xl lg:text-4xl tracking-wider"
            >
              {siteConfig.instagramHandle} ↗
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
