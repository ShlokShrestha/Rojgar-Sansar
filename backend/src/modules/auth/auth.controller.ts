import { catchAsync } from "../../utils/catchAsync";
import * as authService from "./auth.service";

export const signUp = catchAsync(async (req, res) => {
  await authService.signUp(req.body, req.file);
  res.status(201).json({ status: "success", message: "Sign up successful" });
});

export const login = catchAsync(async (req, res) => {
  const { token, user } = await authService.login(req.body);
  res.status(200).json({ token, message: "Successfully login", data: user });
});

export const forgotPassword = catchAsync(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  res.status(200).json({
    status: "success",
    message: "If an account exists with this email, a reset code has been sent",
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body);
  res.status(200).json({ status: "success", message: "Successfully reset password" });
});
