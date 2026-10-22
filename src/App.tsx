import { useEffect, useState, lazy, Suspense } from 'react';

import Navbar from './components/Navbar';
import EventMap from './components/EventMap';
import MarqueeBanner from './components/MarqueeBanner';
import UpcomingEvents from './components/UpcomingEvents';
import Contact from './components/Contact';
import Footer from './components/Footer';
import type { SpritzEvent } from './data/events';

const GalleryModal = lazy(() => import('./components/GalleryModal'));

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
        <MarqueeBanner />
        <Contact />
      </main>
      <Footer />

      {gallery && (
        <Suspense fallback={null}>
          <GalleryModal event={gallery} onClose={() => setGallery(null)} />
        </Suspense>
      )}
    </div>
  );
}
