import { Box, Text } from "@chakra-ui/react";

type Props = {
  label: String;
  register?: any;
  name?: String;
  value?: String;
};

const CheckBox = (props: Props) => {
  const { label, register, name, value } = props;
  return (
    <div>
      <Box
        as="label"
        display="flex"
        alignItems="center"
        cursor="pointer"
        mb={4}
      >
        <Box
          as="input"
          value={value}
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
          {...register(name)}
        />
        <Text>{label}</Text>
      </Box>
    </div>
  );
};

export default CheckBox;
