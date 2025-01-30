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
import { ICategoryValues, ICompanyValues, ITableProps } from "../../types/type";
import { Link } from "react-router";
import FilteSidebar from "../resuable/FilterSidebar";
import DataSpinner from "../resuable/Spinner";

interface IJobProps extends ITableProps {
  joblistData: any;
  isLoading: boolean;
  categoryLoading: boolean;
  categoryData: ICategoryValues[];
  companyData: ICompanyValues[];
}
const JobPage = (props: IJobProps) => {
  const {
    joblistData,
    isLoading,
    offset,
    setOffset,
    categoryLoading,
    categoryData,
    companyData,
  } = props;

  const totalPages: any = Math.ceil(joblistData?.pagination?.totalRecords / 10);
  return (
    <Box p={6}>
      <Flex flexDirection={{ base: "column", lg: "row" }} gap={8}>
        <FilteSidebar
          categoryData={categoryData}
          categoryLoading={categoryLoading}
          companyData={companyData}
        />
        {/* Job Cards */}
        <Box flexGrow={1}>
          <Heading as="h2" size="lg" mb={2}>
            Latest Jobs
          </Heading>
          <Text fontSize="sm" color="gray.600" mb={6}>
            Get your desired job from top companies
          </Text>
          {isLoading ? (
            <DataSpinner />
          ) : (
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
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Flex justifyContent="center" mt={8}>
              <Stack direction="row" gap={2}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setOffset((prev: any) => prev - 1)}
                  disabled={!joblistData?.pagination?.hasPrevPage}
                >
                  {"<"}
                </Button>
                {totalPages &&
                  [...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={offset === index ? "solid" : "outline"}
                      onClick={() => setOffset(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setOffset((pre: any) => pre + 1)}
                  disabled={!joblistData?.pagination?.hasNextPage}
                >
                  {">"}
                </Button>
              </Stack>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
export default JobPage;
