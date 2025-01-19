import { Box, Image, Text } from "@chakra-ui/react";
import defaultUser from "../../assets/defaultUserBlack.svg";

type Props = {};

const Profile = (props: Props) => {
  const skill = ["HTML", "CSS", "Javascript", "React"];
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        bg="white"
        p="4"
        display="flex"
        justifyContent="space-between"
        width={{ base: "90%", md: "75%", lg: "50%" }}
        rounded="lg"
        shadow="lg"
        mt="10"
      >
        <Box>
          <Box display="flex" alignItems="center" gap="10px">
            <Image
              src={defaultUser}
              boxSize="80px"
              borderRadius="full"
              fit="cover"
              alt={defaultUser}
            />
            <Box>
              <Text>Shlok Shrestha</Text>
              <Text>Experience Developer</Text>
            </Box>
          </Box>
          <Box my="10px">
            <Text>abc.test@gmail.com</Text>
            <Text>+9779812345678</Text>
          </Box>
          <Box my="10px">
            <Text fontWeight={"bold"}>Skill</Text>
            <Box display="flex" gap="2" mt="2">
              {skill?.map((item: string, index: number) => (
                <Text key={index} bg="black" px="2" py="1" color="white" rounded="md">
                  {item}
                </Text>
              ))}
            </Box>
          </Box>
        </Box>
        <Image
          src={defaultUser}
          boxSize="50px"
          borderRadius="full"
          fit="cover"
          alt={defaultUser}
        />
      </Box>
    </Box>
  );
};

export default Profile;
