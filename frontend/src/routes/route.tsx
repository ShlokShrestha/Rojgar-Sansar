import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import DashboardLayout from "../Layout/DashboardLayout";
import Job from "../pages/JobList/JobList";
import AddJobs from "../pages/Dashboard/AddJobs";

type Props = {};

const AllRoutes = (props: Props) => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobList" element={<Job />} />
        <Route path="/addJobs" element={<AddJobs />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
