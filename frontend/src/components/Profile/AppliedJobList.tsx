import { ITableProps } from "../../types/type";
import Table from "../resuable/Table";

interface IAppliedProps extends ITableProps {
  isLoading: boolean;
  userData: any;
}
const AppliedJobList = (props: IAppliedProps) => {
  const { setOffset, pageSize, setPageSize, userData, isLoading } = props;
  const columns = [
    {
      header: "Company",
      accessorKey: "company",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Name",
      accessorKey: "title",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Status",
      accessorKey: "location",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
  ];
  return (
    <div>
      <Table
        data={[]}
        columns={columns}
        loading={isLoading}
        setOffset={setOffset}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default AppliedJobList;
