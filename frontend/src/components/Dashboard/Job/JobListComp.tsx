import React from "react";
import Table from "../../resuable/Table";
import ActionButtons from "../../resuable/Button/Actions";
import { IJobValues, ITableProps } from "../../../types/type";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import { useNavigate } from "react-router";

interface ICategoryProps extends ITableProps {
  joblistData: IJobValues;
  handleDeleteJob: (value: any) => void;
  isLoading: boolean;
}

const JobListComp: React.FC<ICategoryProps> = (props) => {
  const {
    setOffset,
    pageSize,
    setPageSize,
    joblistData,
    handleDeleteJob,
    isLoading,
  } = props;
  const navigate = useNavigate();
  const columns = [
    {
      header: "S/N",
      accessorKey: "",
      cell: (props: any) => {
        return props?.row?.index + 1;
      },
    },
    {
      header: "S/N",
      accessorKey: "",
      cell: (props: any) => {
        return props?.row?.index + 1;
      },
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Salary",
      accessorKey: "salary",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Company",
      accessorKey: "company.title",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Category",
      accessorKey: "jobCategory.title",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (props: any) => {
        return (
          <>
            <ActionButtons
              value={props.getValue()}
              deleteFunction={handleDeleteJob}
              deleteLoading={false}
              editPageLink={`/dashboard/job/edit/${props.row?.original?.id}`}
              viewPageLink={`/dashboard/job/view-applicants/${props.row?.original?.id}`}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        data={joblistData}
        columns={columns}
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        loading={isLoading}
        AddButton={
          <>
            <PrimaryButton
              text="Add Job"
              onClick={() => navigate("/dashboard/job/add")}
            />
          </>
        }
      />
    </>
  );
};

export default JobListComp;
