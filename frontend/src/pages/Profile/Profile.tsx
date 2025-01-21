import { useState } from "react";
import ProfileComponent from "../../components/Profile/Profile";
import { useGetHook } from "../../customhooks/useApiHook";
import usePaginationHook from "../../customhooks/usePaginationHook";
import APIS from "../../constants/EndPoint";
import { useSearchParams } from "react-router";
import DataSpinner from "../../components/resuable/Spinner";
import { useFilePutHook } from "../../customhooks/useFileUploadApiHook";
import { IProfileValue } from "../../types/type";

const Profile = () => {
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);

  const { data: userData, isLoading } = useGetHook({
    queryKey: ["profile", offset, pageSize, searchQuery],
    url: `${APIS.USERPROFILE}`,
    params: {
      skip: offset,
      take: pageSize,
      ...(searchParams && { search: searchQuery }),
    },
  });

  const { mutateAsync: editUserProfile, status } = useFilePutHook({
    queryKey: ["updateProfile"],
    navigateURL: "",
  });

  const handleUpdateUserProfileSubmit = async (data: IProfileValue) => {
    const formData = new FormData();
    console.log(data.resume[0], "data");
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("bio", data.bio);
    formData.append("skills", data.skills);
    formData.append("phone", data.phone);
    formData.append("resume", data.resume[0]);
    try {
      await editUserProfile({
        url: `${APIS.UPDATEUSERPROFILE}/`,
        formData: formData,
      });
      setOpenUpdateProfile(false);
    } catch (error) {
      console.log(error);
    }
  };
  const updateLoading = status === "pending";
  return (
    <>
      {isLoading ? (
        <DataSpinner />
      ) : (
        <ProfileComponent
          isLoading={isLoading}
          openUpdateProfile={openUpdateProfile}
          setOpenUpdateProfile={setOpenUpdateProfile}
          userData={userData}
          setOffset={setOffset}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handleUpdateUserProfileSubmit={handleUpdateUserProfileSubmit}
          updateLoading={updateLoading}
        />
      )}
    </>
  );
};

export default Profile;
