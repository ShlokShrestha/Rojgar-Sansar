import { VStack, Text, Box } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router";

interface NavigateValue {
  name: string;
  path: string;
}

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recuiterRouter: NavigateValue[] = [
    {
      name: "My Dashboard",
      path: "/dashboard/",
    },
    {
      name: "Company",
      path: "/dashboard/company",
    },
    {
      name: "Category",
      path: "/dashboard/category",
    },
    {
      name: "Job",
      path: "/dashboard/job",
    },
  ];
  return (
    <>
      <Box w="250px" h="100vh" bg="white" borderRight="1px solid #e0e0e0" p="5">
        <Text
          fontSize="xl"
          fontWeight="bold"
          mb="8"
          textAlign={"center"}
          color="purple.500"
        >
          Recuiter Dashboard
        </Text>
        <VStack align="start" gap={4}>
          {recuiterRouter?.map((item: NavigateValue, index: number) => (
            <React.Fragment key={index}>
              <Text
                w="100%"
                p="3"
                borderRadius="md"
                bg={
                  location.pathname === item?.path ||
                  location.pathname.startsWith(item?.path + "/")
                    ? "purple.500"
                    : ""
                }
                color={
                  location.pathname === item?.path ||
                  location.pathname.startsWith(item?.path + "/")
                    ? "white"
                    : "black"
                }
                _hover={{
                  bg: "purple.500",
                  color: "white",
                }}
                cursor={"pointer"}
                onClick={() => navigate(item?.path)}
              >
                {item.name}
              </Text>
            </React.Fragment>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default DashboardSidebar;
