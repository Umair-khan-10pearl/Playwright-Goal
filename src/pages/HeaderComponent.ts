import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HeaderComponent extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  loggedInAs() {
    return this.page.getByText(/Logged in as/i);
  }

  private logoutLink() {
    return this.page.getByRole('link', { name: /logout/i });
  }

  private cartLink() {
    return this.page.getByRole('link', { name: /^\s*Cart\s*$/i });
  }

  async logout(): Promise<void> {
    await this.logoutLink().click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink().click();
  }

  async isLoggedIn() {
    const name = await this.page.textContent(`//header//b`);
    return !!name;
  }
}