import JobAddComponent from "../../../components/Dashboard/Job/JobAdd";
import APIS from "../../../constants/EndPoint";
import { usePostHook } from "../../../customhooks/useApiHook";
import { ICompanyValues } from "../../../types/type";

const JobAdd = () => {
  const { mutateAsync: addCompany } = usePostHook({
    queryKey: ["addJob"],
    navigateURL: "/dashboard/job",
  });

  const handleAddJobSubmit = async (data: ICompanyValues) => {
    try {
      await addCompany({
        url: `${APIS.ADDJOBS}`,
        formData: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <JobAddComponent handleAddJobSubmit={handleAddJobSubmit} />
    </>
  );
};

export default JobAdd;
