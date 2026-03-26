import type { TUserRole } from "@/entities/usersRole/model";

export type TMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface IApiError {
  name?: string;
  message: string;
  status?: number;
  code?: string;
  data?: unknown;
  headers?: Record<string, unknown>;
}

export type { TUserRole };
