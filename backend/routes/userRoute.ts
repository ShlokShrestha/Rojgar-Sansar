import express from "express";
import {
  getAllUser,
  getSingleUser,
  userProfile,
} from "../controller/userController";
import { isAuthenitcatedUser, isAuthorizedRoles } from "../middleware/auth";
const userRoutes = express.Router();

//user route
userRoutes.get(
  "/getAllUser",
  isAuthenitcatedUser,
  isAuthorizedRoles("ADMIN"),
  getAllUser
);
userRoutes.get("/getSingleUser/:id", isAuthenitcatedUser, getSingleUser);
userRoutes.get("/profile", isAuthenitcatedUser, userProfile);

export default userRoutes;
