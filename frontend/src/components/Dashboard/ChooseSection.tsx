import {
  Box,
  Heading,
  Text,
  Icon,
  Flex,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { BiBriefcase, BiBuildings, BiUser } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

const ChooseSection = () => {
  const cards = [
    {
      icon: BiBriefcase,
      title: "Diverse Opportunities",
      description:
        "Access thousands of job listings across various industries and experience levels.",
      features: [
        "100,000+ active job listings",
        "50+ job categories",
        "Remote and on-site options",
      ],
      buttonText: "Explore Jobs",
    },
    {
      icon: BiBuildings,
      title: "Top Companies",
      description:
        "Connect with leading companies, from innovative startups to Fortune 500 corporations.",
      features: [
        "500+ verified employers",
        "Exclusive partnerships",
        "Direct application process",
      ],
      buttonText: "View Companies",
    },
    {
      icon: BiUser,
      title: "Talent Pool",
      description:
        "Employers can access a diverse pool of qualified candidates for their open positions.",
      features: [
        "1M+ registered job seekers",
        "Advanced search filters",
        "AI-powered matching",
      ],
      buttonText: "Post a Job",
    },
  ];

  return (
    <Box bg="gray.50" py={10} px={5}>
      <Heading as="h2" size="xl" textAlign="center" mb={8}>
        Why Choose{" "}
        <Text as="span" color="purple.500">
          Rojgar Sansar
        </Text>
      </Heading>
      <Flex
        justify="center"
        gap={6}
        direction={{ base: "column", md: "row" }}
        align="center"
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            bg="white"
            boxShadow="md"
            borderRadius="lg"
            p={6}
            width={{ base: "100%", md: "30%" }}
            textAlign="left"
          >
            <Flex justify="left" mb={4}>
              {card.icon &&
                React.createElement(card.icon, {
                  size: 40,
                  color: "purple.500",
                })}
            </Flex>
            <Heading as="h3" size="md" mb={2}>
              {card.title}
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={4}>
              {card.description}
            </Text>
            <VStack align="start" mb={4}>
              {card.features.map((feature, idx) => (
                <HStack key={idx} align="start">
                  <FaCheck color="green" />
                  <Text fontSize="sm">{feature}</Text>
                </HStack>
              ))}
            </VStack>
            <Button colorScheme="purple" width="full">
              {card.buttonText}
            </Button>
          </Box>
        ))}
      </Flex>
      <Text fontSize="sm" color="gray.500" textAlign="center" mt={8}>
        Trusted by 10,000+ companies worldwide
      </Text>
    </Box>
  );
};

export default ChooseSection;
