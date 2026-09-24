import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import locators from '../utils/locators.json';

/**
 * "Add to cart" and "View Product" render as plain non-semantic elements
 * (no link/button role) on this site, so getByText is the correct
 * user-facing strategy here per the allowed locator set.
 */
export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private noProductsMessage() {
    return this.page.getByText(new RegExp(locators.Products.noProductsMessagePattern, 'i'));
  }

  async goto(): Promise<void> {
    await this.navigateTo('/products');
  }

  async search(term: string): Promise<void> {
    await this.fill(this.page.getByPlaceholder(locators.Products.searchInputPlaceholder), term);
    await this.click(this.page.locator(locators.Products.searchButton));
  }

  productCardByName(name: string) {
    return this.page.locator(locators.Products.productCard).filter({ hasText: name });
  }

  async addToCartByName(name: string): Promise<void> {
    const card = this.productCardByName(name);
    await this.click(card.getByText(locators.Products.addToCartText, { exact: true }).first());
  }

  async getResultCount(): Promise<number> {
    return this.page.locator(locators.Products.productCard).count();
  }

  async hasNoProductsMessage(): Promise<boolean> {
    return this.isVisible(this.noProductsMessage());
  }

  async viewCartFromModal(): Promise<void> {
    await this.click(this.page.getByRole('link', { name: locators.Products.viewCartLinkText }));
  }

  async continueShopping(): Promise<void> {
    await this.click(this.page.getByRole('button', { name: locators.Products.continueShoppingText }));
  }
}
