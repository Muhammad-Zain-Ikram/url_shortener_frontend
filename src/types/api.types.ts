/**
 * Standard Success Response matching Express MCR responseHandler
 */
export interface ApiResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

/**
 * Standard Error details matching Express AppError
 */
export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * Standard Error Response matching Express global error handler
 */
export interface ApiErrorResponse {
  success: false;
  error: ApiErrorDetail;
}

/**
 * Custom Client Error class to retain backend error payload information
 */
export class ApiError extends Error {
  code: string;
  statusCode: number;
  details?: unknown;

  constructor(message: string, code: string = "INTERNAL_SERVER_ERROR", statusCode: number = 500, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}
