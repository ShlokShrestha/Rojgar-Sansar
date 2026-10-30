import { PrismaClient } from "@prisma/client";
import { env } from "../config/env";

// Reuse one client across hot reloads in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (!env.isProduction) globalForPrisma.prisma = prisma;
