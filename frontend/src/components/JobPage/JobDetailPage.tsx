import {
  Box,
  Text,
  Button,
  VStack,
  Badge,
  Flex,
  Center,
  Image,
} from "@chakra-ui/react";
import Divider from "../resuable/Divider/Divider";
import moment from "moment";
import { useAuth } from "../../context/authContext";
import { IApplicantValues } from "../../types/type";

interface JobDetailPageProps {
  singleJobDetailData: any;
  handleApplyJob: (data: string) => void;
}
const JobDetailPage = (props: JobDetailPageProps) => {
  const { singleJobDetailData, handleApplyJob } = props;
  const numberOfApplicants = singleJobDetailData?.application?.length;
  const { auth } = useAuth() as any;
  const isAlreadyApplied = singleJobDetailData?.application?.some(
    (item: IApplicantValues) => {
      return item.userId === auth?.id;
    }
  );
  return (
    <Center>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        width={"5/6"}
        mt={5}
      >
        <Flex justify="space-between" align="start">
          <Flex gap={3} align="center">
            <Box
              boxSize={16}
              bg="gray.100"
              borderRadius="2xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                fontSize="xl"
                fontWeight="bold"
                src={singleJobDetailData?.company?.logoUrl}
                alt={singleJobDetailData?.company?.title}
              />
            </Box>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                {singleJobDetailData?.title}
              </Text>
              <Text fontWeight="medium" fontSize="lg">
                {singleJobDetailData?.company?.title}
              </Text>
            </Box>
          </Flex>
          {["admin", "recruiter"].includes(auth.role) ? (
            ""
          ) : isAlreadyApplied ? (
            <Button size="sm" bgColor="purple.600" mt={1}>
              Already Applied
            </Button>
          ) : (
            <Button
              size="sm"
              bgColor="purple.600"
              mt={1}
              onClick={() => handleApplyJob(singleJobDetailData?.id)}
            >
              Apply Now
            </Button>
          )}
        </Flex>
        <Flex mt={4} gap={2}>
          <Badge color="blue">
            {singleJobDetailData?.numberOfHires} Positions
          </Badge>
          <Badge color="red" textTransform="capitalize">
            {singleJobDetailData?.workType}
          </Badge>
          <Badge color="purple">{singleJobDetailData?.salary} LPA</Badge>
        </Flex>
        <Divider />
        <VStack align="start" gap={2}>
          <Text>
            <b>Location:</b> {singleJobDetailData?.company?.location}
          </Text>
          <Text>
            <b>Description:</b> {singleJobDetailData?.description}
          </Text>
          <Text>
            <b>Salary:</b> {singleJobDetailData?.salary} LPA
          </Text>
          <Text>
            <b>Total Applicants:</b> {numberOfApplicants}
          </Text>
          <Text>
            <b>Posted Date:</b>{" "}
            {moment(singleJobDetailData?.createdAt).format(
              "DD-MM-YYYY hh:mm A"
            )}
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default JobDetailPage;
