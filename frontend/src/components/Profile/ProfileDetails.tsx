import { Box, Grid, Image, Stack, Text } from "@chakra-ui/react";
import defaultUser from "../../assets/defaultUserBlack.svg";
import { FiEdit } from "react-icons/fi";
import { MdOutlineEmail, MdPhoneIphone } from "react-icons/md";
import Modal from "../resuable/Modal";
import ProfileForm from "./ProfileForm";
import { useForm } from "react-hook-form";
import { IProfileValue } from "../../types/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileValidationSchema } from "../../utils/validationSchema";
import PrimaryButton from "../resuable/Button/PrimaryButton";

type Props = {
  openUpdateProfile: boolean;
  updateLoading: boolean;
  setOpenUpdateProfile: (data: boolean) => void;
  handleUpdateUserProfileSubmit: (data: IProfileValue) => void;
  userData: any;
};

const ProfileDetails = (props: Props) => {
  const {
    openUpdateProfile,
    setOpenUpdateProfile,
    userData,
    handleUpdateUserProfileSubmit,
    updateLoading,
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileValue>({
    defaultValues: {
      fullName: userData?.fullName ?? "",
      email: userData?.email ?? "",
      bio: userData?.bio ?? "",
      skills: userData?.skills ?? "",
      phone: userData?.phone ?? "",
      resume: userData?.resumeUrl ?? null,
    },
    resolver: yupResolver(profileValidationSchema),
  });
  const skill = ["HTML", "CSS", "Javascript", "React"];
  const onSubmit = handleSubmit((data) => handleUpdateUserProfileSubmit(data));

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
            <Text color="gray.600">{userData?.bio ?? "Add bio"}</Text>
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
            {userData?.phone ?? "Add Contact"}
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
        size="lg"
      >
        <form onSubmit={onSubmit}>
          <Grid templateColumns="repeat(2, 1fr)" gap="4" mb="5">
            <ProfileForm register={register} errors={errors} />
          </Grid>
          <PrimaryButton
            text={"Update"}
            disable={updateLoading ? true : false}
          />
        </form>
      </Modal>
    </>
  );
};

export default ProfileDetails;
