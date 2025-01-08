import { Field } from "../../ui/field";
import { Input } from "@chakra-ui/react";
import { ICategoryValues, IReactFormProps } from "../../../types/type";

const CategoryForm: React.FC<IReactFormProps<ICategoryValues>> = (props) => {
  const { errors, register } = props;
  return (
    <Field
      label="Category name"
      invalid={!!errors.category}
      errorText={errors.category?.message}
    >
      <Input {...register("category")} type="text" placeholder="Enter category"/>
    </Field>
  );
};

export default CategoryForm;
