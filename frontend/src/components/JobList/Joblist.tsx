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
} from "@chakra-ui/react";
import CheckBox from "../resuable/Forms/CheckBox";

const JobListing = () => {

  const jobData = Array(9).fill({
    title: "Full Stack Developer",
    location: "California",
    level: "Senior level",
    description:
      "You will be responsible for frontend and backend development tasks. You will work closely with our team.",
  });

  const categories = [
    { name: "Programming", count: 24 },
    { name: "Marketing", count: 41 },
    { name: "Designing", count: 15 },
    { name: "Accounting", count: 22 },
    { name: "Analytics", count: 41 },
  ];

  const locations = [
    { name: "Bangalore", count: 24 },
    { name: "Hyderabad", count: 41 },
    { name: "Mumbai", count: 5 },
    { name: "Chennai", count: 22 },
  ];
  return (
    <Box p={6}>
      <Flex flexDirection={{ base: "column", lg: "row" }} gap={8}>
        {/* Sidebar Filters */}
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
            {jobData.map((job, index) => (
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
                    {/* Replace this with a real logo */}
                    <Text fontSize="xl" fontWeight="bold">
                      S
                    </Text>
                  </Box>
                  <Text ml={3} fontSize="lg" fontWeight="bold">
                    {job.title}
                  </Text>
                </Flex>
                <HStack gap={2} mb={2}>
                  <Badge colorScheme="blue">{job.location}</Badge>
                  <Badge colorScheme="purple">{job.level}</Badge>
                </HStack>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  {job.description}
                </Text>
                <Flex gap={2}>
                  <Button colorScheme="blue" size="sm">
                    Apply Now
                  </Button>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
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
export default JobListing;
