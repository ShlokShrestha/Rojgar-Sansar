import { z } from "zod";
import { ApplicationStatus } from "@prisma/client";

export const applySchema = z.object({ jobId: z.string().min(1, "jobId is required") });

export const updateStatusSchema = z.object({
  id: z.string().min(1, "id is required"),
  status: z.nativeEnum(ApplicationStatus),
});

export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
