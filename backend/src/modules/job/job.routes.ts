import { Router } from "express";
import { authenticate, authorize, optionalAuth } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { paginationQuerySchema } from "../../utils/pagination";
import { idParams } from "../../utils/schemas";
import * as job from "./job.controller";
import { createJobSchema, jobListQuerySchema, updateJobSchema } from "./job.schema";

const router = Router();
const recruiterOnly = [authenticate, authorize("admin", "recruiter")];

router.get("/getAllJobs", validate({ query: jobListQuerySchema }), job.listPublic);
router.get("/singleJobDetail/:id", optionalAuth, validate({ params: idParams }), job.getDetail);
router.get("/myJobs", ...recruiterOnly, validate({ query: paginationQuerySchema }), job.listMine);
router.get("/singleJob/:id", ...recruiterOnly, validate({ params: idParams }), job.getOne);
router.post("/createJob", ...recruiterOnly, validate({ body: createJobSchema }), job.create);
router.put(
  "/updateJob/:id",
  ...recruiterOnly,
  validate({ params: idParams, body: updateJobSchema }),
  job.update
);
router.delete("/deleteJob/:id", ...recruiterOnly, validate({ params: idParams }), job.remove);

export default router;
