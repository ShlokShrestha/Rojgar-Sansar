import {
  Box,
  Flex,
  Link,
  Button,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import defaultUser from "../../assets/defaultUser.svg";

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
          <Link
            href="/"
            fontSize="xl"
            color="white"
            fontWeight="bold"
            outline="none"
            textDecoration="none"
          >
            Rojgar Sansar
          </Link>
          <Flex
            alignItems="center"
            display={{ base: "none", md: "flex" }}
            position={"relative"}
          >
            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant="plain" size="sm" outline={"none"}>
                  <Image
                    src={defaultUser}
                    boxSize="30px"
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
                  <Link
                    href={"/profile-setting"}
                    border="none"
                    outline="none"
                    textDecoration="none"
                  >
                    Profile Setting
                  </Link>
                </MenuItem>
                <MenuItem value="new-file">
                  <Link
                    href={"/update-password"}
                    border="none"
                    outline="none"
                    textDecoration="none"
                  >
                    Update Password
                  </Link>
                </MenuItem>
                <MenuItem
                  value="new-file"
                  border="none"
                  outline="none"
                  textDecoration="none"
                >
                  Logout
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default DashboardNavbar;
