import { Text } from "@chakra-ui/react";
import { ITableProps } from "../../types/type";
import Table from "../resuable/Table";
import moment from "moment";

interface IAppliedProps extends ITableProps {
  isLoading: boolean;
  userData: any;
}
const AppliedJobList = (props: IAppliedProps) => {
  const { setOffset, pageSize, setPageSize, userData, isLoading } = props;
  const columns = [
    {
      header: "Date",
      accessorKey: "appliedAt",
      cell: (props: any) => (
        <>
          {props.getValue()
            ? moment(props.getValue()).format("YYYY-MM-DD")
            : "N/A"}
        </>
      ),
    },
    {
      header: "Job Role",
      accessorKey: "jobTitle",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Company",
      accessorKey: "companyTitle",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props: any) => (
        <>
          {props.getValue() ? (
            <span
              style={{
                background: "gray",
                padding: "4px",
                borderRadius: "5px",
                color: "white",
              }}
            >
              {props.getValue()}
            </span>
          ) : (
            "N/A"
          )}
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        data={userData}
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
