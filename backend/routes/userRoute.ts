import epxress from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signUp,
} from "../controller/userController";
const userRoutes = epxress.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.post("/forgotPassword", forgotPassword);
userRoutes.post("/resetPassword", resetPassword);

export default userRoutes;
