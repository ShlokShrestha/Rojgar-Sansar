import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { AppError } from "../utils/AppError";

const MAX_FILE_SIZE = 3 * 1024 * 1024;

const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const createUpload = (isAllowed: (mimetype: string) => boolean, message: string) =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_FILE_SIZE, files: 1 },
    fileFilter: (_req: Request, file, cb: FileFilterCallback) => {
      if (isAllowed(file.mimetype)) cb(null, true);
      else cb(AppError.badRequest(message));
    },
  });

export const uploadImage = createUpload(
  (type) => type.startsWith("image/"),
  "Please upload an image file"
);

export const uploadResume = createUpload(
  (type) => RESUME_TYPES.includes(type) || type.startsWith("image/"),
  "Please upload your resume as a PDF, Word document or image"
);
