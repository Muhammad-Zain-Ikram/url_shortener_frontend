import { QueryClient } from "@tanstack/react-query";

/**
 * Creates and configures a TanStack QueryClient with production defaults.
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes cache by default
        gcTime: 1000 * 60 * 15, // 15 minutes garbage collection
        retry: (failureCount, error) => {
          // Do not retry on 401 (Unauthorized) or 403 (Forbidden)
          if (
            typeof error === "object" &&
            error !== null &&
            "statusCode" in error &&
            (error.statusCode === 401 || error.statusCode === 403)
          ) {
            return false;
          }
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}
