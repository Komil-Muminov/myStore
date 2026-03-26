import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { _axios } from "@/shared/configs/_axios";
import type { IApiError, TMethod } from "@/shared/model";

interface IMutationParams<TVariables> {
  url: string;
  method: TMethod;
  data?: TVariables;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

interface IExtendedMutationOptions<
  TData,
  TVariables,
> extends UseMutationOptions<TData, IApiError, IMutationParams<TVariables>> {
  invalidates?: any[][];
}

export const useMutationQuery = <TData = unknown, TVariables = unknown>(
  options?: IExtendedMutationOptions<TData, TVariables>,
) => {
  const queryClient = useQueryClient();
  return useMutation<TData, IApiError, IMutationParams<TVariables>>({
    mutationFn: async ({ url, method, data, params, headers }) => {
      if (method === "GET") {
        throw new Error(
          "Методи GET дар useMutationQuery дастгирӣ намешавад. Лутфан useGetQuery-ро истифода баред.",
        );
      }

      try {
        const response = await _axios.request<TData>({
          url,
          method,
          data,
          params,
          headers,
        });

        return response.data;
      } catch (err) {
        throw err as IApiError;
      }
    },
    onSuccess: async (data, variables, _, context) => {
      if (options?.invalidates) {
        await Promise.all(
          options.invalidates.map((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
          ),
        );
      }

      if (options?.onSuccess) {
        options.onSuccess(data, variables, _, context);
      }
    },
    ...options,
  });
};
