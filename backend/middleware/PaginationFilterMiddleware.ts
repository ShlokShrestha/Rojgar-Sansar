import { NextFunction, Request, Response } from "express";
import { paginationFilterHelper } from "../helpers/paginationFilterHelper";
import ErrorHandler from "../utils/errorHandler";
import { PrismaClient } from "@prisma/client";
import { ExpressRequest } from "./authMiddleware";

export interface ExpressResponse extends Response {
  paginatedResult?: any;
}

export const paginationFilterMiddleWare = (
  model: PrismaClient[keyof PrismaClient]
) => {
  return async (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
  ) => {
    const { skip, take, search } = req.query;

    const skipInt = skip ? parseInt(skip as string, 10) : 0;
    const takeInt = take ? parseInt(take as string, 10) : 10;

    const filterOptions = search
      ? {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        }
      : {};
    if (req?.user) {
      try {
        const result = await paginationFilterHelper(
          model,
          { ...filterOptions, userId: req?.user?.id },
          skipInt,
          takeInt
        );
        res.paginatedResult = result;
        next();
      } catch (error) {
        next(new ErrorHandler("Something went wrong", 400));
      }
    }
  };
};
