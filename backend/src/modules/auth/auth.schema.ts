import { z } from "zod";
import { email, password, requiredText } from "../../utils/schemas";

export const signUpSchema = z.object({
  fullName: requiredText("Full name"),
  email,
  password,
  // Admin accounts can only be granted by an existing admin.
  role: z.enum(["user", "recruiter"]).default("user"),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z.object({
  token: requiredText("Token"),
  password,
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
