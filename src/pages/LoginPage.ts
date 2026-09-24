import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import locators from '../utils/locators.json';

export class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

    async goto(): Promise<void> {
        await this.navigateTo('/login');
    }

    async loginErrorMessage() {
        return await this.page.getByText('Your email or password is incorrect!');
    }

    async signupErrorMessage() {
        return await this.page.getByText('Email Address already exist!');
    }

    async login(email: string, password: string): Promise<void> {
        await this.fill(this.page.getByTestId(locators.Login.email), email);
        await this.fill(this.page.getByTestId(locators.Login.password), password);
        await this.click(this.page.getByTestId(locators.Login.loginButton));
    }

    async startSignup(name: string, email: string): Promise<void> {
        await this.fill(this.page.getByTestId(locators.Signup.name), name);
        await this.fill(this.page.getByTestId(locators.Signup.email), email);
        await this.click(this.page.getByTestId(locators.Signup.signupButton));
    }

    async isLoginErrorVisible(): Promise<boolean> {
        return (await this.loginErrorMessage()).isVisible();
    }

    async isSignupErrorVisible(): Promise<boolean> {
        return (await this.signupErrorMessage()).isVisible();
    }
}