import { Box, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {};

const FormCard = (props: any) => {
  const { title, children } = props;
  return (
    <Box bg={"white"} p={5} divideY="2px">
      <Heading fontWeight="bold" size={"2xl"} pb={3}>
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export default FormCard;
