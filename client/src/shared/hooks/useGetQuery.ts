import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { _axios } from "@/shared/configs/_axios";
import type { IApiError } from "@/shared/model";


interface IGetQueryParams<TData> {
  url: string;
  queryKey?: unknown[];
  params?: Record<string, unknown>;
  options?: Omit<UseQueryOptions<TData, IApiError>, "queryKey" | "queryFn">;
}


export const useGetQuery = <TData = unknown>({
  url,
  queryKey = [],
  params,
  options,
}: IGetQueryParams<TData>) => {
  return useQuery<TData, IApiError>({
    queryKey: [url, ...queryKey, params],
    queryFn: async () => {
      const response = await _axios.get<TData>(url, { params });
      return response.data;
    },
    ...options,
  });
};
