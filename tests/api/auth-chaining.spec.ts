import { test, expect } from '../../src/fixtures/test-fixtures';
import { buildRegisterUserPayload } from '../../src/utils/test-data';

test.describe('@api @chaining Auth token / account chaining', () => {
  test('@smoke registers a user then verifies login and account detail end-to-end', async ({accountApi,authApi,}) => {
    const user = buildRegisterUserPayload();

    const createResponse = await accountApi.createAccount(user);
    expect(createResponse.ok()).toBe(true);
    const createBody = await createResponse.json();
    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!');

    const loginResponse = await authApi.verifyLogin(user.email, user.password);
    expect(loginResponse.ok()).toBe(true);
    const loginBody = await loginResponse.json();
    expect(loginBody.responseCode).toBe(200);
    expect(loginBody.message).toBe('User exists!');

    const detailResponse = await accountApi.getUserDetailByEmail(user.email);
    expect(detailResponse.ok()).toBe(true);
    const detailBody = await detailResponse.json();
    expect(detailBody.responseCode).toBe(200);
    expect(detailBody.user.email).toBe(user.email);
    expect(detailBody.user.name).toBe(user.name);

    const deleteResponse = await accountApi.deleteAccount(user.email, user.password);
    expect(deleteResponse.ok()).toBe(true);
  });

  test('@negative rejects verifyLogin when the email parameter is missing', async ({ authApi }) => {
    // This API always answers with HTTP 200; the real outcome is carried in body.responseCode.
    const response = await authApi.verifyLoginMissingEmail('SomePassword123!');

    expect(response.ok()).toBe(true);
    const body = await response.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('missing');
  });

  test('@smoke deleting an account invalidates subsequent login attempts', async ({ accountApi, authApi }) => {
    const user = buildRegisterUserPayload();

    await accountApi.createAccount(user);

    const firstLogin = await authApi.verifyLogin(user.email, user.password);
    expect((await firstLogin.json()).message).toBe('User exists!');

    const deleteResponse = await accountApi.deleteAccount(user.email, user.password);
    await expect(deleteResponse).toBeOK();
    expect((await deleteResponse.json()).message).toBe('Account deleted!');

    // This API always answers with HTTP 200; the real outcome is carried in body.responseCode.
    const secondLogin = await authApi.verifyLogin(user.email, user.password);
    expect(secondLogin.ok()).toBe(true);
    const secondLoginBody = await secondLogin.json();
    expect(secondLoginBody.responseCode).toBe(404);
    expect(secondLoginBody.message).not.toBe('User exists!');
  });

  test('@smoke updates an account and the change is reflected in a follow-up lookup', async ({ accountApi }) => {
    const user = buildRegisterUserPayload();

    const createResponse = await accountApi.createAccount(user);
    expect((await createResponse.json()).responseCode).toBe(201);

    const updatedUser = buildRegisterUserPayload({
      email: user.email,
      password: user.password,
      firstname: 'Updated',
      lastname: 'Name',
      city: 'Updated City',
    });

    const updateResponse = await accountApi.updateAccount(updatedUser);
    await expect(updateResponse).toBeOK();
    const updateBody = await updateResponse.json();
    expect(updateBody.responseCode).toBe(200);
    expect(updateBody.message).toBe('User updated!');

    const detailResponse = await accountApi.getUserDetailByEmail(user.email);
    const detailBody = await detailResponse.json();
    expect(detailBody.user.first_name).toBe('Updated');
    expect(detailBody.user.last_name).toBe('Name');
    expect(detailBody.user.city).toBe('Updated City');

    await accountApi.deleteAccount(user.email, user.password);
  });
});
