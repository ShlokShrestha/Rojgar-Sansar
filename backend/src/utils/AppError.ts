export class AppError extends Error {
  readonly statusCode: number;
  readonly status: "fail" | "error";
  readonly isOperational = true;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode < 500 ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string) {
    return new AppError(message, 400);
  }
  static unauthorized(message = "Please login to access this resource") {
    return new AppError(message, 401);
  }
  static forbidden(message = "You are not allowed to perform this action") {
    return new AppError(message, 403);
  }
  static notFound(message = "Resource not found") {
    return new AppError(message, 404);
  }
  static conflict(message: string) {
    return new AppError(message, 409);
  }
}
