import CategoryListComponent from "../../../components/Dashboard/Category/CategoryList";
import usePaginationHook from "../../../customhooks/usePaginationHook";

const CategoryList = () => {
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();
  const categoryData: any = [
    { id: "1", title: "Frontend Developer" },
    { id: "2", title: "Backend Developer" },
  ];
  const handleDeleteCategory = (value: any) => {
    console.log(value, "value");
  };
  return (
    <>
      <CategoryListComponent
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        categoryData={categoryData}
        handleDeleteCategory={handleDeleteCategory}
      />
    </>
  );
};

export default CategoryList;
