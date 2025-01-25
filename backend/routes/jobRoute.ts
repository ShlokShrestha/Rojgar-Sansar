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
  getSingleJobCategory,
  getSingleCompany,
  getSingleJob,
  appliedJob,
  getApplicant,
  updateApplicantStatus,
  getSingleDetailJob,
} from "../controller/jobController";
import {
  isAuthenitcatedUser,
  isAuthorizedRoles,
} from "../middleware/authMiddleware";
import { uploadImageMiddleWare } from "../middleware/uploadMiddleware";
import prisma from "../prisma/prismaClient";
import { paginationFilterMiddleWare } from "../middleware/PaginationFilterMiddleware";
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
  paginationFilterMiddleWare(prisma.company),
  isAuthorizedRoles("admin", "recruiter"),
  getCompany
);
jobRoute.get(
  "/singleCompany/:id",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  getSingleCompany
);
jobRoute.put(
  "/updateCompany/:id",
  isAuthenitcatedUser,
  uploadImageMiddleWare.single("companyLogo"),
  isAuthorizedRoles("admin", "recruiter"),
  updateCompany
);
jobRoute.delete(
  "/deleteCompany/:id",
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
  paginationFilterMiddleWare(prisma.jobCategory),
  getJobCategory
);
jobRoute.get(
  "/singleCategory/:id",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  getSingleJobCategory
);
jobRoute.put(
  "/updateJobCategory/:id",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  updateJobCategory
);
jobRoute.delete(
  "/deleteJobCategory/:id",
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
jobRoute.get("/singleJobDetail/:id", getSingleDetailJob);
jobRoute.put(
  "/updatejob/:id",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  updateJob
);
jobRoute.get(
  "/singleJob/:id",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  getSingleJob
);
jobRoute.delete(
  "/deleteJob/:id",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  deleteJob
);

jobRoute.post(
  "/appliedJob",
  isAuthenitcatedUser,
  isAuthorizedRoles("user", "recruiter"),
  appliedJob
);
jobRoute.get(
  "/getJobApplicant/:id",
  isAuthenitcatedUser,
  isAuthorizedRoles("admin", "recruiter"),
  getApplicant
);
jobRoute.put(
  "/updateApplicantStatus",
  isAuthenitcatedUser,
  isAuthorizedRoles("user", "recruiter"),
  updateApplicantStatus
);

export default jobRoute;
