import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middleware/catchAsync";
import ErrorHandler from "../utils/errorHandler";
import prisma from "../prisma/prismaClient";
import { ExpressRequest } from "../middleware/authMiddleware";
import { deleteImageKit, uploadImageKit } from "../utils/imageKitUpload";
import { ExpressResponse } from "../middleware/PaginationFilterMiddleware";

//CRUD JobCategory -- Admin /Recuiter
export const createJobCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    if (!title) {
      return next(new ErrorHandler("Please add category name", 400));
    }
    const newJobCategory = await prisma.jobCategory.create({ data: { title } });
    if (!newJobCategory) {
      return next(new ErrorHandler("create category unsuccesful", 400));
    }
    res
      .status(201)
      .json({ status: "success", message: "category create successful" });
  }
);
export const getJobCategory = catchAsync(
  async (req: Request, res: ExpressResponse, next: NextFunction) => {
    const { data, pagination } = res.paginatedResult;
    res.status(200).json({
      status: "success",
      data: data,
      pagination: pagination,
    });
  }
);
export const getSingleJobCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const newJobCategory = await prisma.jobCategory.findUnique({
      where: { id: id },
    });
    res.status(200).json({
      status: "success",
      data: newJobCategory,
    });
  }
);
export const updateJobCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { title } = req.body;
    const newJobCategory = await prisma.jobCategory.update({
      where: { id: id },
      data: { title },
    });
    if (!newJobCategory) {
      return next(new ErrorHandler("update category unsuccesful", 400));
    }
    res
      .status(200)
      .json({ status: "success", message: "category update successful" });
  }
);
export const deletejobCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const category = await prisma.jobCategory.findUnique({ where: { id: id } });
    if (!category) {
      return next(new ErrorHandler("Category doesnot exist with this id", 400));
    }
    await prisma.jobCategory.delete({ where: { id: id } });
    res.status(200).json({
      status: "success",
      message: "delete category successful",
    });
  }
);

//CRUD company category -- User / Admin /Recuiter
export const getCompany = catchAsync(
  async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const { data, pagination } = res.paginatedResult;
    res.status(200).json({
      status: "success",
      data: data,
      pagination: pagination,
    });
  }
);
export const getSingleCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const getSingleCompany = await prisma.company.findUnique({
      where: { id: id },
    });
    res.status(200).json({
      status: "success",
      data: getSingleCompany,
    });
  }
);
export const createCompany = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { title, location } = req.body;
    const file = req.file;
    if (!title && !location && !file) {
      return next(
        new ErrorHandler("Please add company name, logo, location", 400)
      );
    }
    const userId = req.user?.id ?? "";
    const uploadParams = {
      file: file?.buffer,
      fileName: file?.originalname,
      folder: "/CompanyLogo",
      useUniqueFileName: true,
    };
    const imageUrl = await uploadImageKit(uploadParams);
    const newCompany = await prisma.company.create({
      data: {
        title: title,
        location: location,
        logoUrl: imageUrl?.url,
        logoId: imageUrl?.fileId,
        userId: userId,
      },
    });
    if (!newCompany) {
      return next(new ErrorHandler("create company unsuccesful", 400));
    }
    res
      .status(201)
      .json({ status: "success", message: "company create successful" });
  }
);
export const updateCompany = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    let { title, location } = req.body;
    const userId = req.user?.id ?? "";
    const company = await prisma.company.findUnique({ where: { id: id } });
    if (!company) {
      return next(new ErrorHandler("Company doesnot exist", 400));
    }
    let logoUrl = company?.logoUrl;
    let logoId = company?.logoId;
    if (req?.file) {
      if (company.logoId) {
        await deleteImageKit(company.logoId);
      }
      const uploadParams = {
        file: req.file?.buffer,
        fileName: req.file?.originalname,
        folder: "/CompanyLogo",
        useUniqueFileName: true,
      };
      let imageUrl = await uploadImageKit(uploadParams);
      logoUrl = imageUrl.url;
      logoId = imageUrl.fileId;
    }
    const data = await prisma.company.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        location: location,
        logoUrl: logoUrl,
        logoId: logoId,
        userId: userId,
      },
    });
    res.status(200).json({
      status: "success",
      message: "company update successful",
      data: data,
    });
  }
);
export const deleteCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const company = await prisma.company.findUnique({ where: { id: id } });
    if (!company) {
      return next(new ErrorHandler("Company doesnot exist with this id", 400));
    }
    await deleteImageKit(company.logoId);
    await prisma.company.delete({ where: { id: id } });
    res.status(200).json({
      status: "success",
      message: "delete company successful",
    });
  }
);

//CRUD job -- User / Admin /Recuiter
export const getAllJobs = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { skip, take, search } = req.query;
    const skipInt = skip ? parseInt(skip as string, 10) : 0;
    const takeInt = take ? parseInt(take as string, 10) : 10;
    const allCompany = await prisma.job.findMany({
      where: {
        title: {
          contains: search as string,
          mode: "insensitive",
        },
      },
      skip: skipInt,
      take: takeInt,
      include: { company: true, jobCategory: true, application: true },
    });
    res.status(201).json({
      status: "success",
      data: allCompany,
    });
  }
);
export const getSingleJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const getSingleJob = await prisma.job.findUnique({
      where: { id: id },
    });
    res.status(200).json({
      status: "success",
      data: getSingleJob,
    });
  }
);
export const createJob = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { title, description, location, salary, jobCategoryId, companyId } =
      req.body;
    if (
      !title &&
      !description &&
      !location &&
      !salary &&
      !jobCategoryId &&
      !companyId
    ) {
      return next(new ErrorHandler("Please add required field", 400));
    }
    const createdId = req.user?.id ?? "";
    const newJob = await prisma.job.create({
      data: {
        title: title,
        description: description,
        location: location,
        salary: salary,
        createdId: createdId,
        jobCategoryId: jobCategoryId,
        companyId: companyId,
      },
    });
    if (!newJob) {
      return next(new ErrorHandler("create job unsuccesful", 400));
    }
    res
      .status(201)
      .json({ status: "success", message: "job create successful" });
  }
);
export const updateJob = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, description, location, salary, jobCategoryId, companyId } =
      req.body;
    const job = await prisma.job.findUnique({ where: { id: id } });
    if (!job) {
      return next(new ErrorHandler("job doesnot exist", 400));
    }
    const createdId = req.user?.id ?? "";
    const updateJob = await prisma.job.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
        location: location,
        salary: salary,
        createdId: createdId,
        jobCategoryId: jobCategoryId,
        companyId: companyId,
      },
    });
    if (!updateJob) {
      return next(new ErrorHandler("update job unsuccesful", 400));
    }
    res
      .status(201)
      .json({ status: "success", message: "job update successful" });
  }
);
export const deleteJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const job = await prisma.job.findUnique({ where: { id: id } });
    if (!job) {
      return next(new ErrorHandler("Job doesnot exist with this id", 400));
    }
    await prisma.job.delete({ where: { id: id } });
    res.status(200).json({
      status: "success",
      message: "delete company successful",
    });
  }
);

export const appliedJob = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { jobId } = req.body;
    if (!jobId) {
      return next(new ErrorHandler("Please add required field", 400));
    }
    const getSingleJob = await prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true, jobCategory: true },
    });
    const userId = req.user?.id ?? "";
    const appliedJob = await prisma.application.create({
      data: {
        jobId: jobId,
        userId: userId,
        companyTitle: getSingleJob?.company?.title ?? "",
        jobTitle: getSingleJob?.title ?? "",
      },
    });
    res.status(200).json({ status: "success", data: appliedJob });
  }
);
