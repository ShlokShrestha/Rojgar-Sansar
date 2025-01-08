import { Field } from "../../ui/field";
import { Input } from "@chakra-ui/react";
import { ICompanyValues, IReactFormProps } from "../../../types/type";

const CategoryForm: React.FC<IReactFormProps<ICompanyValues>> = (props) => {
  const { errors, register } = props;
  return (
    <>
      <Field
        label="Company name"
        invalid={!!errors.name}
        errorText={errors.name?.message}
      >
        <Input
          {...register("name")}
          type="text"
          placeholder="Enter company name"
        />
      </Field>
      <Field
        label="Location"
        invalid={!!errors.location}
        errorText={errors.location?.message}
      >
        <Input
          {...register("location")}
          type="text"
          placeholder="Enter location"
        />
      </Field>
      <Field
        label="companyLogo"
        invalid={!!errors.companyLogo}
        errorText={errors.companyLogo?.message as string | undefined}
      >
        <Input {...register("companyLogo")} type="file" />
      </Field>
    </>
  );
};

export default CategoryForm;
