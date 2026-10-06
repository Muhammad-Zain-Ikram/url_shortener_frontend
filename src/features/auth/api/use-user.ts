import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { User } from "../types";

export const USER_QUERY_KEY = ["auth-user"] as const;

export function useUser() {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: () => apiClient.get<User>("/auth/me"),
    retry: false, // Don't spam Express on 401 Unauthorized
    staleTime: 1000 * 60 * 5, // Cache user profile for 5 minutes
  });
}
