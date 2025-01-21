import { Box, Center, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { IChangePasswordValues } from "../../types/type";
import { updatePasswordValidationSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import PrimaryButton from "../resuable/Button/PrimaryButton";

interface IUpdatePasswordProps {
  handleUpdatePasswordSubmit: (data: IChangePasswordValues) => void;
}
const UpdatePassword = (props: IUpdatePasswordProps) => {
  const { handleUpdatePasswordSubmit } = props;
  const [isOpen, setIsOpen] = useState({
    oldPassword: false,
    newPassword: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordValues>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(updatePasswordValidationSchema),
  });
  const onSubmit = handleSubmit((data) => handleUpdatePasswordSubmit(data));
  return (
    <Center minH="90vh" bg="gray.50">
      <Box w="full" maxW="sm" p={6} borderRadius="lg" boxShadow="lg" bg="white">
        <Text
          textAlign="center"
          color="gray.600"
          mb={6}
          fontWeight="bold"
          fontSize="xl"
        >
          Update Password
        </Text>
        <form onSubmit={onSubmit}>
          <Stack gap={4} mb={4}>
            <Field
              label="Old Password"
              invalid={!!errors.oldPassword}
              errorText={errors.oldPassword?.message}
            >
              <Input
                {...register("oldPassword")}
                type={isOpen?.oldPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <Box
                position={"absolute"}
                right={3}
                top={9}
                fontSize="20px"
                cursor={"pointer"}
                onClick={() =>
                  setIsOpen((pre: any) => ({
                    ...pre,
                    oldPassword: !pre.oldPassword,
                  }))
                }
              >
                {isOpen.oldPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </Box>
            </Field>
            <Field
              label="New Password"
              invalid={!!errors.newPassword}
              errorText={errors.newPassword?.message}
            >
              <Input
                {...register("newPassword")}
                type={isOpen?.newPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <Box
                position={"absolute"}
                right={3}
                top={9}
                fontSize="20px"
                cursor={"pointer"}
                onClick={() =>
                  setIsOpen((pre: any) => ({
                    ...pre,
                    newPassword: !pre.newPassword,
                  }))
                }
              >
                {isOpen.newPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </Box>
            </Field>
            <PrimaryButton text={"Continue"} />
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default UpdatePassword;
