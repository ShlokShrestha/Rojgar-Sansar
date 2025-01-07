import { Outlet } from "react-router";
import Navbar from "../components/resuable/Navbar/Navbar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
