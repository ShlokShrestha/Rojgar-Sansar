import { useParams } from "react-router";
import CompanyEditComponent from "../../../components/Dashboard/Company/CompanyEdit";
import { useGetHook } from "../../../customhooks/useApiHook";
import { useFilePutHook } from "../../../customhooks/useFileUploadApiHook";
import { ICompanyValues } from "../../../types/type";
import APIS from "../../../constants/EndPoint";
import DataSpinner from "../../../components/resuable/Spinner";
import { string } from "yup";

const CompanyEdit = () => {
  const { id } = useParams<{ id: string | any }>();
  const { data: singleCompanyData, isLoading } = useGetHook({
    queryKey: ["singlecompany", `${id}`],
    url: `${APIS.SINGLECOMPANY}${id}`,
    params: {},
  });

  const { mutateAsync: editCompany } = useFilePutHook({
    queryKey: ["editCategory", `${id}`],
    navigateURL: "/dashboard/company",
  });

  const handleEditCompanySubmit = async (data: ICompanyValues) => {
    const formData = new FormData();
    if (typeof data.companyLogo !== "string") {
      formData.append("title", data.title);
      formData.append("location", data.location);
      formData.append("companyLogo", data.companyLogo[0]);
    }
    try {
      await editCompany({
        url: `${APIS.UPDATECOMPANY}${id}/`,
        formData: typeof data.companyLogo !== "string" ? formData : data,
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
        <CompanyEditComponent
          singleCompanyData={singleCompanyData?.data}
          handleEditCompanySubmit={handleEditCompanySubmit}
        />
      )}
    </>
  );
};

export default CompanyEdit;
