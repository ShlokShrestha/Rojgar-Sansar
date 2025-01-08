import * as Yup from "yup";

export const categoryValidationSchema = Yup.object().shape({
  category: Yup.string()
    .required("Category field is required")
    .min(3, "Category must be at least 3 characters")
    .max(22, "Category must not exceed 22 characters"),
});

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const validFileExtensions: any = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};
function isValidFileType(fileName: any, fileType: any) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}
export const companyValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Company field is required")
    .min(3, "Company must be at least 3 characters")
    .max(22, "Company must not exceed 22 characters"),
  location: Yup.string().required("Company field is required"),
  companyLogo: Yup.mixed()
    .nullable()
    .required("Company logo is required")
    .test("is-valid-type", "Not a valid image type", (value: any) => {
      console.log(value);
      return isValidFileType(value && value[0].name.toLowerCase(), "image");
    })
    .test(
      "is-valid-size",
      "Max allowed size is 2MB",
      (value: any) => value && value?.[0].size <= MAX_FILE_SIZE
    ),
});

export const JobValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Job Name field is required")
    .min(3, "Job Name  must be at least 3 characters")
    .max(22, "Job Name must not exceed 22 characters"),
  description: Yup.string()
    .required("Job Name field is required")
    .min(15, "Job Name  must be at least 3 characters"),
  location: Yup.string()
    .required("Job Name field is required")
    .min(3, "Job Name  must be at least 3 characters"),
  salary: Yup.string().required("Salary field is required"),
  jobCategoryId: Yup.string().required("Job Category field is required"),
  companyId: Yup.string().required("Company field is required"),
});
