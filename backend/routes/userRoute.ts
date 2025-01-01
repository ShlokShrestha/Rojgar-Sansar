import express from "express";
import {
  getAllUser,
  getSingleUser,
  userProfile,
} from "../controller/userController";
import { isAuthorizedRoles } from "../middleware/auth";
const userRoutes = express.Router();

//user route
userRoutes.get("/getAllUser", getAllUser);
userRoutes.get("/getSingleUser/:id", isAuthorizedRoles("admin"), getSingleUser);
userRoutes.get("/profile", userProfile);

export default userRoutes;
