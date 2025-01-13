import React from "react";
import Table from "../../resuable/Table";
import ActionButtons from "../../resuable/Button/Actions";
import { ITableProps } from "../../../types/type";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import { useNavigate } from "react-router";

interface ICategoryProps extends ITableProps {
  companyData: any;
  handleDeleteCategory: (value: any) => void;
  isLoading: boolean;
}

const CompanyList: React.FC<ICategoryProps> = (props) => {
  const {
    setOffset,
    pageSize,
    setPageSize,
    companyData,
    handleDeleteCategory,
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
      header: "Company Logo",
      accessorKey: "logoUrl",
      cell: (props: any) => (
        <>
          <img src={props.getValue()} alt="" style={{ width: "40px" }} />
        </>
      ),
    },
    {
      header: "Name",
      accessorKey: "title",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Location",
      accessorKey: "location",
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
              deleteFunction={handleDeleteCategory}
              deleteLoading={false}
              editPageLink={`/dashboard/company/edit/${props.row?.original?.id}`}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        data={companyData}
        columns={columns}
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        loading={isLoading}
        AddButton={
          <>
            <PrimaryButton
              text="Add Company"
              onClick={() => navigate("/dashboard/company/add")}
            />
          </>
        }
      />
    </>
  );
};

export default CompanyList;
