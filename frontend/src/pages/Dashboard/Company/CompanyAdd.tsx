import CompanyAddComponent from "../../../components/Dashboard/Company/CompanyAdd";
import APIS from "../../../constants/EndPoint";
import { useFilePostHook } from "../../../customhooks/useFileUploadApiHook";
import { ICompanyValues } from "../../../types/type";

const CompanyAdd = () => {
  const { mutateAsync: addCompany } = useFilePostHook({
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
      <CompanyAddComponent handleAddCompanySubmit={handleAddCompanySubmit} />
    </>
  );
};

export default CompanyAdd;
