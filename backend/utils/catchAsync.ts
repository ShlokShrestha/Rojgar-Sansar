import { Request, Response, NextFunction } from "express";

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  const errorHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    fn(req, res, next).catch(next);
  };
  return errorHandler;
};
