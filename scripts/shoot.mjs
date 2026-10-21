// screenshot rapidi delle sezioni per review visiva
import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.screenshot({ path: 'shot-1-hero.png' });

await page.evaluate(() => document.querySelector('#mappa')?.scrollIntoView());
await page.waitForTimeout(2500);
await page.screenshot({ path: 'shot-2-map.png' });

// apri popup + galleria
await page.locator('.spritz-marker').nth(0).click();
await page.waitForTimeout(1200);
await page.screenshot({ path: 'shot-3-popup.png' });
await page.locator('.leaflet-popup-content').getByText(/vedi le foto/i).click();
await page.waitForTimeout(1200);
await page.screenshot({ path: 'shot-4-gallery.png' });
await page.keyboard.press('Escape');

await page.evaluate(() => document.querySelector('#eventi')?.scrollIntoView());
await page.waitForTimeout(2000);
await page.screenshot({ path: 'shot-5-events.png' });

await page.evaluate(() => document.querySelector('#chi-siamo')?.scrollIntoView());
await page.waitForTimeout(2000);
await page.screenshot({ path: 'shot-6-about.png' });

await page.evaluate(() => document.querySelector('#contatti')?.scrollIntoView());
await page.waitForTimeout(2000);
await page.screenshot({ path: 'shot-7-contact.png' });

await browser.close();
console.log('done');
