import express from "express";
import {
  forgotPassword,
  getAllUser,
  getSingleUser,
  login,
  resetPassword,
  signUp,
  userProfile,
} from "../controller/userController";
import { isAuthenitcatedUser, isAuthorizedRoles } from "../middleware/auth";
const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.post("/forgotPassword", forgotPassword);
userRoutes.post("/resetPassword", resetPassword);
userRoutes.get(
  "/getAllUser",
  isAuthenitcatedUser,
  isAuthorizedRoles("ADMIN"),
  getAllUser
);
userRoutes.get("/getSingleUser/:id", isAuthenitcatedUser, getSingleUser);
userRoutes.get("/profile", isAuthenitcatedUser, userProfile);

export default userRoutes;
