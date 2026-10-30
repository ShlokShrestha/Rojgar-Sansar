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
import { CategoryInput } from "./category.schema";

export const list = async (query: PaginationQuery, ownerId?: string) => {
  const where = {
    ...(query.search && { title: containsInsensitive(query.search) }),
    ...(ownerId && { userId: ownerId }),
  };
  const [data, total] = await prisma.$transaction([
    prisma.jobCategory.findMany({
      where,
      ...toPrismaPage(query),
      orderBy: { title: "asc" },
    }),
    prisma.jobCategory.count({ where }),
  ]);
  return { data, pagination: buildPagination(query, total) };
};

export const getOwned = async (id: string, user: AuthUser) => {
  const category = await prisma.jobCategory.findUnique({ where: { id } });
  if (!category) throw AppError.notFound("Category does not exist");
  assertOwnership(category.userId, user);
  return category;
};

export const create = (input: CategoryInput, user: AuthUser) =>
  prisma.jobCategory.create({ data: { title: input.title, userId: user.id } });

export const update = async (id: string, input: CategoryInput, user: AuthUser) => {
  await getOwned(id, user);
  return prisma.jobCategory.update({ where: { id }, data: { title: input.title } });
};

export const remove = async (id: string, user: AuthUser) => {
  await getOwned(id, user);
  // Jobs in this category keep existing with jobCategoryId = NULL.
  await prisma.jobCategory.delete({ where: { id } });
};
