import { Box, Text } from "@chakra-ui/react";

type Props = {
  label: string;
  handleFilter: (data: string) => void;
  selected: any;
};

const CheckBox = (props: Props) => {
  const { label, handleFilter, selected } = props;

  return (
    <Box as="label" display="flex" alignItems="center" cursor="pointer" mb={4}>
      <Box
        as="input"
        type="checkbox"
        marginRight={2}
        cursor="pointer"
        w="20px"
        h="20px"
        border="2px solid"
        borderColor="gray.300"
        borderRadius="md"
        _checked={{
          bg: "purple.500",
          borderColor: "purple.500",
        }}
        _focus={{
          outline: "none",
        }}
        checked={selected.includes(label)}
        onChange={() => handleFilter(label)}
      />
      <Text>{label}</Text>
    </Box>
  );
};

export default CheckBox;
