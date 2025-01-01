import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middleware/catchAsync";
import prisma from "../prisma/prismaClient";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendEmail";
import { generateResetToken, generateToken } from "../utils/generateToken";
import crypto from "crypto";

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, password } = req.body;
    const filename = `uploads/${req.file?.filename ?? ""}`;
    if (!fullName || !email || !password) {
      return next(new ErrorHandler("Please fill form properly", 400));
    }
    const existanceUser = await prisma.user.findFirst({ where: { email } });
    if (existanceUser) {
      return next(new ErrorHandler("User with email already exist", 400));
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        password: hashPassword,
        profileUrl: filename,
      },
    });
    if (!newUser) {
      return new ErrorHandler("Signup unsuccessful", 400);
    }
    res.status(200).json({
      status: "success",
      message: "Sign up successful",
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await prisma.user.findFirst({ where: { email } });
    if (!result) {
      return next(new ErrorHandler("User with email doesnot exist", 401));
    }
    const comparePassword = await bcrypt.compare(password, result.password);
    if (!comparePassword) {
      return next(new ErrorHandler("Password doesnot match", 401));
    }
    const token = generateToken(result.id);
    res.status(200).json({ token: token, message: "Successfully login" });
  }
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return next(new ErrorHandler("User doesnot exist with this email", 400));
    }
    const { resetToken, resetPasswordToken, resetPasswordExpire } =
      generateResetToken();
    try {
      sendEmail({
        email: user.email,
        subject: `Rojgar Sansar Password Recovery`,
        resetToken,
      });
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordToken: resetPasswordToken,
          resetPasswordExpire: resetPasswordExpire,
        },
      });
      res.status(200).json({
        status: "success",
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, password } = req.body;
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await prisma.user.findFirst({ where: { resetPasswordToken } });
    if (
      !user ||
      !user.resetPasswordExpire ||
      user.resetPasswordExpire < new Date()
    ) {
      return next(new ErrorHandler("Invalid or expired token", 400));
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashPassword,
        resetPasswordToken: null,
        resetPasswordExpire: null,
      },
    });
    res.status(200).json({
      status: "success",
      message: `Successfully reset password`,
    });
  }
);
