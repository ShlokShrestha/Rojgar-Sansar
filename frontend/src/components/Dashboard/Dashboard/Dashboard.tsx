import { Flex } from "@chakra-ui/react";
import { ICompanyValues, IJobValues } from "../../../types/type";
import DashboardCard from "../../resuable/FormCard/DashboardCard";
import DataSpinner from "../../resuable/Spinner";
import JobIcon from "../../../assets/jobs.png";
import { RiFileUserLine } from "react-icons/ri";
import { HiBuildingOffice2 } from "react-icons/hi2";
interface IDashboardValue {
  joblistData: IJobValues[];
  companyListData: ICompanyValues[];
  appliedListData: any;
  isLoading: boolean;
}

const Dashboard = (props: IDashboardValue) => {
  const { joblistData, isLoading, companyListData, appliedListData } = props;
  return (
    <div>
      {isLoading ? (
        <DataSpinner />
      ) : (
        <Flex spaceX={"12"} justifyContent={"space-between"}>
          <DashboardCard
            label="No of jobs opening"
            image={JobIcon}
            data={joblistData?.length}
          />
          <DashboardCard
            label="No of applied jobs"
            icon={<RiFileUserLine size={55} />}
            data={appliedListData?.length}
          />
          <DashboardCard
            label="No of company"
            icon={<HiBuildingOffice2 size={55} />}
            data={companyListData?.length}
          />
        </Flex>
      )}
    </div>
  );
};

export default Dashboard;
