import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import locators from '../utils/locators.json';

/**
 * The shopping cart is rendered as a genuine dynamic HTML <table>: rows are
 * added/removed client-side as products are added/removed, without a full
 * page reload, which makes it a good "dynamic data table" scenario.
 */
export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private cartTable() {
    return this.page.locator(locators.Cart.cartTable);
  }

  private rows() {
    return this.cartTable().locator('tbody tr');
  }

  private emptyCartMessage() {
    return this.page.getByText(locators.Cart.emptyCartMessageText);
  }

  private proceedToCheckoutButton() {
    return this.page.getByText(locators.Cart.proceedToCheckoutText, { exact: true });
  }

  async goto(): Promise<void> {
    await this.navigateTo('/view_cart');
  }

  rowByProductName(name: string) {
    return this.rows().filter({ hasText: name });
  }

  async getRowCount(): Promise<number> {
    return this.rows().count();
  }

  async getQuantity(name: string): Promise<string> {
    return this.getText(this.rowByProductName(name).locator(locators.Cart.quantityButton));
  }

  async getPrice(name: string): Promise<string> {
    return this.getText(this.rowByProductName(name).locator(locators.Cart.priceText));
  }

  /** The delete icon has no accessible role/name on this site - CSS class is the only reliable hook. */
  async removeProduct(index: number): Promise<void> {
    await this.click(this.page.locator(locators.Cart.deleteIcon).nth(index));
  }

  async isProductPresent(name: string): Promise<boolean> {
    return (await this.rowByProductName(name).count()) > 0;
  }

  async isCartEmpty(): Promise<boolean> {
    return this.isVisible(this.emptyCartMessage());
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.proceedToCheckoutButton());
  }
}
