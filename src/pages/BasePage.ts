import { expect, Locator, Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  // ------------------- Navigation -----------------------

  async navigateTo(path: string = '/'){
    await this.page.goto(path, {waitUntil: 'domcontentloaded',});
  }

  async reload(){
    await this.page.reload({waitUntil: 'domcontentloaded',});
  }

  async getCurrentUrl(){
    return this.page.url();
  }

  async expectUrl(url: string | RegExp){
    await expect(this.page).toHaveURL(url);
  }

  // ------------------- Common element interactions -----------------------

  async click(locator: Locator){
    await locator.waitFor({state: 'visible',});
    await locator.click();
  }

  async fill(locator: Locator,value: string,){
    await locator.waitFor({state: 'visible',});
    await locator.fill(value);
  }

  async getText(locator: Locator){
    await locator.waitFor({state: 'visible',});
    return (await locator.innerText()).trim();
  }

  async isVisible(locator: Locator){
    return locator.isVisible();
  }

  async isEnabled(locator: Locator){
    return locator.isEnabled();
  }

  async isChecked(locator: Locator){
    return locator.isChecked();
  }

  // ------------------- Form controls -----------------------

  async check(locator: Locator){
    await locator.waitFor({state: 'visible',});
    await locator.check();
  }

  async uncheck(locator: Locator){
    await locator.waitFor({state: 'visible',});
    await locator.uncheck();
  }

  async selectOption(locator: Locator,value: string,){
    await locator.waitFor({state: 'visible',});
    await locator.selectOption(value);
  }

  // Controlled self-healing

  protected async resilientLocator(primary: Locator,fallback?: Locator,description = 'element',){
    if (await primary.count() > 0) {
      return primary;
    }

    if (fallback && await fallback.count() > 0) {
      console.warn(`[SELF-HEAL] Primary locator failed for "${description}". Using configured fallback locator.`);
      return fallback;
    }

    throw new Error(
      `[LOCATOR FAILURE] Unable to locate "${description}".`,
    );
  }

}