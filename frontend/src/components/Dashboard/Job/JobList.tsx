import { useNavigate } from "react-router";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import Table from "../../resuable/Table";
import { ITableProps } from "../../../types/type";
import ActionButtons from "../../resuable/Button/Actions";

interface ICategoryProps extends ITableProps {
  categoryData: {
    title: string;
    id: string;
  };
  handleDeleteJob: (value: any) => void;
}

const JobList: React.FC<ICategoryProps> = (props) => {
  const { setOffset, pageSize, setPageSize, categoryData, handleDeleteJob } =
    props;
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
      accessorKey: "title",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Salary",
      accessorKey: "title",
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
