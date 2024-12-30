import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import prisma from "../prisma/prismaClient";
import AppError from "../utils/appError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (payload: string | null): string | null => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error(
      "JWT_SECRET_KEY is not defined in the environment variables."
    );
  }
  if (!payload) {
    console.error("Payload cannot be null.");
    return null;
  }
  try {
    const token = jwt.sign(
      { data: payload },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // Default to 1 hour if not specified
    );

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return next(new AppError("Please fill form properly", 400));
    }
    const existanceUser = await prisma.user.findFirst({ where: { email } });
    if (existanceUser) {
      return next(new AppError("User with email already exist", 400));
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        password: hashPassword,
      },
    });
    if (!newUser) {
      return new AppError("Signup unsuccessfull", 400);
    }
    res.status(200).json({
      status: "success",
      message: "Sign up successfull",
    });
  }
);

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await prisma.user.findFirst({ where: { email } });
  if (!result) {
    return next(new AppError("User with email doesnot exist", 401));
  }
  const comparePassword = await bcrypt.compare(password, result.password);
  if (!comparePassword) {
    return next(new AppError("Password doesnot match", 401));
  }
  const token = generateToken(result.id);
  res.status(200).json({ token: token, message: "Successfully login" });
});
