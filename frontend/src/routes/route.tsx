import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../Layout/MainLayout";
import JobPage from "../pages/JobPage/JobPage";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import JobListPage from "../pages/Dashboard/JobList/JobListPage";
import CompanyList from "../pages/Dashboard/Company/CompanyList";
import CompanyAdd from "../pages/Dashboard/Company/CompanyAdd";
import CompanyEdit from "../pages/Dashboard/Company/CompanyEdit";
import CategoryList from "../pages/Dashboard/Category/CategoryList";
import CategoryEdit from "../pages/Dashboard/Category/CategoryEdit";
import CategoryAdd from "../pages/Dashboard/Category/CategoryAdd";
import JobAdd from "../pages/Dashboard/JobList/JobAdd";
import JobEdit from "../pages/Dashboard/JobList/JobEdit";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/Signup";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "../pages/Unauthorized";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobpage" element={<JobPage />} />
      </Route>
      <Route
        element={
          <PrivateRoute allowRole={"recruiter"}>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/dashboard/company" element={<CompanyList />} />
        <Route path="/dashboard/company/add" element={<CompanyAdd />} />
        <Route path="/dashboard/company/edit/:id" element={<CompanyEdit />} />
        <Route path="/dashboard/category" element={<CategoryList />} />
        <Route path="/dashboard/category/add" element={<CategoryAdd />} />
        <Route path="/dashboard/category/edit/:id" element={<CategoryEdit />} />
        <Route path="/dashboard/job" element={<JobListPage />} />
        <Route path="/dashboard/job/add" element={<JobAdd />} />
        <Route path="/dashboard/job/edit/:id" element={<JobEdit />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
