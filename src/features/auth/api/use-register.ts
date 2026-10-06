import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { RegisterInput } from "../schemas/register.schema";
import type { AuthResponse } from "../types";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterInput) => {
      // Pick only the fields expected by the backend
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      return apiClient.post<AuthResponse>("/auth/register", payload);
    },
  });
}
