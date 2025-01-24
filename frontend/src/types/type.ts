import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface IActionButtonsProps {
  editPageLink?: string;
  value: string;
  deleteFunction?: (value: string) => void;
  deleteLoading?: boolean;
  viewPageLink?: string;
}
export interface ITableProps {
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export interface ICategoryValues {
  id?: string;
  title: string;
}
export interface ICompanyValues {
  id?: string;
  title: string;
  location: string;
  companyLogo?: any;
  logoUrl?: string;
}
export interface AuthContextType {
  auth?: {
    id?: string;
    email?: string;
    role?: string;
  };
  setAuth?: any;
}
export interface IUserProfileProps {
  status: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    profile: {
      profileUrl: string;
      profileId: string;
      userId: string;
    };
  };
}
export interface IJobValues {
  id?: any;
  title: string;
  description: string;
  location: string;
  salary: string;
  jobCategoryId: string;
  companyId: string;
}
export interface ILoginValues {
  email: string;
  password: string;
}
export interface ISignUpValues {
  fullName: string;
  email: string;
  password: string;
  role: string;
  profileImage?: any;
}
export interface IProfileValue {
  fullName: string;
  email: string;
  bio: string;
  phone: string;
  skills: string;
  resume: any;
}
export interface IForgotPasswordValues {
  email: string;
}
export interface IResetPasswordValues {
  token: string;
  password: string;
}
export interface IChangePasswordValues {
  oldPassword: string;
  newPassword: string;
}
export interface IReactFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  getValues?: (data: string) => T;
}
