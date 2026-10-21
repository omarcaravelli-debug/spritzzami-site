import { expect, type Locator, type Page } from '@playwright/test';

export class AppPage {
  readonly page: Page;
  readonly map: Locator;
  readonly markers: Locator;
  readonly popup: Locator;
  readonly lightbox: Locator;
  readonly eventCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.map = page.locator('.leaflet-container');
    this.markers = page.locator('.spritz-marker');
    this.popup = page.locator('.leaflet-popup-content');
    this.lightbox = page.locator('.yarl__root');
    this.eventCards = page.locator('#mappa button:has(h3)');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async openGalleryFromMarker(index = 0) {
    await this.markers.nth(index).click();
    await expect(this.popup).toBeVisible();
    await this.popup.getByRole('button', { name: /vedi le foto/i }).click();
  }

  async openGalleryFromCard(index = 0) {
    await this.eventCards.nth(index).getByText(/\d+ foto/).click();
  }

  async expectLightboxOpen() {
    await expect(this.lightbox).toBeVisible();
    await expect(this.lightbox.locator('.yarl__slide_current img')).toBeVisible();
  }

  async closeLightbox() {
    await this.page.keyboard.press('Escape');
    await expect(this.lightbox).not.toBeVisible();
  }
}
