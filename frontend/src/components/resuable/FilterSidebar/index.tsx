import { Box, Text, VStack, Badge, HStack } from "@chakra-ui/react";
import CheckBox from "../Forms/CheckBox";
import { ICategoryValues } from "../../../types/type";
import DataSpinner from "../Spinner";

interface IFilterSidebar {
  categoryData: ICategoryValues[];
  categoryLoading: boolean;
}

const FilteSidebar = (props: IFilterSidebar) => {
  const { categoryData, categoryLoading } = props;

  return (
    <>
      <VStack
        align="start"
        gap={6}
        flexShrink={0}
        width={{ base: "100%", lg: "20%" }}
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Current Search
          </Text>
          <HStack gap={2}>
            <Badge colorScheme="blue">Full Stack</Badge>
            <Badge colorScheme="purple">Bangalore</Badge>
          </HStack>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Search by Categories
          </Text>
          {categoryLoading ? (
            <DataSpinner />
          ) : (
            <VStack align="start" gap={2}>
              {categoryData?.map((category: any, index: number) => (
                <CheckBox label={category.title} key={index} />
              ))}
            </VStack>
          )}
        </Box>
      </VStack>
    </>
  );
};

export default FilteSidebar;
