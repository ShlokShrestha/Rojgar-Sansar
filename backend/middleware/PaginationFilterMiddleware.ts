import { NextFunction, Request, Response } from "express";
import { paginationFilterHelper } from "../helpers/paginationFilterHelper";
import ErrorHandler from "../utils/errorHandler";
import { PrismaClient } from "@prisma/client";

export interface ExpressResponse extends Response {
  paginatedResult?: any;
}

export const paginationFilterMiddleWare = (
  model: PrismaClient[keyof PrismaClient]
) => {
  return async (req: Request, res: ExpressResponse, next: NextFunction) => {
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
    try {
      const result = await paginationFilterHelper(
        model,
        filterOptions,
        skipInt,
        takeInt
      );
      res.paginatedResult = result;
      next();
    } catch (error) {
      next(new ErrorHandler("Something went wrong", 400));
    }
  };
};
