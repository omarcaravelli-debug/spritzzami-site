// Genera gli asset del sito:
// 1. public/logo.png        → logo con sfondo reso trasparente (ritagliato)
// 2. src/assets/events/...  → foto placeholder on-brand per ogni evento demo
//
// Esegui con: npm run photos
// Le foto placeholder vanno sostituite con quelle vere nelle stesse cartelle.

import Jimp from 'jimp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const LOGO_SRC = path.join(root, 'WhatsApp Image 2026-10-19 at 16.16.28.jpeg');
const LOGO_OUT = path.join(root, 'public', 'logo.png');
const EVENTS_DIR = path.join(root, 'src', 'assets', 'events');

// ---------------------------------------------------------------- logo ----

async function makeLogo() {
  const img = await Jimp.read(LOGO_SRC);
  const { width, height, data } = img.bitmap;

  img.scan(0, 0, width, height, function (x, y, idx) {
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    // "bianchezza" = quanto il pixel assomiglia allo sfondo bianco
    const w = Math.min(r, g, b);
    if (w >= 252) {
      data[idx + 3] = 0;
      return;
    }
    const a = 255 - w; // copertura del colore di primo piano
    if (a <= 14) {
      data[idx + 3] = 0;
      return;
    }
    // decontaminazione: pixel = fg * a + 255 * w  →  fg = (pixel - w) * 255 / a
    data[idx] = Math.min(255, Math.round(((r - w) * 255) / a));
    data[idx + 1] = Math.min(255, Math.round(((g - w) * 255) / a));
    data[idx + 2] = Math.min(255, Math.round(((b - w) * 255) / a));
    data[idx + 3] = Math.min(255, Math.round(a * 1.05));
  });

  img.autocrop({ cropOnlyFrames: false, tolerance: 0.001 });
  await img.writeAsync(LOGO_OUT);
  console.log(`✔ logo.png  ${img.bitmap.width}x${img.bitmap.height}`);
  return img;
}

// ------------------------------------------------------- foto demo --------

const EVENTS = [
  'navigli-sunset',
  'isola-rooftop',
  'brera-block-party',
  'porta-romana-garden',
  'halloween-spritz',
  'capodanno-spritzzami',
];

const PHOTOS_PER_EVENT = 6;

function gradientPhoto(w, h, seed) {
  const img = new Jimp(w, h, 0xff0a0a0d);
  const cx = (Math.sin(seed * 12.9898) * 0.5 + 0.5) * w;
  const cy = (Math.sin(seed * 78.233) * 0.5 + 0.5) * h;
  const maxD = Math.hypot(w, h) * 0.75;
  img.scan(0, 0, w, h, function (x, y, idx) {
    const d = Math.min(1, Math.hypot(x - cx, y - cy) / maxD);
    const t = 1 - d;
    // da arancio spritz a quasi nero
    this.bitmap.data[idx] = Math.round(255 * t ** 2.2 + 10);
    this.bitmap.data[idx + 1] = Math.round(120 * t ** 3 + 8);
    this.bitmap.data[idx + 2] = Math.round(20 * t ** 4 + 8);
  });
  return img;
}

async function makeEventPhotos(logo) {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const fontSmall = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

  for (const slug of EVENTS) {
    const dir = path.join(EVENTS_DIR, slug);
    // non sovrascrivere foto vere già caricate
    let existing = [];
    try {
      existing = await readdir(dir);
    } catch {
      /* cartella non esiste ancora */
    }
    const real = existing.filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
    if (real.length > 0) {
      console.log(`• ${slug}: trovate ${real.length} foto vere, salto i placeholder`);
      continue;
    }
    await mkdir(dir, { recursive: true });

    for (let i = 1; i <= PHOTOS_PER_EVENT; i++) {
      const seed = EVENTS.indexOf(slug) * 10 + i;
      const img = gradientPhoto(1280, 960, seed);

      // logo in watermark, ruotato e semi-trasparente
      const mark = logo.clone().scale(0.22).rotate(-8).opacity(0.28);
      img.composite(mark, img.bitmap.width - mark.bitmap.width - 60, img.bitmap.height - mark.bitmap.height - 50);

      img.print(fontSmall, 48, 48, 'SPRITZZAMI');
      img.print(font, 48, img.bitmap.height - 130, `${slug.toUpperCase()} · ${String(i).padStart(2, '0')}`);

      const name = i === 1 ? 'cover.jpg' : `${String(i).padStart(2, '0')}.jpg`;
      await img.quality(82).writeAsync(path.join(dir, name));
    }
    console.log(`✔ ${slug}: ${PHOTOS_PER_EVENT} foto placeholder`);
  }
}

const logo = await makeLogo();
await makeEventPhotos(logo);
console.log('\nFatto. Sostituisci i file in src/assets/events/<evento>/ con le foto vere.');
