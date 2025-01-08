import * as Yup from "yup";

export const categoryValidationSchema = Yup.object().shape({
  category: Yup.string()
    .required("Category field is required")
    .min(3, "Category must be at least 3 characters")
    .max(22, "Category must not exceed 22 characters"),
});
