import { z } from "zod";
import { requiredText } from "../../utils/schemas";

export const categorySchema = z.object({ title: requiredText("Category name") });

export type CategoryInput = z.infer<typeof categorySchema>;
