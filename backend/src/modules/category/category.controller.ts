import { requireUser } from "../../middleware/auth";
import { catchAsync } from "../../utils/catchAsync";
import { PaginationQuery } from "../../utils/pagination";
import * as categoryService from "./category.service";

export const list = catchAsync(async (req, res) => {
  const result = await categoryService.list(req.query as unknown as PaginationQuery);
  res.status(200).json({ status: "success", ...result });
});

export const listMine = catchAsync(async (req, res) => {
  const result = await categoryService.list(
    req.query as unknown as PaginationQuery,
    requireUser(req).id
  );
  res.status(200).json({ status: "success", ...result });
});

export const getOne = catchAsync(async (req, res) => {
  const data = await categoryService.getOwned(req.params.id, requireUser(req));
  res.status(200).json({ status: "success", data });
});

export const create = catchAsync(async (req, res) => {
  const data = await categoryService.create(req.body, requireUser(req));
  res.status(201).json({ status: "success", message: "category create successful", data });
});

export const update = catchAsync(async (req, res) => {
  const data = await categoryService.update(req.params.id, req.body, requireUser(req));
  res.status(200).json({ status: "success", message: "category update successful", data });
});

export const remove = catchAsync(async (req, res) => {
  await categoryService.remove(req.params.id, requireUser(req));
  res.status(200).json({ status: "success", message: "delete category successful" });
});
