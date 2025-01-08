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
  category: string;
}

export interface ICompanyValues {
  name: string;
  location: string;
  companyLogo: any;
}

export interface IJobValues {
  title: string;
  description: string;
  location: string;
  salary: string;
  jobCategoryId: string;
  companyId: string;
}

export interface IReactFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}
