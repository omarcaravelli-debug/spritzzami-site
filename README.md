# SPRITZZAMI — sito ufficiale

Sito one-page dark & neon per le serate Spritzzami: mappa interattiva degli
eventi, galleria foto per ogni serata, prossimi eventi, chi siamo e contatti.

## Comandi

```bash
npm install        # installa le dipendenze (solo la prima volta)
npm run dev        # avvia il sito in locale → http://localhost:5173
npm run build      # build di produzione in dist/
npm run photos     # rigenera logo.png e le foto placeholder
npm run test:e2e   # test automatici (Playwright)
```

## Come aggiungere una serata

1. **Crea la cartella delle foto**: `src/assets/events/<nome-serata>/` e
   mettici dentro le foto (`.jpg`, `.png`, `.webp`). Il file chiamato
   `cover.jpg` diventa la copertina.
2. **Registra l'evento** in `src/data/events.json` aggiungendo un oggetto:

```json
{
  "slug": "nome-serata",
  "title": "Titolo della serata",
  "venue": "Nome del locale",
  "city": "Milano",
  "date": "2026-11-15",
  "coords": [45.4642, 9.19],
  "description": "Due righe sulla serata.",
  "driveUrl": "https://drive.google.com/drive/folders/..."
}
```

- `slug` deve essere **uguale al nome della cartella** delle foto.
- `driveUrl` è facoltativo: se presente, nel popup della serata compare il link
  alla cartella Drive. La cartella deve essere condivisa con chiunque abbia il
  link in sola visualizzazione.
- `date` decide in automatico se l'evento è passato (compare sulla mappa con
  galleria) o futuro (compare anche in "Prossime serate" col badge PRESTO).
- `coords`: latitudine/longitudine — su Google Maps tasto destro sul punto →
  clicca sulle coordinate per copiarle.
- Rigenera i placeholder quando vuoi con `npm run photos` (non sovrascrive le
  foto vere già presenti nelle cartelle).

## Contatti e social

Email, Instagram e città si cambiano in `src/config.ts`. La sezione contatti
usa link diretti a email e Instagram; non contiene un modulo da compilare.

## Pubblicare il sito (gratis)

Il sito è statico: la cartella `dist/` prodotta da `npm run build` si può
caricare su **Netlify Drop** (trascini la cartella su app.netlify.com/drop),
**Vercel** o **GitHub Pages**. Per aggiornamenti continui conviene collegare la
repo Git: ogni push pubblica in automatico.

## Struttura

```
public/logo.png            logo con sfondo trasparente
src/assets/events/<slug>/  foto delle serate (trascina qui le foto vere)
src/data/events.json       elenco serate (titolo, data, coordinate)
src/config.ts              email, Instagram, città
src/components/            sezioni del sito (Hero, EventMap, …)
scripts/make-assets.mjs    genera logo trasparente + placeholder
tests/                     test e2e Playwright
```
