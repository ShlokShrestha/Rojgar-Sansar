import JobAddComponent from "../../../components/Dashboard/Job/JobAdd";
import APIS from "../../../constants/EndPoint";
import { usePostHook } from "../../../customhooks/useApiHook";
import { ICompanyValues } from "../../../types/type";

const JobAdd = () => {
  const { mutateAsync: addCompany, status } = usePostHook({
    queryKey: ["addCompany"],
    navigateURL: "/dashboard/company",
  });

  const handleAddCompanySubmit = async (data: ICompanyValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("location", data.location);
    formData.append("companyLogo", data.companyLogo[0]);
    try {
      await addCompany({
        url: `${APIS.ADDCOMPANY}`,
        formData: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <JobAddComponent handleAddCompanySubmit={handleAddCompanySubmit} />
    </>
  );
};

export default JobAdd;
