import * as Yup from "yup";
import parsePhoneNumberFromString from "libphonenumber-js";

export const categoryValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Category field is required")
    .min(3, "Category must be at least 3 characters")
    .max(22, "Category must not exceed 22 characters"),
});

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const isValidFileType = (filename: string) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  const fileExtension = filename.split(".").pop()?.toLowerCase();
  return allowedExtensions.includes(fileExtension ?? "");
};
export const companyValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Company field is required")
    .min(3, "Company must be at least 3 characters")
    .max(22, "Company must not exceed 22 characters"),
  location: Yup.string().required("Company field is required"),
  companyLogo: Yup.mixed()
    .nullable()
    .test("is-url-or-file", "Company logo is required", (value: any) => {
      return (
        value &&
        (typeof value === "string" ? value.startsWith("http") : value[0])
      );
    })
    .test("is-valid-type", "Not a valid image type", (value: any) => {
      if (typeof value === "string") return true; // Skip if URL
      return value?.[0] && isValidFileType(value[0].name);
    })
    .test("is-valid-size", "Max allowed size is 2MB", (value: any) => {
      if (typeof value === "string") return true; // Skip if URL
      return value?.[0] && value[0].size <= MAX_FILE_SIZE;
    }),
});
export const profileValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name field is required")
    .min(3, "Full Name must be at least 3 characters")
    .max(22, "Full Name must not exceed 22 characters"),
  email: Yup.string().required("Email field is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .test(
      "is-valid-phone",
      "Invalid contact number with country code",
      (value) => {
        if (!value) return false;
        const phoneNumber = parsePhoneNumberFromString(value);
        return phoneNumber && phoneNumber.isValid();
      }
    ),
  bio: Yup.string()
    .required("Bio field is required")
    .min(10, "Full Name must be at least 10 characters")
    .max(150, "Full Name must not exceed 150 characters"),
  skills: Yup.string()
    .matches(
      /^[a-zA-Z]+(, ([a-zA-Z]+))*$/,
      "Please enter valid skills separated by commas"
    )
    .required("Skills field is required"),
  resume: Yup.mixed().nullable().required("Resume field is required"),
});
export const JobValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Job Name field is required")
    .min(3, "Job Name  must be at least 3 characters"),
  description: Yup.string()
    .required("Description field is required")
    .min(15, "Description must be at least 3 characters"),
  salary: Yup.string().required("Salary field is required"),
  jobCategoryId: Yup.string().required("Job Category field is required"),
  companyId: Yup.string().required("Company field is required"),
  numberOfHires: Yup.number().required("Number of hires field is required"),
  workType: Yup.string().required("WorkType field is required"),
});
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email field is required"),
  password: Yup.string()
    .min(8, "Password must have atleast 8 Charaters.")
    .required("Password field is required"),
});
export const signUpValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("FullName field is required"),
  email: Yup.string().required("Email field is required"),
  role: Yup.string().required("Role field is required"),
  password: Yup.string()
    .min(8, "Password must have atleast 8 Charaters.")
    .required("Password field is required"),
  profileImage: Yup.mixed().nullable(),
});

export const forgotValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email field is required"),
});
export const resetPasswordValidationSchema = Yup.object().shape({
  token: Yup.string()
    .required("Token field is required")
    .min(6, "Token must have atleast 6 Charaters."),
  password: Yup.string()
    .min(8, "Password must have atleast 8 Charaters.")
    .required("Password field is required"),
});
export const updatePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, "Password must have atleast 8 Charaters.")
    .required("Password field is required"),
  newPassword: Yup.string()
    .min(8, "Password must have atleast 8 Charaters.")
    .required("Password field is required"),
});
