import { test, expect } from '@playwright/test';
import { AppPage } from '../pages/app.page';

test.describe('Spritzzami — homepage', () => {
  let app: AppPage;

  test.beforeEach(async ({ page }) => {
    app = new AppPage(page);
    await app.goto();
  });

  test('hero, titolo e CTA sono visibili', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /spritzzami/i, level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /esplora la mappa/i })).toBeVisible();
    await expect(
      page.getByRole('img', { name: /polpo spritzzami con occhiali/i }).first(),
    ).toBeVisible();
  });

  test('la mappa mostra i marker delle serate', async () => {
    await expect(app.map).toBeVisible();
    await expect(app.markers.first()).toBeVisible();
    expect(await app.markers.count()).toBeGreaterThanOrEqual(4);
  });

  test('click sul marker apre il popup della serata', async () => {
    await app.markers.first().click();
    await expect(app.popup).toBeVisible();
    await expect(app.popup.getByRole('button', { name: /vedi le foto/i })).toBeVisible();
  });

  test('dal popup si apre la galleria foto e si richiude', async () => {
    await app.openGalleryFromMarker(0);
    await app.expectLightboxOpen();
    await app.closeLightbox();
  });

  test('dalla card evento si apre la galleria', async () => {
    await app.openGalleryFromCard(5); // card di un evento passato (con foto)
    await app.expectLightboxOpen();
    await app.closeLightbox();
  });

  test('la card evento seleziona il marker sulla mappa', async () => {
    await app.eventCards.first().click();
    await expect(app.popup).toBeVisible({ timeout: 5000 });
  });

  test('sezione prossimi eventi presente', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /prossime serate/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /info su instagram/i }).first()).toBeVisible();
  });

  test('sezioni chi siamo e contatti presenti', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /otto tentacoli/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /porta il polpo da te/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /ciao@spritzzami\.it/i })).toBeVisible();
    await expect(page.locator('#contatti form')).toHaveCount(0);
  });

  test('il link alla mappa allinea la sezione al bordo superiore', async ({ page }) => {
    await page.getByRole('link', { name: /esplora la mappa/i }).click();
    await expect.poll(async () =>
      Math.abs(await page.locator('#mappa').evaluate((section) => section.getBoundingClientRect().top)),
    ).toBeLessThan(2);
  });

  test('lo scroll resta libero e non scatta alla sezione successiva', async ({ page }) => {
    await page.mouse.wheel(0, 240);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(500);
  });

  test('il wordmark del footer resta dentro lo schermo su mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const wordmark = page.locator('footer .select-none');
    await expect.poll(() =>
      wordmark.evaluate((element) => element.scrollWidth - element.clientWidth),
    ).toBeLessThanOrEqual(1);
  });
});
