import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import type { IApiError } from "../model";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const BASE_DOMAIN = new URL(BASE_URL).origin;

export const _axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

_axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

_axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string; code?: string }>) => {
    const apiError: IApiError = {
      name: "ApiError",
      message:
        error.response?.data?.message ||
        error.message ||
        "РҐР°С‚РѕРіРёРё РЅРѕРјР°СЉР»СѓРј СЂСѓС… РґРѕРґ",
      status: error.response?.status,
      code: error.response?.data?.code,
      data: error.response?.data,
      headers: error.response?.headers as Record<string, unknown> | undefined,
    };

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.dispatchEvent(new Event("unauthorized"));
    }

    console.error("API Error:", apiError);
    return Promise.reject(apiError);
  },
);
