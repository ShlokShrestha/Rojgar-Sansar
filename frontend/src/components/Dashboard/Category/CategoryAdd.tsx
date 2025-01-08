import { useForm } from "react-hook-form";
import CategoryForm from "./CategoryForm";
import FormCard from "../../resuable/FormCard";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import { Stack } from "@chakra-ui/react";
import { ICategoryValues } from "../../../types/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryValidationSchema } from "../../../utils/validationSchema";

const CategoryAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoryValues>({
    defaultValues: {
      category: "",
    },
    resolver: yupResolver(categoryValidationSchema),
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <FormCard title="Add Category">
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm" pt={3}>
          <CategoryForm register={register} errors={errors} />
          <PrimaryButton text={"Add"} />
        </Stack>
      </form>
    </FormCard>
  );
};

export default CategoryAdd;
