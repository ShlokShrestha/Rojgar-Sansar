import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  SERVER_PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET_KEY: z.string().min(1, "JWT_SECRET_KEY is required"),
  JWT_EXPIRES_IN: z.string().default("1h"),
  // Comma-separated list of allowed frontend origins.
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  IMAGE_KIT_PUBLIC_KEY: z.string().optional(),
  IMAGE_KIT_PRIVATE_KEY: z.string().optional(),
  IMAGE_KIT_URL_ENDPOINT: z
    .string()
    .url()
    .default("https://ik.imagekit.io/43te21u1u"),
  // Variable names kept as-is so existing .env files keep working.
  SMPT_MAIL: z.string().optional(),
  SMPT_PASSWORD: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

export const env = {
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === "production",
  corsOrigins: parsed.data.CORS_ORIGIN.split(",").map((o) => o.trim()),
};
