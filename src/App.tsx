import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';

import Navbar from './components/Navbar';
import EventMap from './components/EventMap';
import MarqueeBanner from './components/MarqueeBanner';
import UpcomingEvents from './components/UpcomingEvents';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import type { SpritzEvent } from './data/events';

export default function App() {
  const [gallery, setGallery] = useState<SpritzEvent | null>(null);

  // se l'URL arriva con un anchor (#mappa, #eventi…), scrolla dopo il mount di React
  useEffect(() => {
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#ff5c00] text-white">
      <Navbar />
      <main id="top">
        <EventMap onOpenGallery={setGallery} />
        <MarqueeBanner />
        <UpcomingEvents />
        <About />
        <Contact />
      </main>
      <Footer />

      <Lightbox
        open={gallery !== null}
        close={() => setGallery(null)}
        slides={(gallery?.photos ?? []).map((src) => ({ src }))}
        plugins={[Zoom, Counter]}
        carousel={{ finite: true }}
        render={{ slideFooter: () => null }}
        controller={{ closeOnBackdropClick: true }}
      />
    </div>
  );
}
