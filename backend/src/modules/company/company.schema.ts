import { z } from "zod";
import { optionalText, requiredText } from "../../utils/schemas";

export const createCompanySchema = z.object({
  title: requiredText("Company name"),
  location: requiredText("Location"),
});

export const updateCompanySchema = z.object({
  title: optionalText,
  location: optionalText,
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
