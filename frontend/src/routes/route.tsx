import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Job from "../pages/JobList/JobList";
import DashboardLayout from "../Layout/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import JobList from "../pages/Dashboard/Job/Job";
import CompanyList from "../pages/Dashboard/Company/CompanyList";
import CompanyAdd from "../pages/Dashboard/Company/CompanyAdd";
import CompanyEdit from "../pages/Dashboard/Company/CompanyEdit";
import CategoryList from "../pages/Dashboard/Category/CategoryList";
import CategoryEdit from "../pages/Dashboard/Category/CategoryEdit";
import CategoryAdd from "../pages/Dashboard/Category/CategoryAdd";

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobList" element={<Job />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/company" element={<CompanyList />} />
        <Route path="/dashboard/company/add" element={<CompanyAdd />} />
        <Route path="/dashboard/company/edit/:id" element={<CompanyEdit />} />
        <Route path="/dashboard/job" element={<JobList />} />
        <Route path="/dashboard/category" element={<CategoryList />} />
        <Route path="/dashboard/category/add" element={<CategoryAdd />} />
        <Route path="/dashboard/category/edit/:id" element={<CategoryEdit />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
