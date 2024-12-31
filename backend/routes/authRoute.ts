import epxress from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signUp,
} from "../controller/userController";
const authRoutes = epxress.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.post("/forgotPassword", forgotPassword);
authRoutes.post("/resetPassword", resetPassword);

export default authRoutes;
