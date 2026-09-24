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

  private searchInput() {
    return this.page.getByPlaceholder(locators.Products.searchInputPlaceholder);
  }

  private searchButton() {
    return this.page.locator(locators.Products.searchButton);
  }

  private productCards() {
    return this.page.locator(locators.Products.productCard);
  }

  private noProductsMessage() {
    return this.page.getByText(new RegExp(locators.Products.noProductsMessagePattern, 'i'));
  }

  private viewCartModalLink() {
    return this.page.getByRole('link', { name: locators.Products.viewCartLinkText });
  }

  private continueShoppingButton() {
    return this.page.getByRole('button', { name: locators.Products.continueShoppingText });
  }

  async goto(): Promise<void> {
    await this.navigateTo('/products');
  }

  async search(term: string): Promise<void> {
    await this.fill(this.searchInput(), term);
    await this.click(this.searchButton());
  }

  productCardByName(name: string) {
    return this.productCards().filter({ hasText: name });
  }

  async addToCartByName(name: string): Promise<void> {
    const card = this.productCardByName(name);
    await this.click(card.getByText(locators.Products.addToCartText, { exact: true }).first());
  }

  async getResultCount(): Promise<number> {
    return this.productCards().count();
  }

  async hasNoProductsMessage(): Promise<boolean> {
    return this.isVisible(this.noProductsMessage());
  }

  async viewCartFromModal(): Promise<void> {
    await this.click(this.viewCartModalLink());
  }

  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton());
  }
}
