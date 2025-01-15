import { useNavigate } from "react-router";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import Table from "../../resuable/Table";
import { ITableProps } from "../../../types/type";
import ActionButtons from "../../resuable/Button/Actions";

interface ICategoryProps extends ITableProps {
  categoryData: any;
  handleDeleteJob: (value: any) => void;
  isLoading: boolean;
}

const JobList: React.FC<ICategoryProps> = (props) => {
  const {
    setOffset,
    pageSize,
    setPageSize,
    categoryData,
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
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        data={categoryData}
        columns={columns}
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        loading={false}
        isLoading={isLoading}
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

export default JobList;
