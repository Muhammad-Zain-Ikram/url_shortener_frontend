import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { USER_QUERY_KEY } from "./use-user";
import type { LoginInput } from "../schemas/login.schema";
import type { AuthResponse } from "../types";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginInput) =>
      apiClient.post<AuthResponse>("/auth/login", credentials),
    onSuccess: (data) => {
      // Set query cache directly with the returned user
      if (data?.user) {
        queryClient.setQueryData(USER_QUERY_KEY, data.user);
      }
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}
