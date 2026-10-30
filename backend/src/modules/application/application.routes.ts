import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { paginationQuerySchema } from "../../utils/pagination";
import { idParams } from "../../utils/schemas";
import * as application from "./application.controller";
import { applySchema, updateStatusSchema } from "./application.schema";

const router = Router();
const recruiterOnly = [authenticate, authorize("admin", "recruiter")];

router.post(
  "/appliedJob",
  authenticate,
  authorize("user"),
  validate({ body: applySchema }),
  application.apply
);
router.get(
  "/getJobApplicant/:id",
  ...recruiterOnly,
  validate({ params: idParams, query: paginationQuerySchema }),
  application.listForJob
);
// Only the recruiter who owns the job (or an admin) may change a status.
router.put(
  "/updateApplicantStatus",
  ...recruiterOnly,
  validate({ body: updateStatusSchema }),
  application.updateStatus
);
router.get("/dashBoardApplicantList", ...recruiterOnly, application.dailyCounts);

export default router;
