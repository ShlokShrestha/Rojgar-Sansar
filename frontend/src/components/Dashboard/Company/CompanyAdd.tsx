import { useForm } from "react-hook-form";
import CompanyForm from "./CompanyForm";
import FormCard from "../../resuable/FormCard";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import { Stack } from "@chakra-ui/react";
import { ICompanyValues } from "../../../types/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyValidationSchema } from "../../../utils/validationSchema";

interface ICompanyProps {
  handleAddCompanySubmit: (data: ICompanyValues) => void;
  loading: Boolean;
}

const CompanyAdd = (props: ICompanyProps) => {
  const { handleAddCompanySubmit, loading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICompanyValues>({
    defaultValues: {
      title: "",
      location: "",
      companyLogo: null,
    },
    resolver: yupResolver(companyValidationSchema),
  });
  const onSubmit = handleSubmit((data) => handleAddCompanySubmit(data));
  return (
    <FormCard title="Add Company">
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm" pt={3}>
          <CompanyForm register={register} errors={errors} />
          <PrimaryButton text={"Add"} disable={loading ? true : false} />
        </Stack>
      </form>
    </FormCard>
  );
};

export default CompanyAdd;
