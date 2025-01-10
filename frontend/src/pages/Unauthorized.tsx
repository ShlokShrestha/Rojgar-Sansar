import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import PrimaryButton from "../components/resuable/Button/PrimaryButton";

type Props = {};

const Unauthorized = (props: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <Text textStyle="2xl" pb={4}>
        You dont have access to this page.
      </Text>
      <Link to={"/"}>
        <PrimaryButton text="Back to homepage" />
      </Link>
    </Box>
  );
};

export default Unauthorized;
