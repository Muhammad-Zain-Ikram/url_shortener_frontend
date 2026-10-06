import { ApiError, type ApiResponse, type ApiErrorResponse } from "@/types/api.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Production-ready fetch client using native Fetch (no Axios).
 * Automatically includes session cookies (credentials: 'include')
 * and normalizes backend error responses to ApiError.
 */
export async function fetcher<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options;

  let url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    // CRITICAL: Send session cookies (connect.sid / sessionId) back and forth with Express
    credentials: "include",
  });

  let payload: ApiResponse<T> | ApiErrorResponse | null = null;
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    const errorPayload = payload as ApiErrorResponse | null;
    const errorMessage =
      errorPayload?.error?.message ||
      (typeof payload === "object" && payload !== null && "message" in payload
        ? (payload as { message: string }).message
        : null) ||
      `Request failed with status ${response.status}`;

    const errorCode = errorPayload?.error?.code || "HTTP_ERROR";
    const errorDetails = errorPayload?.error?.details;

    throw new ApiError(errorMessage, errorCode, response.status, errorDetails);
  }

  // If payload matches the standardized Express responseHandler format { success: true, message, data }
  if (payload && typeof payload === "object" && "data" in payload && (payload as ApiResponse<T>).success) {
    return (payload as ApiResponse<T>).data;
  }

  return (payload as unknown as T) ?? ({} as T);
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    fetcher<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    fetcher<T>(endpoint, {
      ...options,
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    fetcher<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    fetcher<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    fetcher<T>(endpoint, { ...options, method: "DELETE" }),
};
