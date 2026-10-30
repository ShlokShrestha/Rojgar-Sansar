import { z } from "zod";

// Multipart forms send missing values as "", "null" or "undefined".
const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && ["", "null", "undefined"].includes(value.trim())
    ? undefined
    : value;

export const requiredText = (label: string) =>
  z.string({ required_error: `${label} is required` }).trim().min(1, `${label} is required`);

export const optionalText = z.preprocess(emptyToUndefined, z.string().trim().optional());

export const email = z.string().trim().toLowerCase().email("Enter a valid email");

export const password = z.string().min(8, "Password must have at least 8 characters");

export const idParams = z.object({ id: z.string().min(1) });

export const bodyId = z.object({ id: z.string().min(1, "id is required") });

// Query params can arrive as a single value or as an array (`key[]=a&key[]=b`).
export const stringOrArray = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .transform((value) =>
    (Array.isArray(value) ? value : value ? [value] : [])
      .map((v) => v.trim())
      .filter(Boolean)
  );
