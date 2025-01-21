import { Input } from "@chakra-ui/react";
import { IProfileValue, IReactFormProps } from "../../types/type";
import { Field } from "../ui/field";

const ProfileForm: React.FC<IReactFormProps<IProfileValue>> = (props) => {
  const { register, errors } = props;
  return (
    <>
      <Field
        label="Full Name"
        invalid={!!errors.fullName}
        errorText={errors.fullName?.message}
      >
        <Input
          {...register("fullName")}
          type="text"
          placeholder="Enter full name"
        />
      </Field>
      <Field
        label="Email"
        invalid={!!errors.email}
        errorText={errors.email?.message}
      >
        <Input {...register("email")} type="email" placeholder="Enter email" />
      </Field>
      <Field
        label="Phone Number"
        invalid={!!errors.phone}
        errorText={errors.phone?.message}
      >
        <Input {...register("phone")} type="text" placeholder="Phone Number" />
      </Field>
      <Field label="Bio" invalid={!!errors.bio} errorText={errors.bio?.message}>
        <Input {...register("bio")} type="text" placeholder="Enter Bio" />
      </Field>
      <Field
        label="Skills"
        invalid={!!errors.skills}
        errorText={errors.skills?.message}
      >
        <Input {...register("skills")} type="text" placeholder="Enter skills" />
      </Field>
      <Field
        label="Resume"
        invalid={!!errors.resume}
        errorText={errors.resume?.message as string | undefined}
      >
        <Input {...register("resume")} type="file" id="Resume" />
      </Field>
    </>
  );
};

export default ProfileForm;
