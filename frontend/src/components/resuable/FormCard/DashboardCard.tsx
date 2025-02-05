import { Box, Flex, Image, Text } from "@chakra-ui/react";
interface IDashboardCard {
  label: string;
  image?: string;
  data: number;
  icon?: any;
}

const DashboardCard = (props: IDashboardCard) => {
  const { label, icon, data, image } = props;
  return (
    <Flex
      bg={"white"}
      p={5}
      gap={10}
      height="130px"
      width="3/6"
      justifyContent="space-between"
    >
      <Box spaceY={2}>
        <Text>{label}</Text>
        <Text textStyle="3xl" fontWeight="bold">
          {data}
        </Text>
      </Box>
      {image && (
        <Image src={image} boxSize="50px" fit="cover" alt="Naruto Uzumaki" />
      )}
      {icon && icon}
    </Flex>
  );
};

export default DashboardCard;
