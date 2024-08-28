import { SETTING_CONFIG } from "@/contants";
import { getLanguage } from "@/i18n";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  data?: any;
}

interface ApiResponse<T = any> {
  data: T;
  message: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { params, data, ...customOptions } = options;
    let url = `${this.baseURL}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const headers = new Headers(customOptions.headers);
    headers.set(
      "X-Language",
      getLanguage(localStorage.getItem("language") || "")
    );

    if (data) {
      headers.set("Content-Type", "application/json");
    }

    const config: RequestInit = {
      ...customOptions,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(url, config);
    const responseData = await response.json();
    // 处理ok
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return {
      data: responseData,
      message: responseData.message,
    };
  }

  async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "POST", data });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "PUT", data });
  }

  async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL || "");

export default api;
