import { useForm } from "react-hook-form";
import CompanyForm from "./CompanyForm";
import FormCard from "../../resuable/FormCard";
import { Stack } from "@chakra-ui/react";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import { ICompanyValues } from "../../../types/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyValidationSchema } from "../../../utils/validationSchema";

const CompanyEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICompanyValues>({
    defaultValues: {
      name: "",
      location: "",
      companyLogo: null,
    },
    resolver: yupResolver(companyValidationSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <FormCard title="Edit Company">
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm" pt={3}>
          <CompanyForm register={register} errors={errors} />
          <PrimaryButton text={"Update"} />
        </Stack>
      </form>
    </FormCard>
  );
};

export default CompanyEdit;
