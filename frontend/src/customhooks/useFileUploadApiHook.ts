import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { postApiFormData, putApiFormData } from "../helpers/axiosInstance";

const useFilePostHook = ({ queryKey, navigateURL }: any) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    status,
    mutateAsync,
    isSuccess: isPostSuccess,
    data: postData,
    isError: isPostError,
  } = useMutation({
    mutationFn: postApiFormData,
    onSuccess: (data: any) => {
      if (data.status === 201 || data.status === 200) {
        toast.success(data.data.message ?? "Sent successfully");
        if (navigateURL) {
          navigate(navigateURL);
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

const useFilePutHook = ({ queryKey, navigateURL }: any) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    status,
    mutateAsync,
    isSuccess: isPostSuccess,
    data: postData,
    isError: isPostError,
  } = useMutation({
    mutationFn: putApiFormData,
    onSuccess: (data: any) => {
      if (data.status === 201 || data.status === 200) {
        toast.success(data.data.message ?? "Sent successfully");
        if (navigateURL) {
          navigate(navigateURL);
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

export { useFilePostHook, useFilePutHook };
