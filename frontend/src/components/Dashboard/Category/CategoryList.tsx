import React from "react";
import Table from "../../resuable/Table";
import ActionButtons from "../../resuable/Button/Actions";
import { ITableProps } from "../../../types/type";

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
              editPageLink={`/promotions/edit/${props.row?.original?.id}`}
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
      />
    </>
  );
};

export default Category;
