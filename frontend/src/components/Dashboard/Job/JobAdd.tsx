import { useForm } from "react-hook-form";
import JobForm from "./JobForm";
import FormCard from "../../resuable/FormCard";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import { IJobValues } from "../../../types/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { JobValidationSchema } from "../../../utils/validationSchema";

interface IJobProps {
  handleAddJobSubmit: (data: any) => void;
}
const JobAdd = (props: IJobProps) => {
  const { handleAddJobSubmit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJobValues>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      salary: "",
      jobCategoryId: "",
      companyId: "",
    },
    resolver: yupResolver(JobValidationSchema),
  });
  const onSubmit = handleSubmit((data) => handleAddJobSubmit(data));

  return (
    <FormCard title="Add Job">
      <form onSubmit={onSubmit}>
        <JobForm register={register} errors={errors} />
        <PrimaryButton text={"Add"} />
      </form>
    </FormCard>
  );
};

export default JobAdd;
