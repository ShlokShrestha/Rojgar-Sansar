import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router";

const DashboardNavbar = () => {
  return (
    <>
      <Box
        bg="purple.500"
        px={4}
        position={"sticky"}
        top={"0"}
        width={"100%"}
        zIndex={1}
      >
        <Flex
          h={14}
          alignItems="center"
          justifyContent={{ base: "space-between" }}
        >
          <Text fontSize="xl" color="white" fontWeight="bold">
            My Website
          </Text>
          <Flex
            alignItems="center"
            display={{ base: "none", md: "flex" }}
            position={"relative"}
          >
            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant="plain" size="sm" outline={"none"}>
                  <Image
                    src="https://bit.ly/naruto-sage"
                    boxSize="40px"
                    borderRadius="full"
                    fit="cover"
                    alt="Naruto Uzumaki"
                  />
                </Button>
              </MenuTrigger>
              <MenuContent position={"absolute"} right={0} top={11} width={200}>
                <MenuItem value="new-txt" textSizeAdjust={"24px"}>
                  Account Name
                </MenuItem>
                <MenuItem value="new-file">
                  <Link to={"/profile-setting"}>Profile Setting</Link>
                </MenuItem>
                <MenuItem value="new-file">
                  <Link to={"/update-password"}>Update Password</Link>
                </MenuItem>
                <MenuItem value="new-file">Logout</MenuItem>
              </MenuContent>
            </MenuRoot>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default DashboardNavbar;
