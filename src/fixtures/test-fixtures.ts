import { test as base, expect, mergeTests } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HeaderComponent } from '../pages/HeaderComponent';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';
import { apiTest } from './api-fixtures';

type Fixtures = {
  loginPage: LoginPage;
  signupPage: SignupPage;
  headerComponent: HeaderComponent;
  cartPage: CartPage;
  productsPage: ProductsPage;
};

const pageObjectTest = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

// Merged so web specs can pull in accountApi/authApi/productApi for hybrid UI+API cleanup.
export const test = mergeTests(pageObjectTest, apiTest);
export { expect };