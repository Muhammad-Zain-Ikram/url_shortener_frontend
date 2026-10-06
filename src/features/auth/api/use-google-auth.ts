import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

interface GoogleAuthResponse {
  url: string;
}

/**
 * Hook to initiate Google OAuth flow.
 * Calls backend GET /auth/google to retrieve the OAuth consent URL,
 * then navigates the user to Google.
 */
export function useGoogleAuth() {
  return useMutation({
    mutationFn: () => apiClient.get<GoogleAuthResponse>("/auth/google"),
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to retrieve Google authentication URL.");
      }
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to connect to Google authentication.";
      toast.error(message);
    },
  });
}
