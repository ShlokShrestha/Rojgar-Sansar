import { Router } from "express";
import applicationRoutes from "../modules/application/application.routes";
import authRoutes from "../modules/auth/auth.routes";
import categoryRoutes from "../modules/category/category.routes";
import companyRoutes from "../modules/company/company.routes";
import jobRoutes from "../modules/job/job.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
// Company, category, job and application endpoints all live under /job
// to keep the URLs the frontend already uses.
router.use("/job", companyRoutes, categoryRoutes, jobRoutes, applicationRoutes);

export default router;
