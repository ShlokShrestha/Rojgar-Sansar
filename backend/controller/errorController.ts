import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

interface FunctionType {
  error: {
    statusCode: number;
    status: string;
    stack: string;
    message: string;
  };
  res: Response;
}

const sendErrorDev = ({ error, res }: FunctionType) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message;
  const stack = error.stack;
  res.status(statusCode).json({ status, message });
};

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  sendErrorDev({ error, res });
};

export default globalErrorHandler;
