import type { APIRequestContext, APIResponse } from '@playwright/test';
import { logApiRequest, logApiResponse } from '../../utils/logger';

/** API 7-10: verify login with/without required parameters. */
export class AuthApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
  ) {}

  async verifyLogin(email: string, password: string): Promise<APIResponse> {
    const url = `${this.baseUrl}/verifyLogin`;
    logApiRequest('POST', url, { email, password });
    const response = await this.request.post(url, { form: { email, password } });
    await logApiResponse('POST', url, response);
    return response;
  }

  async verifyLoginMissingEmail(password: string): Promise<APIResponse> {
    const url = `${this.baseUrl}/verifyLogin`;
    logApiRequest('POST', url, { password });
    const response = await this.request.post(url, { form: { password } });
    await logApiResponse('POST', url, response);
    return response;
  }

  async deleteVerifyLogin(): Promise<APIResponse> {
    const url = `${this.baseUrl}/verifyLogin`;
    logApiRequest('DELETE', url);
    const response = await this.request.delete(url);
    await logApiResponse('DELETE', url, response);
    return response;
  }
}
