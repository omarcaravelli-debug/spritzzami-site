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
          index="04"
          kicker="Contatti"
          title="Porta il polpo da te"
          sub="Feste private, locali, collaborazioni."
        />

        <div className="grid gap-10 sm:grid-cols-2 sm:gap-14">
          <Reveal>
            <p className={labelCls}>Email</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 inline-block break-all font-display text-3xl text-white underline decoration-white decoration-4 underline-offset-8 transition-opacity hover:opacity-80 sm:text-4xl tracking-wider"
            >
              {siteConfig.email}
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={labelCls}>Instagram · DM</p>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block font-display text-3xl text-white underline decoration-white decoration-4 underline-offset-8 transition-opacity hover:opacity-80 sm:text-4xl tracking-wider"
            >
              {siteConfig.instagramHandle}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
