import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { sendMail } from "../../lib/mailer";
import { withUpload } from "../../lib/storage";
import { resetPasswordEmail } from "../../templates/resetPasswordEmail";
import { AppError } from "../../utils/AppError";
import { generateResetToken, hashResetToken, signAccessToken } from "../../utils/token";
import { LoginInput, ResetPasswordInput, SignUpInput } from "./auth.schema";

const SALT_ROUNDS = 10;

// Older accounts may have been stored with mixed-case emails.
const findByEmail = (email: string) =>
  prisma.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });

export const signUp = async (input: SignUpInput, file?: Express.Multer.File) => {
  if (await findByEmail(input.email)) {
    throw AppError.conflict("User with this email already exists");
  }
  const password = await bcrypt.hash(input.password, SALT_ROUNDS);

  await withUpload(file, "/profile", (stored) =>
    prisma.user.create({
      data: {
        fullName: input.fullName,
        email: input.email,
        password,
        role: input.role,
        ...(stored && {
          profile: { create: { profileUrl: stored.url, profileId: stored.fileId } },
        }),
      },
    })
  );
};

export const login = async ({ email, password }: LoginInput) => {
  const user = await findByEmail(email);
  // Same message for both cases so the endpoint can't be used to find accounts.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw AppError.unauthorized("Invalid email or password");
  }
  return {
    token: await signAccessToken(user.id),
    user: { id: user.id, email: user.email, role: user.role },
  };
};

export const forgotPassword = async (email: string) => {
  const user = await findByEmail(email);
  if (!user) return;

  const { resetToken, resetPasswordToken, resetPasswordExpire } = generateResetToken();
  await prisma.user.update({
    where: { id: user.id },
    data: { resetPasswordToken, resetPasswordExpire },
  });

  try {
    await sendMail({
      to: user.email,
      subject: "Rojgar Sansar Password Recovery",
      html: resetPasswordEmail(resetToken),
    });
  } catch (error) {
    console.error("Failed to send reset email:", error);
    await prisma.user.update({
      where: { id: user.id },
      data: { resetPasswordToken: null, resetPasswordExpire: null },
    });
    throw new AppError("Could not send the reset email, please try again later", 500);
  }
};

export const resetPassword = async ({ token, password }: ResetPasswordInput) => {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: hashResetToken(token),
      resetPasswordExpire: { gt: new Date() },
    },
  });
  if (!user) throw AppError.badRequest("Invalid or expired token");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await bcrypt.hash(password, SALT_ROUNDS),
      resetPasswordToken: null,
      resetPasswordExpire: null,
    },
  });
};
