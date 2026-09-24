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
        await this.fill(locators.Login.email,email);
        await this.fill(locators.Login.password,password);
        await this.click(locators.Login.loginButton);
    }

    async startSignup(name: string, email: string): Promise<void> {
        await this.fill(locators.Signup.name,name);
        await this.fill(locators.Signup.email,email);
        await this.click(locators.Signup.signupButton);
    }

    async isLoginErrorVisible(): Promise<boolean> {
        return (await this.loginErrorMessage()).isVisible();
    }

    async isSignupErrorVisible(): Promise<boolean> {
        return (await this.signupErrorMessage()).isVisible();
    }
}