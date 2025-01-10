import { useParams } from "react-router";
import CategoryEditComponent from "../../../components/Dashboard/Category/CategoryEdit";
import APIS from "../../../constants/EndPoint";
import { useGetHook, usePutHook } from "../../../customhooks/useApiHook";
import { ICategoryValues } from "../../../types/type";
import { Spinner } from "@chakra-ui/react";
import DataSpinner from "../../../components/resuable/Spinner";

const CategoryEdit = () => {
  const { id } = useParams<{ id: string | any }>();
  const { data: singleDategoryData, isLoading } = useGetHook({
    queryKey: ["singlecategory", `${id}`],
    url: `${APIS.SINGLECATEGORY}${id}`,
    params: {},
  });

  const { mutateAsync: editCategory } = usePutHook({
    queryKey: ["editCategory", `${id}`],
    navigateURL: "/dashboard/category",
  });

  const handleEditCategorySubmit = async (data: ICategoryValues) => {
    try {
      await editCategory({
        url: `${APIS.UPDATECATEGORY}${id}/`,
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
        <CategoryEditComponent
          singleDategoryData={singleDategoryData?.data}
          handleEditCategorySubmit={handleEditCategorySubmit}
        />
      )}
    </>
  );
};

export default CategoryEdit;
