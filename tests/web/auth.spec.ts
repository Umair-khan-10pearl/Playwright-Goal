import { test, expect } from '../../src/fixtures/test-fixtures';
import { ENV } from '../../src/utils/Env';
import { buildRegisterUserPayload } from '../../src/utils/test-data';

test.describe('Authentication - Login', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // --------------------  POSITIVE SCENARIOS --------------------
  test('@smoke registers a new account and logs the user in and then log out', async ({ page, loginPage, signupPage, headerComponent}) => {
    const user = buildRegisterUserPayload();

    await loginPage.startSignup(user.name, user.email);
    await signupPage.fillAccountInformation(user);
    await signupPage.submit();

    await expect(page.getByText('Account Created!')).toBeVisible();
    await signupPage.continueToHome();

    await expect(headerComponent.loggedInAs()).toContainText(user.name);

    await headerComponent.logout();
    await expect(page).toHaveURL(/\/login/);
  });

    // --------------------  NEGATIVE SCENARIOS --------------------

  test('@negative User cannot login with invalid username @negative @authentication', async ({ loginPage }) => {
      await loginPage.login('invaliduser@gmail.com',ENV.password,);
      expect(await loginPage.loginErrorMessage()).toBeVisible();
    },
  );

  test('@negative User cannot login with invalid password @negative @authentication', async ({ loginPage }) => {
      await loginPage.login(ENV.username,'invalidpassword');
      expect(await loginPage.loginErrorMessage()).toBeVisible();
    },
  );

  test('User cannot login with both credentials invalid @negative @authentication', async ({ loginPage }) => {
      await loginPage.login('invaliduser@gmail.com','invalidpassword');
      expect(await loginPage.loginErrorMessage()).toBeVisible();
    },
  );

  test('@negative User cannot advance past step two with a required field left empty', async ({page,loginPage,signupPage,}) => {
      const user = buildRegisterUserPayload({ firstname: '' });

      await loginPage.goto();
      await loginPage.startSignup(user.name, user.email);
      await signupPage.fillAccountInformation(user);
      await signupPage.submit();

      // Browser-native "required" validation should keep the user on step two
      await expect(page.getByText('Enter Account Information')).toBeVisible();
      await expect(page.getByText('Account Created!')).not.toBeVisible();
    });

});