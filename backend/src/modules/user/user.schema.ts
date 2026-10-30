import { z } from "zod";
import { Role } from "@prisma/client";
import { email, optionalText, password } from "../../utils/schemas";

export const updateProfileSchema = z.object({
  email: z.preprocess((v) => (v === "" ? undefined : v), email.optional()),
  fullName: optionalText,
  bio: optionalText,
  skills: optionalText,
  phone: optionalText,
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: password,
});

export const adminUpdateUserSchema = z.object({
  id: z.string().min(1, "id is required"),
  email: email.optional(),
  fullName: z.string().trim().min(1).optional(),
  role: z.nativeEnum(Role).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
export type AdminUpdateUserInput = z.infer<typeof adminUpdateUserSchema>;
