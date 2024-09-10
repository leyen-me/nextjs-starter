import { I18nError } from "./error";
import { ResponseType } from "./response";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  data?: any;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ResponseType<T>> {
    const { params, data, ...customOptions } = options;
    let url = `${this.baseURL}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const headers = new Headers(customOptions.headers);
    if (data) {
      headers.set("Content-Type", "application/json");
    }

    const config: RequestInit = {
      ...customOptions,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(url, config);
    if (response.status === 404) {
      throw new I18nError("404");
    }
    let responseData = null as unknown as ResponseType<T>;
    try {
      responseData = await response.json();
      if (response.status === 500) {
        throw new I18nError(responseData.message);
      }
    } catch (error) {
      throw new I18nError("server.common.error.internalServerError");
    }
    return responseData;
  }

  async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ResponseType<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ResponseType<T>> {
    return this.request<T>(endpoint, { ...options, method: "POST", data });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ResponseType<T>> {
    return this.request<T>(endpoint, { ...options, method: "PUT", data });
  }

  async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ResponseType<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL || "");

export default api;
