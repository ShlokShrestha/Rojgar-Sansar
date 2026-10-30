import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";

const server = createApp().listen(env.SERVER_PORT, () => {
  console.log(`Server is running on port ${env.SERVER_PORT}`);
});

const shutdown = (signal: string) => {
  console.log(`${signal} received, shutting down`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});
