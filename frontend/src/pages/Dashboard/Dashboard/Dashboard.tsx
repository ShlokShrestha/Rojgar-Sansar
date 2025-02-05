import { useGetHook } from "../../../customhooks/useApiHook";
import APIS from "../../../constants/EndPoint";
import DashboardComponent from "../../../components/Dashboard/Dashboard/Dashboard";

const Dashboard = () => {
  const { data: joblistData, isLoading } = useGetHook({
    queryKey: ["dashboardJob"],
    url: `${APIS.MYJOBS}`,
  });
  const { data: companyListData } = useGetHook({
    queryKey: ["companylist"],
    url: `${APIS.MYCOMPANY}`,
  });
  const { data: appliedListData } = useGetHook({
    queryKey: ["applied"],
    url: `${APIS.DASHBOARDJOBAPPLICANT}`,
  });

  return (
    <>
      <DashboardComponent
        joblistData={joblistData?.data}
        companyListData={companyListData?.data}
        appliedListData={appliedListData?.data}
        isLoading={isLoading}
      />
    </>
  );
};

export default Dashboard;
