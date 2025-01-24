import { useForm } from "react-hook-form";
import JobForm from "./JobForm";
import FormCard from "../../resuable/FormCard";
import PrimaryButton from "../../resuable/Button/PrimaryButton";
import { IJobValues } from "../../../types/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { JobValidationSchema } from "../../../utils/validationSchema";

interface IJobProps {
  singleJobData: IJobValues;
  handleEditJobSubmit: (data: IJobValues) => void;
}

const JobEdit = (props: IJobProps) => {
  const { handleEditJobSubmit, singleJobData } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJobValues>({
    defaultValues: {
      title: singleJobData.title ?? "",
      description: singleJobData.description ?? "",
      salary: singleJobData?.salary ?? "",
      jobCategoryId: singleJobData?.jobCategoryId ?? "",
      companyId: singleJobData?.companyId ?? "",
      numberOfHires: singleJobData?.numberOfHires ?? "",
      workType: singleJobData?.workType ?? "",
    },
    resolver: yupResolver(JobValidationSchema),
  });

  const onSubmit = handleSubmit((data) => handleEditJobSubmit(data));
  return (
    <FormCard title="Edit Job">
      <form onSubmit={onSubmit}>
        <JobForm register={register} errors={errors} />
        <PrimaryButton text={"Update"} />
      </form>
    </FormCard>
  );
};

export default JobEdit;
