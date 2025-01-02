import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middleware/catchAsync";
import prisma from "../prisma/prismaClient";
import { ExpressRequest } from "../middleware/authMiddleware";
import ErrorHandler from "../utils/errorHandler";
import path from "path";
const fs = require("fs").promises;

//user profile
export const userProfile = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const userProfile = await prisma.user.findUnique({
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
    (userProfile.profileUrl = `${baseUrl}/uploads/${userProfile?.profileUrl}`),
      res.status(200).json({ status: "success", data: userProfile });
  }
);
//user update profile
export const updateProfile = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const userId = req.body.id || req.user?.id;
    const { email, fullName } = req.body;
    const updateProfileData: any = {
      email,
      fullName,
    };
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    if (req.file) {
      if (user.profileUrl) {
        const cleanedPath = __dirname.replace(
          /\\controller$/,
          "/public/uploads"
        );
        const oldFilePath = path.join(cleanedPath, user.profileUrl);
        try {
          await fs.unlink(oldFilePath);
        } catch (err: any) {
          return next(
            new ErrorHandler(
              `Failed to delete old profile: ${err?.message}`,
              500
            )
          );
        }
      }
      updateProfileData.profileUrl = req.file?.filename ?? null;
    }
    await prisma.user.update({
      where: { id: userId },
      data: updateProfileData,
    });
    res.status(200).json({
      status: "success",
      message: "Update profile succesful",
    });
  }
);
//Get all user detail - Admin
export const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllUser = await prisma.user.findMany({
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
//Get single user - Admin
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
        profileUrl: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    if (!getSingleUser) {
      return next(new ErrorHandler("User not found", 404));
    }
    const baseUrl = `http://localhost:${process.env.SERVER_PORT}`;
    (getSingleUser.profileUrl = `${baseUrl}/uploads/${getSingleUser?.profileUrl}`),
      res.status(200).json({ status: "success", data: getSingleUser });
  }
);
//Update user - Admin
export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.id;
    const { email, fullName, role } = req.body;
    const updateProfileData: any = {
      email,
      fullName,
      role,
    };
    const user: any = await prisma.user.findFirst({
      where: { email: email },
    });
    if (user.id !== userId) {
      return next(new ErrorHandler("User exist with this email", 400));
    }
    await prisma.user.update({
      where: { id: userId },
      data: updateProfileData,
    });
    res.status(200).json({
      status: "success",
      message: "Update profile succesful",
    });
  }
);
//admin delete user  - Admin
export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return next(new ErrorHandler("User doesnot exist with id", 400));
    }
    await prisma.user.delete({ where: { id: id } });
    res
      .status(200)
      .json({ status: "success", message: "User delete successfully" });
  }
);
