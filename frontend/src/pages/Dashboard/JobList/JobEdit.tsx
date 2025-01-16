import { useParams } from "react-router";
import JobEditComponent from "../../../components/Dashboard/Job/JobEdit";
import APIS from "../../../constants/EndPoint";
import { useGetHook, usePutHook } from "../../../customhooks/useApiHook";
import DataSpinner from "../../../components/resuable/Spinner";

const JobEdit = () => {
  const { id } = useParams<{ id: string | any }>();
  const { data: singleJobData, isLoading } = useGetHook({
    queryKey: ["singlecategory", `${id}`],
    url: `${APIS.SINGLEJOB}${id}`,
    params: {},
  });

  const { mutateAsync: editCategory } = usePutHook({
    queryKey: ["editJobs", `${id}`],
    navigateURL: "/dashboard/job",
  });

  const handleEditJobSubmit = async (data: any) => {
    try {
      await editCategory({
        url: `${APIS.UPDATEJOB}${id}/`,
        formData: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <DataSpinner />
      ) : (
        <JobEditComponent
          handleEditJobSubmit={handleEditJobSubmit}
          singleJobData={singleJobData?.data}
        />
      )}
    </>
  );
};

export default JobEdit;
