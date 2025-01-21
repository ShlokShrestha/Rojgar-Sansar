import UpdatePasswordComponent from "../../components/Profile/UpdatePassword";
import APIS from "../../constants/EndPoint";
import { usePutHook } from "../../customhooks/useApiHook";
import { IChangePasswordValues } from "../../types/type";

type Props = {};

const UpdatePassword = (props: Props) => {
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <UpdatePasswordComponent handleUpdatePasswordSubmit={handleUpdatePasswordSubmit} />
    </div>
  );
};

export default UpdatePassword;
