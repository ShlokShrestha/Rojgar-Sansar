import { Outlet } from "react-router";
import { Box, Flex } from "@chakra-ui/react";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <>
      <Flex minH="100vh" bg="gray.50">
        <DashboardSidebar />
        <Flex flex={1} direction="column">
          <DashboardNavbar />
          <Box p={5}>
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default DashboardLayout;
