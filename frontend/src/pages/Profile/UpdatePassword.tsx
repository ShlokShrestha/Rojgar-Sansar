import { useNavigate } from "react-router";
import UpdatePasswordComponent from "../../components/Profile/UpdatePassword";
import APIS from "../../constants/EndPoint";
import { usePutHook } from "../../customhooks/useApiHook";
import { IChangePasswordValues } from "../../types/type";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { mutateAsync: updatePassword } = usePutHook({
    queryKey: ["updatePassword"],
    navigateURL: "/profile-setting",
  });

  const handleUpdatePasswordSubmit = async (data: IChangePasswordValues) => {
    try {
      await updatePassword({
        url: `${APIS.UPDATEUSERPASSWORD}/`,
        formData: data,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <UpdatePasswordComponent
        handleUpdatePasswordSubmit={handleUpdatePasswordSubmit}
      />
    </div>
  );
};

export default UpdatePassword;
