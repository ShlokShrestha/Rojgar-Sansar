import { Box, Center } from "@chakra-ui/react";
import ProfileDetails from "./ProfileDetails";
import { IProfileValue, ITableProps } from "../../types/type";
import AppliedJobList from "./AppliedJobList";
import { useAuth } from "../../context/authContext";

interface IProfile extends ITableProps {
  isLoading: boolean;
  openUpdateProfile: boolean;
  updateLoading: boolean;
  setOpenUpdateProfile: (data: boolean) => void;
  handleUpdateUserProfileSubmit: (data: IProfileValue) => void;
  userData: any;
}

const Profile = (props: IProfile) => {
  const {
    userData,
    setOffset,
    pageSize,
    setPageSize,
    openUpdateProfile,
    setOpenUpdateProfile,
    handleUpdateUserProfileSubmit,
    updateLoading,
  } = props;
  const { auth } = useAuth() as any;
  return (
    <>
      <Center mt="10">
        <Box width={{ base: "90%", md: "75%", lg: "50%" }}>
          <Box
            bg="white"
            p="4"
            display="flex"
            justifyContent="space-between"
            rounded="lg"
            shadow="lg"
          >
            <ProfileDetails
              openUpdateProfile={openUpdateProfile}
              setOpenUpdateProfile={setOpenUpdateProfile}
              userData={userData?.data}
              handleUpdateUserProfileSubmit={handleUpdateUserProfileSubmit}
              updateLoading={updateLoading}
            />
          </Box>
          {auth.role === "user" && (
            <Box mt="10px" bg="white" p="4" rounded="lg" shadow="lg">
              <AppliedJobList
                setOffset={setOffset}
                pageSize={pageSize}
                setPageSize={setPageSize}
                isLoading={false}
                userData={userData?.data?.applications}
              />
            </Box>
          )}
        </Box>
      </Center>
    </>
  );
};

export default Profile;
