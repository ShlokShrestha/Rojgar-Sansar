import { Box, Spinner } from "@chakra-ui/react";

type Props = {};

const DataSpinner = (props: Props) => {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Spinner size="lg" />
    </Box>
  );
};

export default DataSpinner;
