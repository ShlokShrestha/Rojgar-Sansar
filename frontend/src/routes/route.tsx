import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Job from "../pages/JobList/JobList";
import DashboardLayout from "../Layout/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import JobList from "../pages/Dashboard/Job/Job";
import Company from "../pages/Dashboard/Company/Company";
import Category from "../pages/Dashboard/Category/Category";

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobList" element={<Job />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/company" element={<Company />} />
        <Route path="/dashboard/job" element={<JobList />} />
        <Route path="/dashboard/category" element={<Category />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
