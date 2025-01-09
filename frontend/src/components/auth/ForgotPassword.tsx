import { Box, Center, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { IForgotPasswordValues } from "../../types/type";
import PrimaryButton from "../resuable/Button/PrimaryButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotValidationSchema } from "../../utils/validationSchema";
import { usePostHook } from "../../customhooks/useApiHook";
import APIS from "../../constants/EndPoint";

const ForgotPassword = () => {
  const { mutateAsync: forgotPassword } = usePostHook({
    queryKey: ["forgotPassword"],
    navigateURL: "/resetPassword",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordValues>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotValidationSchema),
  });
  const onSubmit = handleSubmit(async (data: IForgotPasswordValues) => {
    try {
      await forgotPassword({
        url: `${APIS.FORGOTPASSWORD}`,
        formData: data,
      });
    } catch (error) {
      console.log(error);
    }
  });

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
              label="Email"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
              />
            </Field>
            <PrimaryButton text={"Continue"} />
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default ForgotPassword;
