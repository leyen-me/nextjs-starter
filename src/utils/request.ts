import { RESPONSE_CODE } from "@/contants";
import { I18nError } from "./error";
import { ResponseType } from "@/app/(server)/(sys)/types";

export type Page<T> = {
  total: number;
  data: T[];
};

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

    const isFormData = data instanceof FormData;

    const headers = new Headers(customOptions.headers);
    if (data && !isFormData) {
      headers.set("Content-Type", "application/json");
    }

    const config: RequestInit = {
      ...customOptions,
      headers,
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(url, config);
    let responseData = null as unknown as ResponseType<T>;

    // todo:请求404
    if (response.status === RESPONSE_CODE.NOT_FOUND) {
      // 网络正常，请求404
      throw new I18nError("server.common.error.notFound");
    } else if (response.status === RESPONSE_CODE.SUCCESS) {
      // 网络正常，判断逻辑错误
      responseData = await response.json();
      if (responseData.code !== RESPONSE_CODE.SUCCESS) {
        throw new I18nError(responseData.message);
      }
    } else if (response.status === RESPONSE_CODE.ERROR) {
      // 网络正常，系统错误
      throw new I18nError("server.common.error.internalServerError");
    } else {
      // 网络错误
      throw new I18nError("server.common.error.networkError");
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
