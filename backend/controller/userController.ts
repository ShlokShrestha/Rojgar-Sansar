import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middleware/catchAsync";
import prisma from "../prisma/prismaClient";
import { ExpressRequest } from "../middleware/auth";
import ErrorHandler from "../utils/errorHandler";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profileUrl?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export const userProfile = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const userProfile: User | null = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        profileUrl: true,
      },
    });
    if (!userProfile) {
      return next(new ErrorHandler("User not found", 404));
    }
    const baseUrl = "http://localhost:5000";
    (userProfile.profileUrl = `${baseUrl}/${userProfile?.profileUrl}`),
      res.status(200).json({ status: "success", data: userProfile });
  }
);
export const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllUser: User[] = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
    });
    res.status(200).json({ status: "success", data: getAllUser });
  }
);
export const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const getSingleUser: User | null = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        profileUrl: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    if (!getSingleUser) {
      return next(new ErrorHandler("User not found", 404));
    }
    const baseUrl = `http://localhost:${process.env.SERVER_PORT}`;
    (getSingleUser.profileUrl = `${baseUrl}/${getSingleUser?.profileUrl}`),
      res.status(200).json({ status: "success", data: getSingleUser });
  }
);
