import { Field } from "../../ui/field";
import { Input } from "@chakra-ui/react";
import { IReactFormProps } from "../../../types/type";

const CategoryForm: React.FC<IReactFormProps> = (props) => {
  const { errors, register } = props;
  return (
    <Field
      label="Category name"
      invalid={!!errors.category}
      errorText={errors.category?.message}
    >
      <Input {...register("category")} />
    </Field>
  );
};

export default CategoryForm;
