import eventsMeta from './events.json';

export interface SpritzEvent {
  slug: string;
  title: string;
  mapLabel?: string;
  category?: 'bar' | 'cafe' | 'sports' | 'restaurant';
  venue: string;
  city: string;
  date: string;
  coords: [number, number];
  description: string;
  driveUrl?: string;
  externalGalleryUrl?: string;
  /** true se la data è oggi o nel futuro */
  upcoming: boolean;
  cover: string | null;
  photos: string[];
}

// Carica automaticamente ogni immagine dentro src/assets/events/<slug>/
const photoModules = import.meta.glob('../assets/events/*/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function photosFor(slug: string): string[] {
  return Object.entries(photoModules)
    .filter(([p]) => p.includes(`/events/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);
}

const today = new Date();
today.setHours(0, 0, 0, 0);

export const events: SpritzEvent[] = (eventsMeta as Omit<SpritzEvent, 'upcoming' | 'cover' | 'photos'>[])
  .map((e) => {
    const photos = photosFor(e.slug);
    return {
      ...e,
      upcoming: new Date(e.date) >= today,
      cover: photos.find((p) => p.includes('cover')) ?? photos[0] ?? null,
      photos,
    };
  });

export const upcomingEvents = events.filter((e) => e.upcoming);
export const pastEvents = events.filter((e) => !e.upcoming);

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}
