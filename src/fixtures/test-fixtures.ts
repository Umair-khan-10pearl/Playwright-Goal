import { test as base, expect, Page} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HeaderComponent } from '../pages/HeaderComponent';
import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';

type Fixtures = {
  loginPage: LoginPage;
  signupPage: SignupPage;
  headerComponent: HeaderComponent;
  cartPage: CartPage;
  productsPage: ProductsPage;
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
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

export { expect };