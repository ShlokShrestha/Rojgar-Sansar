import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface IActionButtonsProps {
  editPageLink?: string;
  value: string;
  deleteFunction?: (value: string) => void;
  deleteLoading?: boolean;
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
  name: string;
  location: string;
  companyLogo: any;
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
export interface IForgotPasswordValues {
  email: string;
}
export interface IResetPasswordValues {
  token: string;
  password: string;
}
export interface IReactFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}
