import CategoryListComponent from "../../../components/Dashboard/Category/CategoryList";
import usePaginationHook from "../../../customhooks/usePaginationHook";
import { useDeleteHook, useGetHook } from "../../../customhooks/useApiHook";
import APIS from "../../../constants/EndPoint";
import { useSearchParams } from "react-router";

const CategoryList = () => {
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { data: categoryData, isLoading } = useGetHook({
    queryKey: ["category", offset, pageSize, searchQuery],
    url: `${APIS.CATEGORYLIST}`,
    params: {
      skip: offset,
      take: pageSize,
      ...(searchParams && { search: searchQuery }),
    },
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
        categoryData={categoryData}
        isLoading={isLoading}
        handleDeleteCategory={handleDeleteCategory}
      />
    </>
  );
};

export default CategoryList;
