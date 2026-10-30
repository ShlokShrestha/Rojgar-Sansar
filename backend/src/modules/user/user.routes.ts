import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import { uploadImage, uploadResume } from "../../middleware/upload";
import { validate } from "../../middleware/validate";
import { paginationQuerySchema } from "../../utils/pagination";
import { bodyId, idParams } from "../../utils/schemas";
import * as user from "./user.controller";
import {
  adminUpdateUserSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "./user.schema";

const router = Router();

// Every /user route requires a logged-in user.
router.use(authenticate);

router.get("/profile", user.getProfile);
router.put(
  "/updateProfile",
  uploadResume.single("resume"),
  validate({ body: updateProfileSchema }),
  user.updateProfile
);
router.put("/updateProfileImage", uploadImage.single("profileImage"), user.updateProfileImage);
router.put("/updatePassword", validate({ body: updatePasswordSchema }), user.updatePassword);

// Admin
router.get(
  "/getAllUser",
  authorize("admin"),
  validate({ query: paginationQuerySchema }),
  user.listUsers
);
router.get("/getSingleUser/:id", authorize("admin"), validate({ params: idParams }), user.getUser);
router.put("/updateUser", authorize("admin"), validate({ body: adminUpdateUserSchema }), user.updateUser);
router.delete("/deleteUser", authorize("admin"), validate({ body: bodyId }), user.deleteUser);

export default router;
