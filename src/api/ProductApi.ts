import type { APIRequestContext, APIResponse } from '@playwright/test';
import { logApiRequest, logApiResponse } from '../utils/logger';

/** API 1-6: products/brands listing and product search. */
export class ProductApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
  ) {}

  async getAllProducts(): Promise<APIResponse> {
    const url = `${this.baseUrl}/productsList`;
    logApiRequest('GET', url);
    const response = await this.request.get(url);
    await logApiResponse('GET', url, response);
    return response;
  }

  async getAllBrands(): Promise<APIResponse> {
    const url = `${this.baseUrl}/brandsList`;
    logApiRequest('GET', url);
    const response = await this.request.get(url);
    await logApiResponse('GET', url, response);
    return response;
  }

  async searchProduct(searchTerm: string): Promise<APIResponse> {
    const url = `${this.baseUrl}/searchProduct`;
    logApiRequest('POST', url, { search_product: searchTerm });
    const response = await this.request.post(url, { form: { search_product: searchTerm } });
    await logApiResponse('POST', url, response);
    return response;
  }

  async searchProductWithoutParam(): Promise<APIResponse> {
    const url = `${this.baseUrl}/searchProduct`;
    logApiRequest('POST', url);
    const response = await this.request.post(url, { form: {} });
    await logApiResponse('POST', url, response);
    return response;
  }
}
