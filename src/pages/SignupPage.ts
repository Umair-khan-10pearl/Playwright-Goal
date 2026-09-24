import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import type { RegisterUserPayload } from '../types/api.types';
import locators from '../utils/locators.json';

export class SignupPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async fillAccountInformation(payload: RegisterUserPayload): Promise<void> {

    // gender radios only expose an id, not data-qa, so CSS is used instead of getByTestId
    await this.page.locator(payload.title === 'Mr' ? locators.Signup.genderMr : locators.Signup.genderMrs).check();
    await this.page.getByTestId(locators.Signup.nameForm).fill(payload.name);
    await this.page.getByTestId(locators.Signup.password).fill(payload.password);
    await this.page.getByTestId(locators.Signup.days).selectOption(payload.birth_date);
    await this.page.getByTestId(locators.Signup.months).selectOption(payload.birth_month);
    await this.page.getByTestId(locators.Signup.years).selectOption(payload.birth_year);
    await this.page.getByTestId(locators.Signup.firstName).fill(payload.firstname);
    await this.page.getByTestId(locators.Signup.lastName).fill(payload.lastname);
    await this.page.getByTestId(locators.Signup.address).fill(payload.address1);
    await this.page.getByTestId(locators.Signup.country).selectOption(payload.country);
    await this.page.getByTestId(locators.Signup.state).fill(payload.state);
    await this.page.getByTestId(locators.Signup.city).fill(payload.city);
    await this.page.getByTestId(locators.Signup.zipcode).fill(payload.zipcode);
    await this.page.getByTestId(locators.Signup.mobileNumber).fill(payload.mobile_number);
  } 
  
  async submit(): Promise<void> {
    await this.page.getByTestId(locators.Signup.createAccountButton).click();
  }

  async continueToHome(): Promise<void> {
    await this.page.getByTestId(locators.Signup.continueToHomeButton).click();
  }
}