import { Box, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router";

type Props = {
  label: string;
};

const CheckBox = (props: Props) => {
  const { label } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategories = searchParams.getAll("categories");

  const handleCategoriesFilter = (category: string) => {
    let updatedCategories = [...selectedCategories];

    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter(
        (oldCategory: string) => oldCategory !== category
      );
    } else {
      updatedCategories.push(category);
    }
    const newSearchParams = new URLSearchParams();
    updatedCategories.forEach((cat) =>
      newSearchParams.append("categories", cat)
    );
    setSearchParams(newSearchParams);
  };

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
        checked={selectedCategories.includes(label)}
        onChange={() => handleCategoriesFilter(label)}
      />
      <Text>{label}</Text>
    </Box>
  );
};

export default CheckBox;
