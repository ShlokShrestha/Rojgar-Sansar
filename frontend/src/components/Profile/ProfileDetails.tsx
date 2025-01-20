import { Box, Image, Text } from "@chakra-ui/react";

import defaultUser from "../../assets/defaultUserBlack.svg";
import { FiEdit } from "react-icons/fi";
import { MdOutlineEmail, MdPhoneIphone } from "react-icons/md";
import Modal from "../resuable/Modal";
type Props = {
  openUpdateProfile: boolean;
  setOpenUpdateProfile: (data: boolean) => void;
  userData: any;
};

const ProfileDetails = (props: Props) => {
  const { openUpdateProfile, setOpenUpdateProfile, userData } = props;
  const skill = ["HTML", "CSS", "Javascript", "React"];

  return (
    <>
      <Box>
        <Box display="flex" alignItems="center" gap="10px">
          <Image
            src={
              userData?.profile?.profileUrl
                ? userData?.profile?.profileUrl
                : defaultUser
            }
            boxSize="80px"
            borderRadius="full"
            fit="cover"
            alt="profile"
          />
          <Box>
            <Text fontWeight="bold">{userData?.fullName}</Text>
            <Text color="gray.600">Experience Developer</Text>
          </Box>
        </Box>

        {/* Contact Information */}
        <Box my="4">
          <Text display="flex" alignItems="center" gap="2px">
            <MdOutlineEmail />
            {userData?.email}
          </Text>
          <Text display="flex" alignItems="center" gap="2px" mt="2">
            <MdPhoneIphone />
            +9779812345678
          </Text>
        </Box>

        {/* Skills Section */}
        <Box my="4">
          <Text fontWeight="bold">Skills</Text>
          <Box display="flex" gap="2" mt="2" flexWrap="wrap">
            {skill?.map((item: string, index: number) => (
              <Text
                key={index}
                bg="black"
                color="white"
                px="2"
                py="1"
                rounded="md"
              >
                {item}
              </Text>
            ))}
          </Box>
        </Box>
      </Box>
      {/* Edit Icon */}
      <FiEdit
        style={{
          width: "1.2rem",
          height: "1.2rem",
          color: "#F0AD4E",
          cursor: "pointer",
        }}
        onClick={() => setOpenUpdateProfile(true)}
      />
      <Modal
        open={openUpdateProfile}
        title="Update Profile"
        setOpen={setOpenUpdateProfile}
      >
        asd
      </Modal>
    </>
  );
};

export default ProfileDetails;
