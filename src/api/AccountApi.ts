import type { APIRequestContext, APIResponse } from '@playwright/test';
import { logApiRequest, logApiResponse } from '../utils/logger';
import type { RegisterUserPayload } from '../types/api.types';

/** API 11-14: create/update/delete a user account and fetch its detail by email. */
export class AccountApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
  ) {}

  async createAccount(payload: RegisterUserPayload): Promise<APIResponse> {
    const url = `${this.baseUrl}/createAccount`;
    logApiRequest('POST', url, { ...payload });
    const response = await this.request.post(url, { form: { ...payload } });
    await logApiResponse('POST', url, response);
    return response;
  }

  async deleteAccount(email: string, password: string): Promise<APIResponse> {
    const url = `${this.baseUrl}/deleteAccount`;
    logApiRequest('DELETE', url, { email, password });
    const response = await this.request.delete(url, { form: { email, password } });
    await logApiResponse('DELETE', url, response);
    return response;
  }

  async updateAccount(payload: RegisterUserPayload): Promise<APIResponse> {
    const url = `${this.baseUrl}/updateAccount`;
    logApiRequest('PUT', url, { ...payload });
    const response = await this.request.put(url, { form: { ...payload } });
    await logApiResponse('PUT', url, response);
    return response;
  }

  async getUserDetailByEmail(email: string): Promise<APIResponse> {
    const url = `${this.baseUrl}/getUserDetailByEmail`;
    logApiRequest('GET', url, { email });
    const response = await this.request.get(url, { params: { email } });
    await logApiResponse('GET', url, response);
    return response;
  }
}
