import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../middleware/catchAsync";
import ErrorHandler from "../utils/errorHandler";
import prisma from "../prisma/prismaClient";
import { ExpressRequest } from "../middleware/authMiddleware";
import { deleteImageKit, uploadImageKit } from "../utils/imageKitUpload";
import { paginationFilterHelper } from "../helpers/paginationFilterHelper";

//CRUD JobCategory -- Admin /Recuiter
export const createJobCategory = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { title } = req.body;
    if (!title) {
      return next(new ErrorHandler("Please add category name", 400));
    }
    const userId = req.user?.id ?? "";
    const newJobCategory = await prisma.jobCategory.create({
      data: { title, userId: userId },
    });
    if (!newJobCategory) {
      return next(new ErrorHandler("create category unsuccesful", 400));
    }
    res
      .status(201)
      .json({ status: "success", message: "category create successful" });
  }
);
export const getJobCategory = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { skip, take, search } = req.query;

    const skipInt = skip ? parseInt(skip as string, 10) : 0;
    const takeInt = take ? parseInt(take as string, 10) : 10;

    const filterOptions = search
      ? {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        }
      : {};
    const { data, pagination } = await paginationFilterHelper(
      prisma.jobCategory,
      filterOptions,
      skipInt,
      takeInt
    );
    res.status(200).json({
      status: "success",
      data: data,
      pagination: pagination,
    });
  }
);
export const getMyJobCategory = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { skip, take, search } = req.query;
    const skipInt = skip ? parseInt(skip as string, 10) : 0;
    const takeInt = take ? parseInt(take as string, 10) : 10;
    const filterOptions = search
      ? {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        }
      : {};
    const userId = req?.user?.id ?? "";
    const { data, pagination } = await paginationFilterHelper(
      prisma.jobCategory,
      { ...filterOptions, userId: userId },
      skipInt,
      takeInt
    );
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
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { skip, take, search } = req.query;

    const skipInt = skip ? parseInt(skip as string, 10) : 0;
    const takeInt = take ? parseInt(take as string, 10) : 10;

    const filterOptions = search
      ? {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        }
      : {};
    const { data, pagination } = await paginationFilterHelper(
      prisma.company,
      filterOptions,
      skipInt,
      takeInt
    );
    res.status(200).json({
      status: "success",
      data: data,
      pagination: pagination,
    });
  }
);
export const getMyCompany = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { skip, take, search } = req.query;
    const skipInt = skip ? parseInt(skip as string, 10) : 0;
    const takeInt = take ? parseInt(take as string, 10) : 10;
    const filterOptions = search
      ? {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        }
      : {};
    const userId = req?.user?.id ?? "";
    const { data, pagination } = await paginationFilterHelper(
      prisma.company,
      { ...filterOptions, userId: userId },
      skipInt,
      takeInt
    );
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
    const { skip, take, search, category = "", location } = req.query;
    const skipInt = skip ? parseInt(skip as string, 10) : 0;
    const takeInt = take ? parseInt(take as string, 10) : 10;
    const filterOptions: any = {
      OR: [
        {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          company: {
            title: {
              contains: search as string,
              mode: "insensitive",
            },
          },
        },
      ],
    };
    if (category && Array.isArray(category)) {
      filterOptions.jobCategory = {
        title: {
          in: category.map((cat: any) => cat.trim()),
          mode: "insensitive",
        },
      };
    } else if (category) {
      filterOptions.jobCategory = {
        title: {
          contains: category as string,
          mode: "insensitive",
        },
      };
    }
    if (location && Array.isArray(location)) {
      filterOptions.company = {
        location: {
          in: location.map((cat: any) => cat.trim()),
          mode: "insensitive",
        },
      };
    } else if (location) {
      filterOptions.company = {
        location: {
          contains: location as string,
          mode: "insensitive",
        },
      };
    }

    const allCompany = await prisma.job.findMany({
      where: filterOptions,
      skip: skipInt * takeInt,
      take: takeInt,
      include: { company: true, jobCategory: true },
    });
    const totalRecords = await prisma.job.count({ where: filterOptions });
    const hasNextPage = skipInt * takeInt + takeInt < totalRecords;
    const hasPrevPage = skipInt > 0;
    res.status(201).json({
      status: "success",
      data: allCompany,
      pagination: {
        currentPage: Math.floor(skipInt / takeInt) + 1,
        hasPrevPage,
        hasNextPage,
        totalRecords,
      },
    });
  }
);
export const myAllJobs = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { skip, take, search } = req.query;
    const skipInt = skip ? parseInt(skip as string, 10) : 0;
    const takeInt = take ? parseInt(take as string, 10) : 10;
    const filterOptions = search
      ? {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        }
      : {};
    const userId = req?.user?.id ?? "";
    const { data, pagination } = await paginationFilterHelper(
      prisma.job,
      { ...filterOptions, userId: userId },
      skipInt,
      takeInt
    );
    res.status(200).json({
      status: "success",
      data: data,
      pagination: pagination,
    });
  }
);
export const getSingleDetailJob = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const getSingleDetailJob = await prisma.job.findUnique({
      where: { id: id },
      include: { company: true, jobCategory: true, application: true },
    });
    res.status(200).json({
      status: "success",
      data: getSingleDetailJob,
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
    const {
      title,
      description,
      salary,
      jobCategoryId,
      companyId,
      numberOfHires,
      workType,
    } = req.body;
    if (
      !title &&
      !description &&
      !salary &&
      !jobCategoryId &&
      !companyId &&
      !numberOfHires &&
      !workType
    ) {
      return next(new ErrorHandler("Please add required field", 400));
    }
    const userId = req.user?.id ?? "";
    const newJob = await prisma.job.create({
      data: {
        title: title,
        description: description,
        salary: salary,
        userId: userId,
        jobCategoryId: jobCategoryId,
        companyId: companyId,
        numberOfHires: numberOfHires,
        workType: workType,
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
    const {
      title,
      description,
      salary,
      jobCategoryId,
      companyId,
      numberOfHires,
      workType,
    } = req.body;
    const job = await prisma.job.findUnique({ where: { id: id } });
    if (!job) {
      return next(new ErrorHandler("job doesnot exist", 400));
    }
    const userId = req.user?.id ?? "";
    const updateJob = await prisma.job.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
        salary: salary,
        userId: userId,
        jobCategoryId: jobCategoryId,
        companyId: companyId,
        numberOfHires: numberOfHires,
        workType: workType,
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
    if (!getSingleJob) {
      return next(new ErrorHandler("No job found", 400));
    }
    const userId = req.user?.id ?? "";
    const getUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        resumeUrl: true,
      },
    });
    if (!getUser?.resumeUrl) {
      return next(new ErrorHandler("Please add resume first", 400));
    }
    const appliedJob = await prisma.application.create({
      data: {
        jobId: jobId,
        userId: userId,
        resumeUrl: getUser?.resumeUrl ?? "",
        companyTitle: getSingleJob?.company?.title ?? "",
        jobTitle: getSingleJob?.title ?? "",
      },
    });
    res
      .status(200)
      .json({ status: "success", message: "Successful applied job" });
  }
);
export const getApplicant = catchAsync(
  async (req: ExpressRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { skip, take, search } = req.query;
    const skipInt = skip ? parseInt(skip as string, 10) : 0;
    const takeInt = take ? parseInt(take as string, 10) : 10;
    const getApplicant = await prisma.application.findMany({
      where: {
        jobId: id,
        user: {
          fullName: {
            contains: search as string,
            mode: "insensitive",
          },
        },
      },
      skip: skipInt,
      take: takeInt,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    if (!getApplicant) {
      return next(new ErrorHandler("job doesnot exist", 400));
    }
    res.status(201).json({
      status: "success",
      data: getApplicant,
    });
  }
);
export const updateApplicantStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, status } = req.body;
    const getSingleApplicant = await prisma.application.findUnique({
      where: { id: id },
    });
    if (!getSingleApplicant) {
      return next(new ErrorHandler("applicant doesnot exist", 400));
    }
    const getApplicant = await prisma.application.update({
      where: { id: id },
      data: {
        status: status,
        jobId: getSingleApplicant.jobId,
        userId: getSingleApplicant.userId,
        jobTitle: getSingleApplicant.jobTitle,
        companyTitle: getSingleApplicant.companyTitle,
        resumeUrl: getSingleApplicant.resumeUrl,
      },
    });
    if (!getApplicant) {
      return next(
        new ErrorHandler("application doesnot exist and update", 400)
      );
    }
    res.status(201).json({
      status: "success",
      message: "Applicant status update successful",
    });
  }
);
