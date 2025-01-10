import CategoryListComponent from "../../../components/Dashboard/Category/CategoryList";
import usePaginationHook from "../../../customhooks/usePaginationHook";
import { useDeleteHook, useGetHook } from "../../../customhooks/useApiHook";
import APIS from "../../../constants/EndPoint";

const CategoryList = () => {
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();
  const { data: categoryData, isLoading } = useGetHook({
    queryKey: ["category"],
    url: `${APIS.CATEGORYLIST}`,
    params: {},
  });
  const { mutateAsync: deleteCategory } = useDeleteHook({
    queryKey: ["category"],
  });

  const handleDeleteCategory = async (id: string) => {
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
      <CategoryListComponent
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        categoryData={categoryData?.data}
        isLoading={isLoading}
        handleDeleteCategory={handleDeleteCategory}
      />
    </>
  );
};

export default CategoryList;
