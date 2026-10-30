import { prisma } from "../../lib/prisma";
import { deleteFile, withUpload } from "../../lib/storage";
import { AuthUser } from "../../middleware/auth";
import { AppError } from "../../utils/AppError";
import { assertOwnership } from "../../utils/ownership";
import {
  PaginationQuery,
  buildPagination,
  containsInsensitive,
  toPrismaPage,
} from "../../utils/pagination";
import { CreateCompanyInput, UpdateCompanyInput } from "./company.schema";

export const list = async (query: PaginationQuery, ownerId?: string) => {
  const where = {
    ...(query.search && { title: containsInsensitive(query.search) }),
    ...(ownerId && { userId: ownerId }),
  };
  const [data, total] = await prisma.$transaction([
    prisma.company.findMany({
      where,
      ...toPrismaPage(query),
      orderBy: { title: "asc" },
    }),
    prisma.company.count({ where }),
  ]);
  return { data, pagination: buildPagination(query, total) };
};

export const getOwned = async (id: string, user: AuthUser) => {
  const company = await prisma.company.findUnique({ where: { id } });
  if (!company) throw AppError.notFound("Company does not exist");
  assertOwnership(company.userId, user);
  return company;
};

export const create = async (
  input: CreateCompanyInput,
  user: AuthUser,
  logo?: Express.Multer.File
) => {
  if (!logo) throw AppError.badRequest("Company logo is required");
  return withUpload(logo, "/CompanyLogo", (stored) =>
    prisma.company.create({
      data: { ...input, logoUrl: stored!.url, logoId: stored!.fileId, userId: user.id },
    })
  );
};

export const update = async (
  id: string,
  input: UpdateCompanyInput,
  user: AuthUser,
  logo?: Express.Multer.File
) => {
  const company = await getOwned(id, user);
  const updated = await withUpload(logo, "/CompanyLogo", (stored) =>
    prisma.company.update({
      where: { id },
      // Ownership (userId) is never changed by an update.
      data: { ...input, ...(stored && { logoUrl: stored.url, logoId: stored.fileId }) },
    })
  );
  if (logo) await deleteFile(company.logoId);
  return updated;
};

export const remove = async (id: string, user: AuthUser) => {
  const company = await getOwned(id, user);
  // Jobs (and their applications) are removed by ON DELETE CASCADE.
  await prisma.company.delete({ where: { id } });
  await deleteFile(company.logoId);
};
