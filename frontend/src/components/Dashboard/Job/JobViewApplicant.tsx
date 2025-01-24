import React from "react";
import Table from "../../resuable/Table";
import { IJobValues, ITableProps } from "../../../types/type";
import { Link } from "react-router";
import moment from "moment";
import { Box, Text } from "@chakra-ui/react";

interface ICategoryProps extends ITableProps {
  jobViewApplicantData: IJobValues;
  handleUpdateApplication: (id: string, value: string) => void;
  isLoading: boolean;
}

const JobViewApplicant: React.FC<ICategoryProps> = (props) => {
  const {
    setOffset,
    pageSize,
    setPageSize,
    jobViewApplicantData,
    handleUpdateApplication,
    isLoading,
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
      header: "Applicant Name",
      accessorKey: "user.fullName",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Email",
      accessorKey: "user.email",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Contact Number",
      accessorKey: "user.phone",
      cell: (props: any) => <>{props.getValue() ? props.getValue() : "N/A"}</>,
    },
    {
      header: "Resume",
      accessorKey: "resumeUrl",
      cell: (props: any) => (
        <Link
          to={props.getValue()}
          target="_black"
          style={{ color: "#2A94FF", textDecoration: "underline" }}
        >
          View Resume
        </Link>
      ),
    },
    {
      header: "Applied Date",
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
      header: "",
      accessorKey: "status",
      cell: (props: any) => (
        <Box cursor="pointer">
          {props.getValue() === "pending" ? (
            <select
              style={{ outline: "none" }}
              value={
                props.getValue() === "pending" ? "select" : props.getValue()
              }
              onChange={(e) =>
                handleUpdateApplication(
                  props?.cell?.row?.original?.id,
                  e.target.value
                )
              }
            >
              <option disabled value={"select"}>
                Select
              </option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          ) : (
            <Text
              bgColor={
                props.getValue() === "accepted" ? "green.600" : "red.600"
              }
              color="white"
              px="2"
              py="1"
              borderRadius={5}
              textTransform="capitalize"
              display="inline-block"
            >
              {props.getValue()}
            </Text>
          )}
        </Box>
      ),
    },
  ];
  return (
    <>
      <Table
        data={jobViewApplicantData}
        columns={columns}
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        loading={isLoading}
      />
    </>
  );
};

export default JobViewApplicant;
