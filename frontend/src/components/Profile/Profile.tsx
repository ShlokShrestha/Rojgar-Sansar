import { Box } from "@chakra-ui/react";
import AppliedJobList from "./AppliedJobList";
import ProfileDetails from "./ProfileDetails";
import { ITableProps } from "../../types/type";

interface IProfile extends ITableProps {
  isLoading: boolean;
  openUpdateProfile: boolean;
  setOpenUpdateProfile: (data: boolean) => void;
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
  } = props;
  return (
    <>
      <Box display="flex" justifyContent="center" mt="10">
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
            />
          </Box>
          <Box mt="10px" bg="white" p="4" rounded="lg" shadow="lg">
            {/* <AppliedJobList
              setOffset={setOffset}
              pageSize={pageSize}
              setPageSize={setPageSize}
              isLoading={false}
              userData={undefined}
            /> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
