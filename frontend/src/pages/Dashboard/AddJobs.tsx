import {
  Flex,
  Grid,
  GridItem,
  Heading,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";

const AddJobList = () => {
  return (
    <Flex minH="100vh" bg="gray.50">
      <Flex
        as="aside"
        w="20%"
        bg="gray.300"
        color="black"
        direction="column"
        p={5}
      >
        <VStack align="start" gap={4}>
          <Button variant="ghost" colorScheme="whiteAlpha">
            My Dashboard
          </Button>
          <Button variant="ghost" colorScheme="whiteAlpha">
            Overview
          </Button>
          <Button variant="ghost" colorScheme="whiteAlpha">
            Analytics
          </Button>
          <Button variant="ghost" colorScheme="whiteAlpha">
            Settings
          </Button>
        </VStack>
      </Flex>
      <Flex flex={1} direction="column" p={5}>
        <Heading size="lg" mb={6}>
          Welcome Back!
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem bg="white" shadow="md" borderRadius="lg" p={4}>
            <Heading size="md">Card 1</Heading>
            <Text mt={2}>Some details about Card 1.</Text>
          </GridItem>
          <GridItem bg="white" shadow="md" borderRadius="lg" p={4}>
            <Heading size="md">Card 2</Heading>
            <Text mt={2}>Some details about Card 2.</Text>
          </GridItem>
          <GridItem bg="white" shadow="md" borderRadius="lg" p={4}>
            <Heading size="md">Card 3</Heading>
            <Text mt={2}>Some details about Card 3.</Text>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default AddJobList;
