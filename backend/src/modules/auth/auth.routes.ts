import { Router } from "express";
import { authLimiter } from "../../middleware/rateLimit";
import { uploadImage } from "../../middleware/upload";
import { validate } from "../../middleware/validate";
import * as auth from "./auth.controller";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signUpSchema,
} from "./auth.schema";

const router = Router();

router.post(
  "/signup",
  uploadImage.single("profileImage"),
  validate({ body: signUpSchema }),
  auth.signUp
);
router.post("/login", authLimiter, validate({ body: loginSchema }), auth.login);
router.post(
  "/forgotPassword",
  authLimiter,
  validate({ body: forgotPasswordSchema }),
  auth.forgotPassword
);
router.post(
  "/resetPassword",
  authLimiter,
  validate({ body: resetPasswordSchema }),
  auth.resetPassword
);

export default router;
