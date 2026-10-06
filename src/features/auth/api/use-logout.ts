import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { USER_QUERY_KEY } from "./use-user";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.post<{ message: string }>("/auth/logout"),
    onSuccess: () => {
      // Clear authenticated user cache on successful logout
      queryClient.setQueryData(USER_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}
