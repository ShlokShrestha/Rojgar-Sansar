import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  Button,
  Badge,
  HStack,
  SimpleGrid,
  Stack,
  Image,
} from "@chakra-ui/react";
import CheckBox from "../resuable/Forms/CheckBox";
import { IJobData, IJobValues, ITableProps } from "../../types/type";
import { Link } from "react-router";

interface IJobProps extends ITableProps {
  joblistData: IJobData;
  isLoading: boolean;
}
const JobPage = (props: IJobProps) => {
  const { joblistData, isLoading, setOffset, pageSize, setPageSize } = props;
  const categories = [
    { name: "Programming", count: 24 },
    { name: "Marketing", count: 41 },
    { name: "Designing", count: 15 },
    { name: "Accounting", count: 22 },
    { name: "Analytics", count: 41 },
  ];

  return (
    <Box p={6}>
      <Flex flexDirection={{ base: "column", lg: "row" }} gap={8}>
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
            <VStack align="start" gap={2}>
              {categories.map((category, index) => (
                <CheckBox label={category.name} />
              ))}
            </VStack>
          </Box>
        </VStack>

        {/* Job Cards */}
        <Box flexGrow={1}>
          <Heading as="h2" size="lg" mb={2}>
            Latest Jobs
          </Heading>
          <Text fontSize="sm" color="gray.600" mb={6}>
            Get your desired job from top companies
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
            {Array.isArray(joblistData?.data) &&
              joblistData?.data?.map((job: any, index: number) => (
                <Box
                  key={index}
                  p={4}
                  bg="white"
                  boxShadow="md"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Flex alignItems="center" mb={4}>
                    <Box
                      boxSize={10}
                      bg="gray.100"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        fontSize="xl"
                        fontWeight="bold"
                        src={job?.company?.logoUrl}
                        alt={job?.company?.title}
                      />
                    </Box>
                    <Box>
                      <Text ml={3} fontSize="lg" fontWeight="bold">
                        {job.company.title}
                      </Text>
                      <Text ml={3} fontSize="xs">
                        {job.company.location}
                      </Text>
                    </Box>
                  </Flex>
                  <Text fontSize="lg" fontWeight="bold">
                    {job.title}
                  </Text>
                  <Text>{job.description.slice(0, 100)}...</Text>
                  <HStack gap={2} my={3}>
                    <Badge color="purple.700" fontSize="sm">
                      {job.numberOfHires} positions
                    </Badge>
                    <Badge
                      color="red.600"
                      textTransform="capitalize"
                      fontSize="sm"
                    >
                      {job.workType}
                    </Badge>
                    <Badge colorScheme="purple" fontSize="sm">
                      {job.salary} Npr
                    </Badge>
                  </HStack>
                  <Flex gap={2} mt={6}>
                    <Link to={`/jobpage/${job.id}`}>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        bgColor="purple.600"
                        color={"white"}
                      >
                        View Details
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              ))}
          </SimpleGrid>

          {/* Pagination */}
          <Flex justifyContent="center" mt={8}>
            <Stack direction="row" gap={2}>
              <Button size="sm" variant="outline">
                {"<"}
              </Button>
              {[1, 2, 3, 4, 5, 6].map((page) => (
                <Button key={page} size="sm" variant="solid">
                  {page}
                </Button>
              ))}
              <Button size="sm" variant="outline">
                {">"}
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
export default JobPage;
