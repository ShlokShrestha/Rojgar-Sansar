import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import { uploadImage } from "../../middleware/upload";
import { validate } from "../../middleware/validate";
import { paginationQuerySchema } from "../../utils/pagination";
import { idParams } from "../../utils/schemas";
import * as company from "./company.controller";
import { createCompanySchema, updateCompanySchema } from "./company.schema";

const router = Router();
const recruiterOnly = [authenticate, authorize("admin", "recruiter")];

router.get("/getCompany", validate({ query: paginationQuerySchema }), company.list);
router.get(
  "/myCompany",
  ...recruiterOnly,
  validate({ query: paginationQuerySchema }),
  company.listMine
);
router.get("/singleCompany/:id", ...recruiterOnly, validate({ params: idParams }), company.getOne);
// Auth runs before multer so unauthorized uploads are rejected without parsing the file.
router.post(
  "/createCompany",
  ...recruiterOnly,
  uploadImage.single("companyLogo"),
  validate({ body: createCompanySchema }),
  company.create
);
router.put(
  "/updateCompany/:id",
  ...recruiterOnly,
  uploadImage.single("companyLogo"),
  validate({ params: idParams, body: updateCompanySchema }),
  company.update
);
router.delete("/deleteCompany/:id", ...recruiterOnly, validate({ params: idParams }), company.remove);

export default router;
