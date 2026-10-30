import { ErrorRequestHandler, RequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { errors as joseErrors } from "jose";
import { MulterError } from "multer";
import { ZodError } from "zod";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

const fromPrismaError = (error: Prisma.PrismaClientKnownRequestError) => {
  switch (error.code) {
    case "P2002": {
      const fields = (error.meta?.target as string[] | undefined)?.join(", ");
      return AppError.conflict(
        fields ? `A record with this ${fields} already exists` : "Duplicate record"
      );
    }
    case "P2025":
      return AppError.notFound("Record not found");
    case "P2003":
      return AppError.badRequest("Referenced record does not exist");
    default:
      return new AppError("Database error", 500);
  }
};

const MULTER_MESSAGES: Partial<Record<MulterError["code"], string>> = {
  LIMIT_FILE_SIZE: "File is too large (max 3MB)",
  LIMIT_UNEXPECTED_FILE: "Unexpected file field",
  LIMIT_FILE_COUNT: "Only one file can be uploaded",
};

const normalizeError = (error: unknown): AppError => {
  if (error instanceof AppError) return error;
  if (error instanceof ZodError) {
    const message = error.issues
      .map((i) => (i.path.length ? `${i.path.join(".")}: ${i.message}` : i.message))
      .join(", ");
    return AppError.badRequest(message);
  }
  // The frontend logs the user out when it sees exactly "jwt expired".
  if (error instanceof joseErrors.JWTExpired) return AppError.unauthorized("jwt expired");
  if (error instanceof joseErrors.JOSEError) {
    return AppError.unauthorized("Invalid token, please login again");
  }
  if (error instanceof MulterError) {
    return AppError.badRequest(MULTER_MESSAGES[error.code] ?? error.message);
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return fromPrismaError(error);
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return AppError.badRequest("Invalid request data");
  }
  if (
    typeof error === "object" &&
    error !== null &&
    (error as { type?: string }).type === "entity.parse.failed"
  ) {
    return AppError.badRequest("Malformed JSON body");
  }
  return new AppError("Something went wrong", 500);
};

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(AppError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const appError = normalizeError(error);
  if (appError.statusCode >= 500) console.error(error);

  res.status(appError.statusCode).json({
    status: appError.status,
    message: appError.message,
    ...(!env.isProduction && appError.statusCode >= 500 && error instanceof Error
      ? { detail: error.message, stack: error.stack }
      : {}),
  });
};
