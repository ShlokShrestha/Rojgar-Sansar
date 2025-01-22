import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  deleteApiData,
  getApiData,
  postApiData,
  putApiData,
} from "../helpers/axiosInstance";

const useGetHook = ({ queryKey, url, params, isEnabled = true }: any) => {
  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const response = await getApiData(url, params);
        if (response?.status === 400) {
          toast.error("Something went wrong");
        }
        return response.data;
      } catch (err) {
        toast.error("Network error or request failed");
        throw err;
      }
    },
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });
  return { isLoading, isError, data, isSuccess };
};

const usePostHook = ({
  queryKey,
  navigateURL,
}: {
  queryKey: string[];
  navigateURL: string;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    status,
    mutateAsync,
    isSuccess: isPostSuccess,
    data: postData,
    isError: isPostError,
  } = useMutation({
    mutationFn: postApiData,
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
        queryKey.forEach((key: any) => {
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

const usePutHook = ({
  queryKey,
  navigateURL,
}: {
  queryKey: string[];
  navigateURL: string;
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    status,
    mutateAsync,
    isSuccess: isUpdateSuccess,
    data: updateData,
    isError: isUpdateError,
  } = useMutation({
    mutationFn: putApiData,
    onSuccess: (data) => {
      if (data.status === 201 || data.status === 200) {
        toast.success(data.data.message ??"Items is successfully updated");
        if (navigateURL) {
          navigate(navigateURL);
        }
      }
    },
    onError: (error: any) => {
      const errorCheck = error.data.message;
      toast.error(errorCheck || "Something went wrong");
    },
    onSettled: () => {
      if (queryKey && Array.isArray(queryKey)) {
        queryKey.forEach((key: any) => {
          queryClient.invalidateQueries(key);
        });
      }
    },
  });

  return {
    status,
    mutateAsync,
    isUpdateSuccess,
    updateData,
    isUpdateError,
    navigateURL,
  };
};

const useDeleteHook = ({ queryKey }: { queryKey: string[] }) => {
  const queryClient = useQueryClient();

  const { status, mutateAsync, isSuccess, data, isError } = useMutation({
    mutationFn: deleteApiData,
    onSuccess: (data: any) => {
      toast.success("Item deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.data.message ?? "something went wrong");
    },
    onSettled: () => {
      if (queryKey && Array.isArray(queryKey)) {
        queryKey.forEach((key: any) => {
          queryClient.invalidateQueries(key);
        });
      }
    },
  });
  return {
    status,
    mutateAsync,
    isSuccess,
    data,
    isError,
  };
};

export { usePostHook, usePutHook, useGetHook, useDeleteHook };
