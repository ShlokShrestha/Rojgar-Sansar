import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  IconButton,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Box bg="purple.500" px={4} position={"sticky"} top={"0"} width={"100%"} zIndex={1}>
      <Flex
        h={14}
        alignItems="center"
        justifyContent={{ base: "space-between" }}
      >
        <Text fontSize="xl" color="white" fontWeight="bold">
          My Website
        </Text>
        {isOpen ? (
          <IconButton
            size="md"
            display={{ md: "none" }}
            onClick={() => setOpen((pre: any) => !pre)}
            variant="plain"
          >
            <IoClose color="white" />
          </IconButton>
        ) : (
          <IconButton
            size="md"
            display={{ md: "none" }}
            onClick={() => setOpen((pre: any) => !pre)}
            variant="plain"
          >
            <RxHamburgerMenu style={{ color: "white" }} />
          </IconButton>
        )}
        <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
          <Link to={"/"}>
            <Button color="white" mr={4} variant="plain">
              Home
            </Button>
          </Link>
          <Link to={"/jobList"}>
            <Button color="white" mr={4} variant="plain">
              Find Work
            </Button>
          </Link>
          <Link to={"/about"}>
            <Button color="white" mr={4} variant="plain">
              About
            </Button>
          </Link>
        </Flex>
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
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" textAlign="center">
            <Button color="white" width="100%" variant="plain">
              Home
            </Button>
            <Button color="white" width="100%" variant="plain">
              About
            </Button>
            <Button color="white" width="100%" variant="plain">
              Services
            </Button>
            <Button color="white" width="100%" variant="plain">
              Contact
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
