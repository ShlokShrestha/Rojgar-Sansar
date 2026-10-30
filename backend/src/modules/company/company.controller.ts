import { requireUser } from "../../middleware/auth";
import { catchAsync } from "../../utils/catchAsync";
import { PaginationQuery } from "../../utils/pagination";
import * as companyService from "./company.service";

export const list = catchAsync(async (req, res) => {
  const result = await companyService.list(req.query as unknown as PaginationQuery);
  res.status(200).json({ status: "success", ...result });
});

export const listMine = catchAsync(async (req, res) => {
  const result = await companyService.list(
    req.query as unknown as PaginationQuery,
    requireUser(req).id
  );
  res.status(200).json({ status: "success", ...result });
});

export const getOne = catchAsync(async (req, res) => {
  const data = await companyService.getOwned(req.params.id, requireUser(req));
  res.status(200).json({ status: "success", data });
});

export const create = catchAsync(async (req, res) => {
  const data = await companyService.create(req.body, requireUser(req), req.file);
  res.status(201).json({ status: "success", message: "company create successful", data });
});

export const update = catchAsync(async (req, res) => {
  const data = await companyService.update(req.params.id, req.body, requireUser(req), req.file);
  res.status(200).json({ status: "success", message: "company update successful", data });
});

export const remove = catchAsync(async (req, res) => {
  await companyService.remove(req.params.id, requireUser(req));
  res.status(200).json({ status: "success", message: "delete company successful" });
});
