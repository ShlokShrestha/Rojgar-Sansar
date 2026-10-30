import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import { validate } from "../../middleware/validate";
import { paginationQuerySchema } from "../../utils/pagination";
import { idParams } from "../../utils/schemas";
import * as category from "./category.controller";
import { categorySchema } from "./category.schema";

const router = Router();
const recruiterOnly = [authenticate, authorize("admin", "recruiter")];

router.get("/jobCategory", validate({ query: paginationQuerySchema }), category.list);
router.get(
  "/myJobCategory",
  ...recruiterOnly,
  validate({ query: paginationQuerySchema }),
  category.listMine
);
router.get("/singleCategory/:id", ...recruiterOnly, validate({ params: idParams }), category.getOne);
router.post("/createJobCategory", ...recruiterOnly, validate({ body: categorySchema }), category.create);
router.put(
  "/updateJobCategory/:id",
  ...recruiterOnly,
  validate({ params: idParams, body: categorySchema }),
  category.update
);
router.delete(
  "/deleteJobCategory/:id",
  ...recruiterOnly,
  validate({ params: idParams }),
  category.remove
);

export default router;
