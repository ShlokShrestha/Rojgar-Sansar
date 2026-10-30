import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { env } from "../config/env";
import { AppError } from "./AppError";

const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;
const JWT_ALGORITHM = "HS256";
const jwtSecret = new TextEncoder().encode(env.JWT_SECRET_KEY);

export const signAccessToken = (userId: string) =>
  new SignJWT({ id: userId })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(jwtSecret);

// Throws jose errors (e.g. JWTExpired) which the error handler maps to 401.
export const verifyAccessToken = async (token: string) => {
  const { payload } = await jwtVerify(token, jwtSecret, { algorithms: [JWT_ALGORITHM] });
  if (typeof payload.id !== "string") {
    throw AppError.unauthorized("Invalid token, please login again");
  }
  return { id: payload.id };
};

export const hashResetToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

// 128-bit random code: the user receives the plain value, only the hash is stored.
export const generateResetToken = () => {
  const resetToken = crypto.randomBytes(16).toString("hex");
  return {
    resetToken,
    resetPasswordToken: hashResetToken(resetToken),
    resetPasswordExpire: new Date(Date.now() + RESET_TOKEN_TTL_MS),
  };
};
