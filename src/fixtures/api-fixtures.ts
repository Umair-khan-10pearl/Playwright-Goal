import { test as base, request, type APIRequestContext } from '@playwright/test';
import { AccountApi } from '../api/AccountApi';
import { AuthApi } from '../api/AuthApi';
import { ProductApi } from '../api/ProductApi';
import { ENV } from '../config/env';

export interface ApiFixtures {
  apiRequestContext: APIRequestContext;
  accountApi: AccountApi;
  authApi: AuthApi;
  productApi: ProductApi;
}

export const apiTest = base.extend<object, ApiFixtures>({
  apiRequestContext: [
    async ({}, use) => {
      const context = await request.newContext({
        extraHTTPHeaders: { Accept: 'application/json' },
      });
      await use(context);
      await context.dispose();
    },
    { scope: 'worker' },
  ],

  accountApi: [
    async ({ apiRequestContext }, use) => {
      await use(new AccountApi(apiRequestContext, ENV.API_BASE_URL));
    },
    { scope: 'worker' },
  ],

  authApi: [
    async ({ apiRequestContext }, use) => {
      await use(new AuthApi(apiRequestContext, ENV.API_BASE_URL));
    },
    { scope: 'worker' },
  ],

  productApi: [
    async ({ apiRequestContext }, use) => {
      await use(new ProductApi(apiRequestContext, ENV.API_BASE_URL));
    },
    { scope: 'worker' },
  ],
});
