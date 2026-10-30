import { requireUser } from "../../middleware/auth";
import { catchAsync } from "../../utils/catchAsync";
import { PaginationQuery } from "../../utils/pagination";
import * as applicationService from "./application.service";

export const apply = catchAsync(async (req, res) => {
  await applicationService.apply(req.body.jobId, requireUser(req));
  res.status(201).json({ status: "success", message: "Successful applied job" });
});

export const listForJob = catchAsync(async (req, res) => {
  const result = await applicationService.listForJob(
    req.params.id,
    req.query as unknown as PaginationQuery,
    requireUser(req)
  );
  res.status(200).json({ status: "success", ...result });
});

export const dailyCounts = catchAsync(async (req, res) => {
  const data = await applicationService.dailyCounts(requireUser(req));
  res.status(200).json({ status: "success", data });
});

export const updateStatus = catchAsync(async (req, res) => {
  await applicationService.updateStatus(req.body, requireUser(req));
  res.status(200).json({ status: "success", message: "Applicant status update successful" });
});
