import express from "express";
import globalErrorHandler from "./controller/errorController";
import authRoutes from "./routes/authRoute";

import dotenv from "dotenv";
dotenv.config();

const server = express();
server.use(express.json());

server.use("/api/v1/auth", authRoutes);
server.use(globalErrorHandler);

server.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running in port ", process.env.SERVER_PORT);
});
