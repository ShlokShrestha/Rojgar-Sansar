import express from "express";
import {
  createJob,
  createJobCategory,
  getJobCategory,
  createCompany,
  getCompany,
  getAllJobs,
  deletejobCategory,
  updateJobCategory,
  updateCompany,
  deleteCompany,
  deleteJob,
  updateJob,
} from "../controller/jobController";
import {
  isAuthenitcatedUser,
  isAuthorizedRoles,
} from "../middleware/authMiddleware";
import { uploadImageMiddleWare } from "../middleware/uploadMiddleware";
const jobRoute = express.Router();

//Route for Company
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
jobRoute.put(
  "/updateCompany/:id",
  isAuthenitcatedUser,
  uploadImageMiddleWare.single("companyLogo"),
  isAuthorizedRoles("admin", "recruiter"),
  updateCompany
);
jobRoute.delete(
  "/deleteCompany",
  isAuthenitcatedUser,
  uploadImageMiddleWare.single("companyLogo"),
  isAuthorizedRoles("admin", "recruiter"),
  deleteCompany
);

//Route for JobCategory
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
jobRoute.put(
  "/updateJobCategory/:id",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  updateJobCategory
);
jobRoute.delete(
  "/deleteJobCategory",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  deletejobCategory
);

//Route for Job
jobRoute.post(
  "/createJob",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  createJob
);
jobRoute.get("/getAllJobs", getAllJobs);
jobRoute.put(
  "/updatejob/:id",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  updateJob
);
jobRoute.delete(
  "/deleteJob",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  deleteJob
);

export default jobRoute;
