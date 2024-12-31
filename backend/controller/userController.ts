import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middleware/catchAsync";
import prisma from "../prisma/prismaClient";
import { ExpressRequest } from "../middleware/auth";

export const userProfile = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const userProfile = await prisma.user.findMany({
      where: { id: userId },
      select: { id: true, fullName: true, email: true, role: true },
    });
    res.status(200).json({ status: "success", data: userProfile });
  }
);
export const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllUser = await prisma.user.findMany({
      select: { id: true, fullName: true, email: true, role: true },
    });
    res.status(200).json({ status: "success", data: getAllUser });
  }
);
export const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const getSingleUser = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    res.status(200).json({ status: "success", data: getSingleUser });
  }
);
