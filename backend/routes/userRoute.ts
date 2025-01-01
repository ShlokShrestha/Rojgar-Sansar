import express from "express";
import {
  getAllUser,
  getSingleUser,
  userProfile,
} from "../controller/userController";
import { isAuthorizedRoles } from "../middleware/auth";
const userRoutes = express.Router();

//user route
userRoutes.get("/getAllUser", isAuthorizedRoles("ADMIN"), getAllUser);
userRoutes.get("/getSingleUser/:id", isAuthorizedRoles("ADMIN"), getSingleUser);
userRoutes.get("/profile", userProfile);

export default userRoutes;
