import { Route, Routes } from "react-router";
import DashBoard from "../pages/DashBoard";
import DashboardLayout from "../Layout/DashboardLayout";
import Job from "../pages/Job/Job";

type Props = {};

const AllRoutes = (props: Props) => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/jobList" element={<Job />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
