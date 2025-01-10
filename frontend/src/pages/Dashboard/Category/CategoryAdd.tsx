import CategoryAddComponent from "../../../components/Dashboard/Category/CategoryAdd";
import APIS from "../../../constants/EndPoint";
import { usePostHook } from "../../../customhooks/useApiHook";
import { ICategoryValues } from "../../../types/type";

const CategoryAdd = () => {
  const { mutateAsync: addCategory } = usePostHook({
    queryKey: ["addCategory"],
    navigateURL: "/dashboard/category",
  });

  const handleAddCategorySubmit = async (data: ICategoryValues) => {
    try {
      await addCategory({
        url: `${APIS.ADDCATEGORY}`,
        formData: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CategoryAddComponent handleAddCategorySubmit={handleAddCategorySubmit} />
    </>
  );
};

export default CategoryAdd;
