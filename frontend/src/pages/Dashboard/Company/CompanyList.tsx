import CompanyListComponent from "../../../components/Dashboard/Company/CompanyList";
import usePaginationHook from "../../../customhooks/usePaginationHook";

const CompanyList = () => {
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();
  const categoryData: any = [
    { id: "1", title: "Frontend Developer" },
    { id: "2", title: "Backend Developer" },
  ];
  const handleDeleteCompany = (value: any) => {
    console.log(value, "value");
  };
  return (
    <>
      <CompanyListComponent
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        categoryData={categoryData}
        handleDeleteCategory={handleDeleteCompany}
      />
    </>
  );
};

export default CompanyList;
