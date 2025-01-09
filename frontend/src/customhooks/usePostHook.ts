import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { postApiData } from "../helpers/axiosInstance";

const usePostHook = ({ queryKey, navigateURL }: any) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    status,
    mutateAsync,
    isSuccess: isPostSuccess,
    data: postData,
    isError: isPostError,
  } = useMutation( {
    mutationFn:postApiData,
    onSuccess: (data: any) => {
      if (data.status === 201 || data.status === 200) {
        toast.success(data.data.message ?? "Sent successfully");
        if (navigateURL) {
          navigate(navigateURL);
        }
      } else {
        if (data?.data?.non_field_errors) {
          toast.error(data?.data?.non_field_errors[0]);
        } else {
          toast.error(data?.data?.message ?? "Something went wrong");
        }
      }
    },
    onError: (error: any) => {
        toast.error(error.data.message ?? "Something went wrong");
    },
    onSettled: () => {
      if (queryKey && Array.isArray(queryKey)) {
        queryKey.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
      }
    },
  });
  return {
    status,
    mutateAsync,
    isPostSuccess,
    postData,
    isPostError,
  };
};

export default usePostHook;
