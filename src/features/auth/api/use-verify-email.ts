import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { VerifyEmailInput } from "../schemas/verify-email.schema";

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (data: VerifyEmailInput) =>
      apiClient.post<{ message: string }>("/auth/verify-email", data),
  });
}
