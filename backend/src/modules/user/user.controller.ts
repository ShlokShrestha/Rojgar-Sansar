import { requireUser } from "../../middleware/auth";
import { catchAsync } from "../../utils/catchAsync";
import { PaginationQuery } from "../../utils/pagination";
import * as userService from "./user.service";

export const getProfile = catchAsync(async (req, res) => {
  const data = await userService.getProfile(requireUser(req).id);
  res.status(200).json({ status: "success", data });
});

export const updateProfileImage = catchAsync(async (req, res) => {
  await userService.updateProfileImage(requireUser(req).id, req.file);
  res.status(200).json({ status: "success", message: "Update profile successful" });
});

export const updateProfile = catchAsync(async (req, res) => {
  await userService.updateProfile(requireUser(req).id, req.body, req.file);
  res.status(200).json({ status: "success", message: "Update profile successful" });
});

export const updatePassword = catchAsync(async (req, res) => {
  await userService.updatePassword(requireUser(req).id, req.body);
  res.status(200).json({ status: "success", message: "Successfully update password" });
});

export const listUsers = catchAsync(async (req, res) => {
  const result = await userService.listUsers(req.query as unknown as PaginationQuery);
  res.status(200).json({ status: "success", ...result });
});

export const getUser = catchAsync(async (req, res) => {
  const data = await userService.getUser(req.params.id);
  res.status(200).json({ status: "success", data });
});

export const updateUser = catchAsync(async (req, res) => {
  await userService.adminUpdateUser(req.body);
  res.status(200).json({ status: "success", message: "Update user successful" });
});

export const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.body.id, requireUser(req).id);
  res.status(200).json({ status: "success", message: "User delete successfully" });
});
