import express from "express";
import globalErrorHandler from "./controller/errorController";
import userRoutes from "./routes/userRoute";

import dotenv from "dotenv";
import authRoutes from "./routes/authRoute";
dotenv.config();

const server = express();
server.use(express.json());

server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/user", userRoutes);
server.use(globalErrorHandler);

server.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running in port ", process.env.SERVER_PORT);
});
