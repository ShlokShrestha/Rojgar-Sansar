import { Box, Heading, Text, Input, Button, Flex } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

const HeroSection = () => {
  return (
    <div>
      <Box
        bg="gray.100"
        p={10}
        textAlign="center"
        height="300px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1" size="2xl" color="purple.500" mb={4}>
          Find Your Dream Job or Perfect Candidate
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={8}>
          Connect with thousands of employers and job seekers on our platform
        </Text>
        <Flex as="form" w={{ base: "90%", md: "50%" }} alignItems="center">
          <Input
            placeholder="Job title or keyword"
            size="lg"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            mr={2}
          />
          <Button colorPalette="purple" size="lg">
            <CiSearch />
            Search Jobs
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default HeroSection;
