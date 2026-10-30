import rateLimit from "express-rate-limit";

const message = (text: string) => ({ status: "fail", message: text });

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: message("Too many requests, please try again later"),
});

// Login, forgot and reset password: slows down brute force and email spam.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: message("Too many attempts, please try again in 15 minutes"),
});
