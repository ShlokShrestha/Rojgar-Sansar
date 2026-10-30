import { z } from "zod";
import { WorkType } from "@prisma/client";
import { paginationFields, toPaginationQuery } from "../../utils/pagination";
import { requiredText, stringOrArray } from "../../utils/schemas";

const jobCategoryId = z.preprocess(
  (v) => (v === "" ? null : v),
  z.string().min(1).nullable().optional()
);

export const createJobSchema = z.object({
  title: requiredText("Title"),
  description: requiredText("Description"),
  salary: requiredText("Salary"),
  companyId: requiredText("Company"),
  jobCategoryId,
  numberOfHires: z.coerce
    .number({ invalid_type_error: "Number of hires must be a number" })
    .int()
    .min(1, "Number of hires must be at least 1"),
  workType: z.nativeEnum(WorkType).default(WorkType.fullTime),
});

export const updateJobSchema = createJobSchema.partial();

export const jobListQuerySchema = paginationFields
  .extend({ category: stringOrArray, location: stringOrArray })
  .transform(({ category, location, ...pagination }) => ({
    ...toPaginationQuery(pagination),
    category,
    location,
  }));

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobListQuery = z.infer<typeof jobListQuerySchema>;
