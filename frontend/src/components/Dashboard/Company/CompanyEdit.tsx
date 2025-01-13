import { useForm } from "react-hook-form";
import CompanyForm from "./CompanyForm";
import FormCard from "../../resuable/FormCard";
import { Stack } from "@chakra-ui/react";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import { ICompanyValues } from "../../../types/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyValidationSchema } from "../../../utils/validationSchema";

interface ICompanyProps {
  loading: boolean;
  singleCompanyData: ICompanyValues;
  handleEditCompanySubmit: (data: ICompanyValues) => void;
}

const CompanyEdit = (props: ICompanyProps) => {
  const { singleCompanyData, handleEditCompanySubmit, loading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ICompanyValues>({
    defaultValues: {
      title: singleCompanyData?.title ?? "",
      location: singleCompanyData?.location,
      companyLogo: singleCompanyData?.logoUrl,
    },
    resolver: yupResolver(companyValidationSchema),
  });

  const onSubmit = handleSubmit((data) => handleEditCompanySubmit(data));
  return (
    <FormCard title="Edit Company">
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm" pt={3}>
          <CompanyForm
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <PrimaryButton text={"Update"} disable={loading ? true : false} />
        </Stack>
      </form>
    </FormCard>
  );
};

export default CompanyEdit;
