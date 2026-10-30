import { NextFunction, Request, RequestHandler, Response } from "express";
import { Role, User } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { verifyAccessToken } from "../utils/token";

export type AuthUser = Pick<User, "id" | "email" | "fullName" | "role">;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

// The frontend always sends `Authorization: JWT <token>`, even when logged out
// (it then sends the literal "null"), so treat those values as no token.
const extractToken = (req: Request) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || token === "null" || token === "undefined") return null;
  return token;
};

const loadUser = (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, fullName: true, role: true },
  });

export const authenticate = catchAsync(async (req, _res, next) => {
  const token = extractToken(req);
  if (!token) throw AppError.unauthorized();

  // Expired/invalid tokens throw and are turned into 401s by the error handler.
  const { id } = await verifyAccessToken(token);
  const user = await loadUser(id);
  if (!user) {
    throw AppError.unauthorized("User no longer exists, please login again");
  }
  req.user = user;
  next();
});

// Attaches the user when a valid token is present, but never blocks the request.
export const optionalAuth = catchAsync(async (req, _res, next) => {
  const token = extractToken(req);
  if (token) {
    try {
      const user = await loadUser((await verifyAccessToken(token)).id);
      if (user) req.user = user;
    } catch {
      // Ignore bad tokens on public routes.
    }
  }
  next();
});

export const authorize =
  (...roles: Role[]): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        AppError.forbidden(
          `Role: ${req.user?.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };

// Use inside handlers that run after `authenticate`.
export const requireUser = (req: Request): AuthUser => {
  if (!req.user) throw AppError.unauthorized();
  return req.user;
};
