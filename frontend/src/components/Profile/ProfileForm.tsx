import { Box, Button, Input, Link, Textarea } from "@chakra-ui/react";
import { IProfileValue, IReactFormProps } from "../../types/type";
import { Field } from "../ui/field";
import { LuExternalLink } from "react-icons/lu";

const ProfileForm: React.FC<IReactFormProps<IProfileValue>> = (props) => {
  const { register, errors, getValues } = props;
  const value: string | any = getValues?.("resume");
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
      <Field
        label="Resume"
        invalid={!!errors.resume}
        errorText={errors.resume?.message as string | undefined}
      >
        {value ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="5"
            pt="2"
          >
            <Link
              href={value}
              target="_black"
              outline="none"
              whiteSpace="nowrap"
            >
              View my resume
              <LuExternalLink />
            </Link>
            <label
              htmlFor="resumeInput"
              style={{
                display: "inline-block",
                padding: "5px 10px",
                backgroundColor: "#4CAF50",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Update your resume
            </label>
            <Input
              {...register("resume")}
              type="file"
              style={{
                position: "absolute",
                opacity: 0,
                zIndex: -1,
              }}
              id="resumeInput"
            />
          </Box>
        ) : (
          <Input {...register("resume")} type="file" />
        )}
      </Field>
      <Field
        label="Skills"
        invalid={!!errors.skills}
        errorText={errors.skills?.message}
      >
        <Input {...register("skills")} type="text" placeholder="Enter skills" />
      </Field>
      <Field label="Bio" invalid={!!errors.bio} errorText={errors.bio?.message}>
        <Textarea
          {...register("bio")}
          placeholder="Enter Bio"
          height="100px"
          resize="none"
        />
      </Field>
    </>
  );
};

export default ProfileForm;
