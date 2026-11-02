import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, Marker, Popup, Tooltip, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { events, formatDate, type SpritzEvent } from '../data/events';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

// OpenStreetMap standard reso dark via filtro CSS
const TILES_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILES_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Posizione di partenza con Lodi al centro e tutti i punti visibili
const HOME_CENTER: [number, number] = [45.325, 9.512];
const HOME_ZOOM = 11;

function getMarkerSize(zoom: number): number {
  if (zoom <= 10) return 10;
  if (zoom <= 11) return 13;
  if (zoom <= 12) return 17;
  if (zoom <= 13) return 22;
  if (zoom <= 14) return 28;
  if (zoom <= 15) return 33;
  return 38;
}

function spritzIcon(event: SpritzEvent, active: boolean, zoom: number) {
  const baseSize = getMarkerSize(zoom);
  const size = active ? Math.round(baseSize * 1.35) : baseSize;
  return L.divIcon({
    className: `spritz-marker ${event.upcoming ? 'is-upcoming' : ''} ${active ? 'is-active' : ''}`,
    html: `<div class="pin" style="width:${size}px; height:${size}px;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 2],
  });
}

function renderPoiIcon(category?: string) {
  switch (category) {
    case 'restaurant':
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2v20M18 2a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3M6 2v7a3 3 0 0 0 6 0V2M9 12v10" />
        </svg>
      );
    case 'sports':
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2.5 9.5a13 13 0 0 1 19 0M2.5 14.5a13 13 0 0 0 19 0" />
        </svg>
      );
    case 'bar':
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 22h8M12 15v7M3 3h18l-8 9v3" />
        </svg>
      );
    case 'cafe':
    default:
      return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
        </svg>
      );
  }
}

/** Aggiorna le dimensioni della mappa quando cambia il layout. */
function InvalidateMapSize() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    let frame = 0;
    const invalidate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => map.invalidateSize({ pan: false }));
    };
    const observer = new ResizeObserver(invalidate);

    observer.observe(container);
    invalidate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [map]);

  return null;
}

/** Controller unificato per zoom fluido, click mappa e ritorno a Lodi centrale. */
function MapController({
  active,
  onZoomChange,
  onMapClick,
}: {
  active: SpritzEvent | null;
  onZoomChange: (zoom: number) => void;
  onMapClick: () => void;
}) {
  const map = useMap();
  const prevActiveRef = useRef<SpritzEvent | null>(active);

  useMapEvents({
    zoomend() {
      const z = map.getZoom();
      onZoomChange(z);
      // Quando si rimpicciolisce la mappa manualmente senza elemento attivo, centra Lodi
      if (z <= 11.5 && !active) {
        map.panTo(HOME_CENTER, { animate: true, duration: 0.6 });
      }
    },
    click() {
      onMapClick();
    },
  });

  useEffect(() => {
    onZoomChange(map.getZoom());
  }, [map, onZoomChange]);

  // Se si attiva un luogo -> vola al punto ingrandito
  // Quando si deseleziona (chiusura popup o click fuori) -> torna a Lodi centrale
  useEffect(() => {
    if (active) {
      map.flyTo(active.coords, 16.5, { duration: 0.8 });
    } else if (prevActiveRef.current && !active) {
      map.flyTo(HOME_CENTER, HOME_ZOOM, { duration: 0.8 });
    }
    prevActiveRef.current = active;
  }, [active, map]);

  return null;
}

export default function EventMap({
  onOpenGallery,
}: {
  onOpenGallery: (event: SpritzEvent) => void;
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(HOME_ZOOM);
  const markerRefs = useRef<globalThis.Map<string, L.Marker>>(new Map());

  const handleZoomChange = useCallback((zoom: number) => {
    setCurrentZoom(zoom);
  }, []);

  const handleMapClick = useCallback(() => {
    setActiveSlug(null);
  }, []);

  const selectEvent = (event: SpritzEvent) => {
    if (activeSlug === event.slug) {
      setActiveSlug(null);
      markerRefs.current.get(event.slug)?.closePopup();
    } else {
      setActiveSlug(event.slug);
      window.setTimeout(() => markerRefs.current.get(event.slug)?.openPopup(), 450);
    }
  };

  return (
    <section id="mappa" className="flex flex-col justify-center px-3 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-12">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="01"
          kicker="Le serate"
          title="MEMORIES"
          sub="Clicca un punto sulla mappa o nella lista per vedere i dettagli e le foto."
        />

        <Reveal>
          <div className="grid overflow-hidden rounded-md border-2 border-white/30 shadow-xl lg:grid-cols-[1fr_380px]">
            {/* ── mappa ── */}
            <div className="relative border-b-2 border-white/30 bg-[#141414] lg:border-b-0 lg:border-r-2">
              <MapContainer
                center={HOME_CENTER}
                zoom={HOME_ZOOM}
                minZoom={9}
                maxZoom={18}
                zoomSnap={0.5}
                zoomDelta={0.5}
                wheelPxPerZoomLevel={120}
                wheelDebounceTime={40}
                zoomAnimation={true}
                scrollWheelZoom={false}
                doubleClickZoom={true}
                touchZoom={true}
                dragging={true}
                className="h-[48vh] min-h-[340px] w-full sm:h-[55vh] sm:min-h-[380px] lg:h-[calc(100svh-18rem)] lg:min-h-[300px] lg:max-h-[720px]"
              >
                <TileLayer
                  url={TILES_URL}
                  attribution={TILES_ATTR}
                  minZoom={9}
                  maxZoom={18}
                  maxNativeZoom={18}
                />
                <InvalidateMapSize />
                <MapController
                  active={events.find((e) => e.slug === activeSlug) ?? null}
                  onZoomChange={handleZoomChange}
                  onMapClick={handleMapClick}
                />

                {events.map((event) => (
                  <Marker
                    key={event.slug}
                    position={event.coords}
                    icon={spritzIcon(event, activeSlug === event.slug, currentZoom)}
                    ref={(m) => {
                      if (m) markerRefs.current.set(event.slug, m);
                    }}
                    eventHandlers={{
                      click: (e) => {
                        L.DomEvent.stopPropagation(e);
                        if (activeSlug === event.slug) {
                          setActiveSlug(null);
                          markerRefs.current.get(event.slug)?.closePopup();
                        } else {
                          setActiveSlug(event.slug);
                        }
                      },
                    }}
                  >
                    {/* Logo/icona del locale + nome integrato sulla mappa tipo POI */}
                    {currentZoom >= 12.5 && event.mapLabel && (
                      <Tooltip
                        permanent
                        direction="right"
                        offset={[Math.round(getMarkerSize(currentZoom) / 2) + 6, 0]}
                        className="spritz-map-label"
                      >
                        <span className="map-poi-wrapper">
                          <span className="map-poi-icon">{renderPoiIcon(event.category)}</span>
                          <span className="map-poi-text">{event.mapLabel}</span>
                        </span>
                      </Tooltip>
                    )}

                    <Popup
                      eventHandlers={{
                        remove: () => {
                          setActiveSlug((cur) => (cur === event.slug ? null : cur));
                        },
                      }}
                    >
                      <div>
                        {event.cover && (
                          <img
                            src={event.cover}
                            alt={event.title}
                            width={320}
                            height={224}
                            loading="lazy"
                            decoding="async"
                            className={`h-52 w-full object-cover sm:h-56 ${
                              event.slug === 'vol-6-corso-umberto' ? 'object-bottom' : 'object-center'
                            }`}
                          />
                        )}
                        <div className="px-3 py-2 sm:py-2.5">
                          {event.upcoming && (
                            <span className="mb-0.5 inline-block bg-white px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#ff5c00]">
                              Prossimo evento
                            </span>
                          )}
                          <h3 className="font-display text-base uppercase tracking-wider text-white sm:text-lg leading-tight">{event.title}</h3>
                          <p className="mt-0.5 font-mono text-[10px] text-white/80 sm:text-[11px]">
                            {event.venue} · {event.city} · {formatDate(event.date)}
                          </p>
                          {event.externalGalleryUrl ? (
                            <a
                              href={event.externalGalleryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 block w-full rounded-sm bg-white py-1.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#ff5c00] transition-colors hover:bg-white/90"
                            >
                              Vedi le foto ↗
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                if (event.slug === 'vol-4-aura-club-garden') {
                                  return;
                                }
                                onOpenGallery(event);
                              }}
                              className="mt-2 w-full rounded-sm bg-white py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#ff5c00] transition-colors hover:bg-white/90"
                            >
                              Vedi le foto
                            </button>
                          )}
                          {event.driveUrl && (
                            <a
                              href={event.driveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1.5 block w-full rounded-sm border border-white py-1 text-center font-mono text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-[#ff5c00]"
                            >
                              Apri cartella Drive ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* ── archivio serate a destra ── */}
            <div className="flex max-h-[46vh] flex-col divide-y divide-white/20 overflow-y-auto overscroll-contain bg-[#eb5400] sm:max-h-[50vh] lg:h-[calc(100svh-18rem)] lg:max-h-[720px] lg:min-h-[300px]">
              <p className="sticky top-0 z-10 border-b border-white/20 bg-[#eb5400] px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-white/80 sm:px-4">
                Album
              </p>
              {events.map((event, i) => (
                <button
                  key={event.slug}
                  onClick={() => selectEvent(event)}
                  className={`group flex items-center gap-3 px-3.5 py-3 text-left transition-colors sm:gap-4 sm:px-4 sm:py-3.5 ${
                    activeSlug === event.slug
                      ? 'bg-black/25 shadow-[inset_3px_0_0_0_#ffffff]'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="font-mono text-xs text-white/70 group-hover:text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {event.cover ? (
                    <img
                      src={event.cover}
                      alt=""
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                      className={`h-12 w-12 shrink-0 -rotate-2 rounded object-cover transition-transform duration-200 group-hover:rotate-0 sm:h-14 sm:w-14 ${
                        event.slug === 'vol-6-corso-umberto' ? 'object-bottom' : 'object-center'
                      }`}
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 -rotate-2 items-center justify-center rounded bg-white/20 transition-transform group-hover:rotate-0 sm:h-14 sm:w-14">
                      <img src="/logo.png" alt="" width={32} height={32} loading="lazy" decoding="async" className="h-8 w-8 opacity-70" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-display text-base uppercase tracking-wider text-white sm:text-lg leading-tight">
                        {event.title}
                      </h3>
                      {event.upcoming && (
                        <span className="shrink-0 bg-white px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-[#ff5c00]">
                          Presto
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate font-mono text-[10px] text-white/80 sm:text-[11px]">
                      {event.venue} · {event.city} · {formatDate(event.date)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
