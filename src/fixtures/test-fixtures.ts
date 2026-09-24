import { test as base, expect, Page} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HeaderComponent } from '../pages/HeaderComponent';

type Fixtures = {
  loginPage: LoginPage;
  signupPage: SignupPage;
  headerComponent: HeaderComponent;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
});

export { expect };