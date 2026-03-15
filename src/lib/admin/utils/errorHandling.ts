// Error handling utilities for admin portal

export enum ErrorType {
  NETWORK = "NETWORK",
  VALIDATION = "VALIDATION",
  PERMISSION = "PERMISSION",
  NOT_FOUND = "NOT_FOUND",
  SERVER = "SERVER",
  UNKNOWN = "UNKNOWN",
}

export class AdminError extends Error {
  type: ErrorType;
  statusCode?: number;
  details?: unknown;

  constructor(message: string, type: ErrorType = ErrorType.UNKNOWN, statusCode?: number, details?: unknown) {
    super(message);
    this.name = "AdminError";
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function handleError(error: unknown): AdminError {
  if (error instanceof AdminError) {
    return error;
  }

  if (error instanceof Error) {
    return new AdminError(error.message, ErrorType.UNKNOWN);
  }

  return new AdminError("An unknown error occurred", ErrorType.UNKNOWN);
}

export function withErrorHandling<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return (await fn(...args)) as ReturnType<T>;
    } catch (error) {
      const adminError = handleError(error);
      console.error("[Admin Error]", adminError);
      throw adminError;
    }
  };
}
