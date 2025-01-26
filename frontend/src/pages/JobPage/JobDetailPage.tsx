import { useParams } from "react-router";
import JobDetailPageComponent from "../../components/JobPage/JobDetailPage";
import APIS from "../../constants/EndPoint";
import { useGetHook, usePostHook } from "../../customhooks/useApiHook";

const JobDetailPage = () => {
  const { id } = useParams();
  const { data: singleJobDetailData, isLoading } = useGetHook({
    queryKey: ["joblistpage", id],
    url: `${APIS.SINGLEJOBDETAIL}${id}/`,
    params: {},
  });
  const { mutateAsync: applyJob } = usePostHook({
    queryKey: ["applyJob"],
    navigateURL: "",
  });

  const handleApplyJob = async (data: string) => {
    try {
      await applyJob({
        url: `${APIS.APPLYJOB}`,
        formData: {
          jobId: data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <JobDetailPageComponent
        singleJobDetailData={singleJobDetailData?.data}
        handleApplyJob={handleApplyJob}
      />
    </>
  );
};

export default JobDetailPage;
