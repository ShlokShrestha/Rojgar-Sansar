import { Flex, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router";

const DashboardSidebar = () => {
  return (
    <>
      <Flex
        as="aside"
        w="20%"
        bg="gray.300"
        color="black"
        direction="column"
        p={5}
      >
        <VStack align="start" gap={4}>
          <Link to={"/dashboard"}>
            <Button variant="ghost" colorScheme="whiteAlpha">
              My Dashboard
            </Button>
          </Link>
          <Link to={"/dashboard/company"}>
            <Button variant="ghost" colorScheme="whiteAlpha">
              Company
            </Button>
          </Link>
          <Link to={"/dashboard/category"}>
            <Button variant="ghost" colorScheme="whiteAlpha">
              Category
            </Button>
          </Link>
          <Link to={"/dashboard/job"}>
            <Button variant="ghost" colorScheme="whiteAlpha">
              Jobs
            </Button>
          </Link>
        </VStack>
      </Flex>
    </>
  );
};

export default DashboardSidebar;
