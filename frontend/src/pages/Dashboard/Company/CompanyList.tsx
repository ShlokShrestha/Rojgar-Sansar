import { useSearchParams } from "react-router";
import CompanyListComponent from "../../../components/Dashboard/Company/CompanyList";
import usePaginationHook from "../../../customhooks/usePaginationHook";
import { useDeleteHook, useGetHook } from "../../../customhooks/useApiHook";
import APIS from "../../../constants/EndPoint";

const CompanyList = () => {
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { data: companyData, isLoading } = useGetHook({
    queryKey: ["category", offset, pageSize, searchQuery],
    url: `${APIS.COMPANYLIST}`,
    params: {
      skip: offset,
      take: pageSize,
      ...(searchParams && { search: searchQuery }),
    },
  });
  const { mutateAsync: deleteCategory } = useDeleteHook({
    queryKey: ["category"],
  });

  const handleDeleteCompany = async (id: string) => {
    try {
      await deleteCategory({
        url: `${APIS.DELETECATEGORY}${id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CompanyListComponent
        isLoading={isLoading}
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        companyData={companyData}
        handleDeleteCategory={handleDeleteCompany}
      />
    </>
  );
};

export default CompanyList;
