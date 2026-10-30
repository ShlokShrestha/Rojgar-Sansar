import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { deleteFile, withUpload } from "../../lib/storage";
import { AppError } from "../../utils/AppError";
import {
  PaginationQuery,
  buildPagination,
  containsInsensitive,
  toPrismaPage,
} from "../../utils/pagination";
import {
  AdminUpdateUserInput,
  UpdatePasswordInput,
  UpdateProfileInput,
} from "./user.schema";

const assertEmailAvailable = async (email: string, userId: string) => {
  const existing = await prisma.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" }, NOT: { id: userId } },
    select: { id: true },
  });
  if (existing) throw AppError.conflict("User with this email already exists");
};

const getUserOrThrow = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { profile: true },
  });
  if (!user) throw AppError.notFound("User not found");
  return user;
};

export const getProfile = async (userId: string) => {
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      profile: true,
      applications: { orderBy: { appliedAt: "desc" } },
      resumeUrl: true,
      bio: true,
      phone: true,
      skills: true,
    },
  });
  if (!profile) throw AppError.notFound("User not found");
  return profile;
};

export const updateProfileImage = async (userId: string, file?: Express.Multer.File) => {
  if (!file) throw AppError.badRequest("Please upload an image");
  const user = await getUserOrThrow(userId);

  await withUpload(file, "/profile", async (stored) => {
    const data = { profileUrl: stored!.url, profileId: stored!.fileId };
    await prisma.profile.upsert({
      where: { userId },
      create: { ...data, userId },
      update: data,
    });
  });
  // Remove the old image only after the new one is saved.
  await deleteFile(user.profile?.profileId);
};

export const updateProfile = async (
  userId: string,
  input: UpdateProfileInput,
  resume?: Express.Multer.File
) => {
  const user = await getUserOrThrow(userId);
  if (input.email) await assertEmailAvailable(input.email, userId);

  await withUpload(resume, "/resume", (stored) =>
    prisma.user.update({
      where: { id: userId },
      data: {
        ...input,
        ...(stored && { resumeUrl: stored.url, resumeId: stored.fileId }),
      },
    })
  );
  if (resume) await deleteFile(user.resumeId);
};

export const updatePassword = async (
  userId: string,
  { oldPassword, newPassword }: UpdatePasswordInput
) => {
  const user = await getUserOrThrow(userId);
  if (!(await bcrypt.compare(oldPassword, user.password))) {
    throw AppError.badRequest("Incorrect old password");
  }
  await prisma.user.update({
    where: { id: userId },
    data: { password: await bcrypt.hash(newPassword, 10) },
  });
};

// ---- Admin ----

export const listUsers = async (query: PaginationQuery) => {
  const where = query.search
    ? {
        OR: [
          { fullName: containsInsensitive(query.search) },
          { email: containsInsensitive(query.search) },
        ],
      }
    : {};
  const [data, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      ...toPrismaPage(query),
      orderBy: { createdAt: "desc" },
      select: { id: true, fullName: true, email: true, role: true, profile: true },
    }),
    prisma.user.count({ where }),
  ]);
  return { data, pagination: buildPagination(query, total) };
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, fullName: true, email: true, role: true },
  });
  if (!user) throw AppError.notFound("User not found");
  return user;
};

export const adminUpdateUser = async ({ id, ...data }: AdminUpdateUserInput) => {
  await getUserOrThrow(id);
  if (data.email) await assertEmailAvailable(data.email, id);
  await prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string, actingUserId: string) => {
  if (id === actingUserId) throw AppError.badRequest("You cannot delete your own account");

  const user = await prisma.user.findUnique({
    where: { id },
    include: { profile: true, company: { select: { logoId: true } } },
  });
  if (!user) throw AppError.notFound("User does not exist");

  // Related rows are removed by ON DELETE CASCADE; stored files are cleaned up after.
  await prisma.user.delete({ where: { id } });
  await Promise.all([
    deleteFile(user.profile?.profileId),
    deleteFile(user.resumeId),
    ...user.company.map((c) => deleteFile(c.logoId)),
  ]);
};
