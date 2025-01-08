import React from "react";
import Table from "../../resuable/Table";
import ActionButtons from "../../resuable/Button/Actions";
import { ITableProps } from "../../../types/type";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import { useNavigate } from "react-router";

interface ICategoryProps extends ITableProps {
  categoryData: {
    title: string;
    id: string;
  };
  handleDeleteCategory: (value: any) => void;
}

const Category: React.FC<ICategoryProps> = (props) => {
  const {
    setOffset,
    pageSize,
    setPageSize,
    categoryData,
    handleDeleteCategory,
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
      header: "Name",
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
              deleteFunction={handleDeleteCategory}
              deleteLoading={false}
              editPageLink={`/dashboard/category/edit/${props.row?.original?.id}`}
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
              text="Add Category"
              onClick={() => navigate("/dashboard/category/add")}
            />
          </>
        }
      />
    </>
  );
};

export default Category;
