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
import { CreateJobInput, JobListQuery, UpdateJobInput } from "./job.schema";

const listInclude = { company: true, jobCategory: true } satisfies Prisma.JobInclude;

const paginatedJobs = async (where: Prisma.JobWhereInput, query: PaginationQuery) => {
  const [data, total] = await prisma.$transaction([
    prisma.job.findMany({
      where,
      ...toPrismaPage(query),
      include: listInclude,
      orderBy: { createdAt: "desc" },
    }),
    prisma.job.count({ where }),
  ]);
  return { data, pagination: buildPagination(query, total) };
};

// Recruiters can only post jobs for their own companies; categories are shared.
const assertJobReferences = async (
  user: AuthUser,
  { companyId, jobCategoryId }: Pick<UpdateJobInput, "companyId" | "jobCategoryId">
) => {
  if (companyId) {
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) throw AppError.badRequest("Selected company does not exist");
    assertOwnership(company.userId, user, "You can only post jobs for your own company");
  }
  if (jobCategoryId) {
    const category = await prisma.jobCategory.findUnique({ where: { id: jobCategoryId } });
    if (!category) throw AppError.badRequest("Selected category does not exist");
  }
};

export const listPublic = (query: JobListQuery) => {
  const where: Prisma.JobWhereInput = {
    ...(query.search && {
      OR: [
        { title: containsInsensitive(query.search) },
        { company: { title: containsInsensitive(query.search) } },
      ],
    }),
    ...(query.category.length && {
      jobCategory: { title: { in: query.category, mode: "insensitive" } },
    }),
    ...(query.location.length && {
      company: { location: { in: query.location, mode: "insensitive" } },
    }),
  };
  return paginatedJobs(where, query);
};

export const listMine = (query: PaginationQuery, user: AuthUser) =>
  paginatedJobs(
    { userId: user.id, ...(query.search && { title: containsInsensitive(query.search) }) },
    query
  );

// Public job detail. Applicant data is private, so we only expose the number of
// applications and, for a logged-in viewer, their own application (if any).
export const getDetail = async (id: string, viewer?: AuthUser) => {
  const [job, ownApplication] = await Promise.all([
    prisma.job.findUnique({
      where: { id },
      include: { ...listInclude, _count: { select: { application: true } } },
    }),
    viewer
      ? prisma.application.findUnique({
          where: { jobId_userId: { jobId: id, userId: viewer.id } },
          select: { id: true, userId: true, status: true },
        })
      : null,
  ]);
  if (!job) throw AppError.notFound("Job not found");
  return { ...job, application: ownApplication ? [ownApplication] : [] };
};

export const getOwned = async (id: string, user: AuthUser) => {
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) throw AppError.notFound("Job does not exist");
  assertOwnership(job.userId, user);
  return job;
};

export const create = async (input: CreateJobInput, user: AuthUser) => {
  await assertJobReferences(user, input);
  return prisma.job.create({ data: { ...input, userId: user.id } });
};

export const update = async (id: string, input: UpdateJobInput, user: AuthUser) => {
  await getOwned(id, user);
  await assertJobReferences(user, input);
  return prisma.job.update({ where: { id }, data: input });
};

export const remove = async (id: string, user: AuthUser) => {
  await getOwned(id, user);
  await prisma.job.delete({ where: { id } });
};
