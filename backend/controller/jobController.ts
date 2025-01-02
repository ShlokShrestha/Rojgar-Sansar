import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middleware/catchAsync";
import ErrorHandler from "../utils/errorHandler";
import prisma from "../prisma/prismaClient";
import { ExpressRequest } from "../middleware/authMiddleware";
import { uploadImageKit } from "../utils/imageKitUpload";

//Create job category
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
//Get job category -- User / Admin /Recuiter
export const getJobCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newJobCategory = await prisma.jobCategory.findMany();
    res.status(201).json({
      status: "success",
      data: newJobCategory,
    });
  }
);

//Get company category -- User / Admin /Recuiter
export const getCompany = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const allCompany = await prisma.company.findMany({
      where: { userId: req?.user?.id },
    });
    res.status(201).json({
      status: "success",
      data: allCompany,
    });
  }
);
//Create company -- Admin /Recuiter
export const createCompany = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { name, location } = req.body;
    const file = req.file;
    if (!name && !location && !file) {
      return next(new ErrorHandler("Please add category name", 400));
    }
    const userId = req.user?.id ?? "";
    const uploadParams = {
      file: file?.buffer,
      fileName: file?.originalname,
      folder: "/CompanyLogo",
      useUniqueFileName: true,
    };
    const imageUrl = await uploadImageKit(uploadParams);
    const newJobCategory = await prisma.company.create({
      data: {
        name: name,
        location: location,
        logoUrl: imageUrl?.url,
        logoId: imageUrl?.fileId,
        userId: userId,
      },
    });
    if (!newJobCategory) {
      return next(new ErrorHandler("create category unsuccesful", 400));
    }
    res
      .status(201)
      .json({ status: "success", message: "company create successful" });
  }
);

//Create job -- Admin /Recuiter
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

//Get company category -- User / Admin /Recuiter
export const getAllJobs = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const allCompany = await prisma.job.findMany({
      include: { company: true, jobCategory: true },
    });
    res.status(201).json({
      status: "success",
      data: allCompany,
    });
  }
);
