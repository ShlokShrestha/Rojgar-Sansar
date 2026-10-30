import ImageKit from "imagekit";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

export type StorageFolder = "/profile" | "/resume" | "/CompanyLogo";

export interface StoredFile {
  url: string;
  fileId: string;
}

let client: ImageKit | undefined;

const getClient = () => {
  if (client) return client;
  if (!env.IMAGE_KIT_PUBLIC_KEY || !env.IMAGE_KIT_PRIVATE_KEY) {
    throw new AppError("File storage is not configured", 500);
  }
  client = new ImageKit({
    publicKey: env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: env.IMAGE_KIT_URL_ENDPOINT,
  });
  return client;
};

export const uploadFile = async (
  file: Express.Multer.File,
  folder: StorageFolder
): Promise<StoredFile> => {
  const { url, fileId } = await getClient().upload({
    file: file.buffer,
    fileName: file.originalname,
    folder,
    useUniqueFileName: true,
  });
  return { url, fileId };
};

// Best effort: a failed cleanup must never fail the request that triggered it.
export const deleteFile = async (fileId?: string | null) => {
  if (!fileId) return;
  try {
    await getClient().deleteFile(fileId);
  } catch (error) {
    console.error(`Failed to delete stored file ${fileId}:`, error);
  }
};

// Uploads `file` (if any), runs `persist`, and removes the upload again if
// `persist` throws so failed requests don't leave orphaned files behind.
export const withUpload = async <T>(
  file: Express.Multer.File | undefined,
  folder: StorageFolder,
  persist: (stored: StoredFile | undefined) => Promise<T>
): Promise<T> => {
  const stored = file ? await uploadFile(file, folder) : undefined;
  try {
    return await persist(stored);
  } catch (error) {
    await deleteFile(stored?.fileId);
    throw error;
  }
};
