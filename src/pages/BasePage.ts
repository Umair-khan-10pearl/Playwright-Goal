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

  async click(locator: any){
    const element = await this.page.waitForSelector(locator, {state: 'visible',});
    await element.click();
  }

  async fill(locator: any,value: string,){
    const element = await this.page.waitForSelector(locator, {state: 'visible',});
    await element.fill(value);
  }

  async getText(locator: any){
    const element = await this.page.waitForSelector(locator, {state: 'visible',});
    return (await element.innerText()).trim();
  }

  async isVisible(locator: any){
    const element = await this.page.waitForSelector(locator, {state: 'visible',});
    return element.isVisible();
  }

  async isEnabled(locator: any){
    const element = await this.page.waitForSelector(locator, {state: 'visible',});
    return element.isEnabled();
  }

  async isChecked(locator: any){
    const element = await this.page.waitForSelector(locator, {state: 'visible',});
    return element.isChecked();
  }

  // ------------------- Form controls -----------------------

  async check(locator: any){
    const element = await this.page.waitForSelector(locator, {state: 'visible',});
    await element.check();
  }

  async uncheck(locator: any){
    const element = await this.page.waitForSelector(locator, {state: 'visible',});
    await element.uncheck();
  }

  async selectOption(locator: any,value: string,){
    const element = await this.page.waitForSelector(locator, {state: 'visible',});
    await element.selectOption(value);
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