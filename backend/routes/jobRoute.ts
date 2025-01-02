import express from "express";
import {
  createJob,
  createJobCategory,
  getJobCategory,
  createCompany,
  getCompany,
  getAllJobs,
} from "../controller/jobController";
import {
  isAuthenitcatedUser,
  isAuthorizedRoles,
} from "../middleware/authMiddleware";
import { uploadImageMiddleWare } from "../middleware/uploadMiddleware";
const jobRoute = express.Router();

jobRoute.post(
  "/createJobCategory",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  createJobCategory
);
jobRoute.get(
  "/jobCategory",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  getJobCategory
);

jobRoute.post(
  "/createCompany",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  uploadImageMiddleWare.single("companyLogo"),
  createCompany
);
jobRoute.get(
  "/getCompany",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  getCompany
);

jobRoute.post(
  "/createJob",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  createJob
);
jobRoute.get("/getAllJobs", getAllJobs);

export default jobRoute;
