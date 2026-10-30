import { AuthUser } from "../middleware/auth";
import { AppError } from "./AppError";

// Admins may act on any resource; everyone else only on their own.
export const assertOwnership = (
  ownerId: string,
  user: AuthUser,
  message = "You are not allowed to modify this resource"
) => {
  if (user.role !== "admin" && ownerId !== user.id) {
    throw AppError.forbidden(message);
  }
};
