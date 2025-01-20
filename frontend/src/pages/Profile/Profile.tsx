import { useState } from "react";
import ProfileComponent from "../../components/Profile/Profile";
import { useGetHook } from "../../customhooks/useApiHook";
import usePaginationHook from "../../customhooks/usePaginationHook";
import APIS from "../../constants/EndPoint";
import { useSearchParams } from "react-router";
import DataSpinner from "../../components/resuable/Spinner";

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
        />
      )}
    </>
  );
};

export default Profile;
