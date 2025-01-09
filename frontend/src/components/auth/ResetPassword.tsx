import { useState } from "react";
import { Box, Center,  Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { IResetPasswordValues } from "../../types/type";
import PrimaryButton from "../resuable/Button/PrimaryButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordValidationSchema } from "../../utils/validationSchema";

const ResetPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordValues>({
    defaultValues: {
      token: "",
      password: "",
    },
    resolver: yupResolver(resetPasswordValidationSchema),
  });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Center minH="100vh" bg="gray.50">
      <Box w="full" maxW="sm" p={6} borderRadius="lg" boxShadow="lg" bg="white">
        <Text textAlign="center" fontSize="xl" fontWeight="bold" mb={2}>
          Welcome
        </Text>
        <Text textAlign="center" color="gray.600" mb={6}>
          Log in to continue to Rojgar Sansar.
        </Text>
        <form onSubmit={onSubmit}>
          <Stack gap={4} mb={4}>
            <Field
              label="Reset Token"
              invalid={!!errors.token}
              errorText={errors.token?.message}
            >
              <Input
                {...register("token")}
                type="text"
                placeholder="Enter your reset token"
              />
            </Field>
            <Field
              label="Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <Input
                {...register("password")}
                type={isOpen ? "text" : "password"}
                placeholder="Enter your password"
              />
              <Box
                position={"absolute"}
                right={3}
                top={9}
                fontSize="20px"
                cursor={"pointer"}
                onClick={() => setIsOpen((pre: boolean) => !pre)}
              >
                {isOpen ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </Box>
            </Field>
            <PrimaryButton text={"Continue"} />
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default ResetPassword;
