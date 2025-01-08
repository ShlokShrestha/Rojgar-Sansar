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
