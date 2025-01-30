import { Field } from "../../ui/field";
import {
  Grid,
  Input,
  NativeSelectField,
  NativeSelectRoot,
} from "@chakra-ui/react";
import {
  ICategoryValues,
  ICompanyValues,
  IJobValues,
  IReactFormProps,
} from "../../../types/type";
import { useGetHook } from "../../../customhooks/useApiHook";
import APIS from "../../../constants/EndPoint";

const JobForm: React.FC<IReactFormProps<IJobValues>> = (props) => {
  const { errors, register } = props;
  const { data: companyData } = useGetHook({
    queryKey: ["company"],
    url: `${APIS.COMPANYLIST}`,
    params: {},
  });
  const { data: categoryData } = useGetHook({
    queryKey: ["category"],
    url: `${APIS.MYCATEGORYLIST}`,
    params: {},
  });

  return (
    <Grid gap="4" templateColumns="repeat(3, 1fr)" py={3}>
      <Field
        label="Job title"
        invalid={!!errors.title}
        errorText={errors.title?.message}
      >
        <Input
          {...register("title")}
          type="text"
          placeholder="Enter job title"
        />
      </Field>
      <Field
        label="Company"
        invalid={!!errors.companyId}
        errorText={errors.companyId?.message}
      >
        <NativeSelectRoot>
          <NativeSelectField {...register("companyId")}>
            <option disabled value="">
              Select company
            </option>
            {companyData?.data?.map((item: ICompanyValues, index: number) => (
              <option key={index} value={item.id}>
                {item.title}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field
        label="Job Category"
        invalid={!!errors.jobCategoryId}
        errorText={errors.jobCategoryId?.message}
      >
        <NativeSelectRoot>
          <NativeSelectField {...register("jobCategoryId")}>
            <option disabled value="">
              Select company
            </option>
            {categoryData?.data?.map((item: ICategoryValues, index: number) => (
              <option key={index} value={item.id}>
                {item.title}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field
        label="Number of hires"
        invalid={!!errors.numberOfHires}
        errorText={errors.numberOfHires?.message}
      >
        <Input
          {...register("numberOfHires")}
          type="number"
          placeholder="Enter number of hires"
        />
      </Field>
      <Field
        label="Work Type"
        invalid={!!errors.workType}
        errorText={errors.workType?.message}
      >
        <NativeSelectRoot>
          <NativeSelectField {...register("workType")}>
            <option disabled value="">
              Select work type
            </option>
            <option value="fullTime">FullTime</option>
            <option value="partTime">PartTime</option>
            <option value="hybrid">Hybrid</option>
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field
        label="Salary"
        invalid={!!errors.salary}
        errorText={errors.salary?.message}
      >
        <Input {...register("salary")} type="text" placeholder="Enter salary" />
      </Field>
      <Field
        label="Description"
        invalid={!!errors.description}
        errorText={errors.description?.message}
      >
        <Input
          {...register("description")}
          type="text"
          placeholder="Enter description"
        />
      </Field>
    </Grid>
  );
};

export default JobForm;
