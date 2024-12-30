import epxress from "express";
import { login, signUp } from "../controller/authController";
const authRoutes = epxress.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);

export default authRoutes;
