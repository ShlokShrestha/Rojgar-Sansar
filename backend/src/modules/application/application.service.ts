import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AuthUser } from "../../middleware/auth";
import { AppError } from "../../utils/AppError";
import { assertOwnership } from "../../utils/ownership";
import {
  PaginationQuery,
  buildPagination,
  containsInsensitive,
  toPrismaPage,
} from "../../utils/pagination";
import { UpdateStatusInput } from "./application.schema";

export const apply = async (jobId: string, user: AuthUser) => {
  const [job, applicant, existing] = await Promise.all([
    prisma.job.findUnique({ where: { id: jobId }, include: { company: true } }),
    prisma.user.findUnique({ where: { id: user.id }, select: { resumeUrl: true } }),
    prisma.application.findUnique({
      where: { jobId_userId: { jobId, userId: user.id } },
      select: { id: true },
    }),
  ]);
  if (!job) throw AppError.notFound("No job found");
  if (existing) throw AppError.conflict("You have already applied for this job");
  if (!applicant?.resumeUrl) throw AppError.badRequest("Please add resume first");

  return prisma.application.create({
    data: {
      jobId,
      userId: user.id,
      resumeUrl: applicant.resumeUrl,
      jobTitle: job.title,
      companyTitle: job.company.title,
    },
  });
};

export const listForJob = async (jobId: string, query: PaginationQuery, user: AuthUser) => {
  const job = await prisma.job.findUnique({ where: { id: jobId }, select: { userId: true } });
  if (!job) throw AppError.notFound("Job does not exist");
  assertOwnership(job.userId, user, "You can only view applicants for your own jobs");

  const where: Prisma.ApplicationWhereInput = {
    jobId,
    ...(query.search && { user: { fullName: containsInsensitive(query.search) } }),
  };
  const [data, total] = await prisma.$transaction([
    prisma.application.findMany({
      where,
      ...toPrismaPage(query),
      orderBy: { appliedAt: "desc" },
      include: { user: { select: { id: true, fullName: true, email: true, phone: true } } },
    }),
    prisma.application.count({ where }),
  ]);
  return { data, pagination: buildPagination(query, total) };
};

// Number of applications per day across all of the recruiter's jobs.
export const dailyCounts = async (user: AuthUser) => {
  const applications = await prisma.application.findMany({
    where: { job: { userId: user.id } },
    select: { appliedAt: true },
    orderBy: { appliedAt: "asc" },
  });
  const counts = new Map<string, number>();
  for (const { appliedAt } of applications) {
    const date = appliedAt.toISOString().split("T")[0];
    counts.set(date, (counts.get(date) ?? 0) + 1);
  }
  return Array.from(counts, ([date, count]) => ({ date, count }));
};

export const updateStatus = async ({ id, status }: UpdateStatusInput, user: AuthUser) => {
  const application = await prisma.application.findUnique({
    where: { id },
    include: { job: { select: { userId: true } } },
  });
  if (!application) throw AppError.notFound("Application does not exist");
  assertOwnership(application.job.userId, user, "You can only update applicants for your own jobs");

  return prisma.application.update({ where: { id }, data: { status } });
};
