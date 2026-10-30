import { requireUser } from "../../middleware/auth";
import { catchAsync } from "../../utils/catchAsync";
import { PaginationQuery } from "../../utils/pagination";
import { JobListQuery } from "./job.schema";
import * as jobService from "./job.service";

export const listPublic = catchAsync(async (req, res) => {
  const result = await jobService.listPublic(req.query as unknown as JobListQuery);
  res.status(200).json({ status: "success", ...result });
});

export const listMine = catchAsync(async (req, res) => {
  const result = await jobService.listMine(
    req.query as unknown as PaginationQuery,
    requireUser(req)
  );
  res.status(200).json({ status: "success", ...result });
});

export const getDetail = catchAsync(async (req, res) => {
  const data = await jobService.getDetail(req.params.id, req.user);
  res.status(200).json({ status: "success", data });
});

export const getOne = catchAsync(async (req, res) => {
  const data = await jobService.getOwned(req.params.id, requireUser(req));
  res.status(200).json({ status: "success", data });
});

export const create = catchAsync(async (req, res) => {
  const data = await jobService.create(req.body, requireUser(req));
  res.status(201).json({ status: "success", message: "job create successful", data });
});

export const update = catchAsync(async (req, res) => {
  const data = await jobService.update(req.params.id, req.body, requireUser(req));
  res.status(200).json({ status: "success", message: "job update successful", data });
});

export const remove = catchAsync(async (req, res) => {
  await jobService.remove(req.params.id, requireUser(req));
  res.status(200).json({ status: "success", message: "delete job successful" });
});
