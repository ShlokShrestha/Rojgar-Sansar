import { Field } from "../../ui/field";
import { Input } from "@chakra-ui/react";
import { ICategoryValues, IReactFormProps } from "../../../types/type";

const CategoryForm: React.FC<IReactFormProps<ICategoryValues>> = (props) => {
  const { errors, register } = props;
  return (
    <Field
      label="Category name"
      invalid={!!errors.title}
      errorText={errors.title?.message}
    >
      <Input {...register("title")} type="text" placeholder="Enter category"/>
    </Field>
  );
};

export default CategoryForm;
