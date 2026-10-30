import { z } from "zod";

const MAX_PAGE_SIZE = 100;

// The frontend sends `skip` (0-based page index) and `take` (page size).
// `offset`/`limit` are accepted as aliases.
export const paginationFields = z.object({
  skip: z.coerce.number().int().min(0).optional(),
  offset: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).optional(),
  limit: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).optional(),
  search: z.string().trim().optional(),
});

export const toPaginationQuery = ({
  skip,
  offset,
  take,
  limit,
  search,
}: z.infer<typeof paginationFields>) => ({
  page: skip ?? offset ?? 0,
  pageSize: take ?? limit ?? 10,
  search: search || undefined,
});

export const paginationQuerySchema = paginationFields.transform(toPaginationQuery);

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export const toPrismaPage = ({ page, pageSize }: PaginationQuery) => ({
  skip: page * pageSize,
  take: pageSize,
});

export const buildPagination = (
  { page, pageSize }: PaginationQuery,
  totalRecords: number
) => ({
  currentPage: page + 1,
  totalPages: Math.ceil(totalRecords / pageSize),
  hasPrevPage: page > 0,
  hasNextPage: (page + 1) * pageSize < totalRecords,
  totalRecords,
});

export const containsInsensitive = (value: string) => ({
  contains: value,
  mode: "insensitive" as const,
});
