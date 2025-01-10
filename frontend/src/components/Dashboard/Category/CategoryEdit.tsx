import { useForm } from "react-hook-form";
import CategoryForm from "./CategoryForm";
import FormCard from "../../resuable/FormCard";
import { Stack } from "@chakra-ui/react";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import { ICategoryValues } from "../../../types/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryValidationSchema } from "../../../utils/validationSchema";

interface ICategoryProps {
  singleDategoryData: ICategoryValues;
  handleEditCategorySubmit: (data: ICategoryValues) => void;
}

const CategoryEdit = (props: ICategoryProps) => {
  const { handleEditCategorySubmit, singleDategoryData } = props;
  console.log(singleDategoryData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoryValues>({
    defaultValues: {
      title: singleDategoryData?.title,
    },
    resolver: yupResolver(categoryValidationSchema),
  });

  const onSubmit = handleSubmit((data) => handleEditCategorySubmit(data));
  return (
    <FormCard title="Edit Category">
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm" pt={3}>
          <CategoryForm register={register} errors={errors} />
          <PrimaryButton text={"Update"} />
        </Stack>
      </form>
    </FormCard>
  );
};

export default CategoryEdit;
