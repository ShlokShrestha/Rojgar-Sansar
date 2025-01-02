import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateProfile,
  updateUser,
  userProfile,
} from "../controller/userController";
import { isAuthorizedRoles } from "../middleware/authMiddleware";
import { uploadImageMiddleWare } from "../middleware/uploadMiddleware";
const userRoutes = express.Router();

//user route
userRoutes.get("/profile", userProfile);
userRoutes.patch(
  "/updateProfile",
  uploadImageMiddleWare.single("profileImage"),
  updateProfile
);
//admin route
userRoutes.get("/getAllUser", isAuthorizedRoles("admin"), getAllUser);
userRoutes.get("/getSingleUser/:id", isAuthorizedRoles("admin"), getSingleUser);
userRoutes.put("/updateUser", isAuthorizedRoles("admin"), updateUser);
userRoutes.delete("/deleteUser", isAuthorizedRoles("admin"), deleteUser);

export default userRoutes;
