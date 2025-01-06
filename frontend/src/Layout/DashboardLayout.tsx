import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
