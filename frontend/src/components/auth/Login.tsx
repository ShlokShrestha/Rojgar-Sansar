import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { AuthContextType, ILoginValues } from "../../types/type";
import PrimaryButton from "../resuable/Button/PrimaryButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../utils/validationSchema";
import { FaGoogle } from "react-icons/fa6";
import { usePostHook } from "../../customhooks/useApiHook";
import { setLocalKey } from "../../helpers/sessionKey";
import APIS from "../../constants/EndPoint";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setAuth } = useAuth() as AuthContextType;
  const navigate = useNavigate();
  const { mutateAsync: login } = usePostHook({
    queryKey: ["login"],
    navigateURL: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });
  const onSubmit = handleSubmit(async (data: ILoginValues) => {
    try {
      const response = await login({
        url: `${APIS.LOGIN}`,
        formData: data,
      });
      setLocalKey("token", response.data.token);
      setLocalKey("userInfo", JSON.stringify(response.data.data));
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
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
            <Link
              color="purple.500"
              fontSize="sm"
              textAlign="right"
              href="/forgotPassword"
              border="none"
              outline="none"
            >
              Forgot password?
            </Link>
            <PrimaryButton text={"Continue"} />
          </Stack>
        </form>
        <Stack gap={4}>
          <Text
            textAlign="center"
            fontSize="sm"
            color="gray.600"
            fontWeight="semibold"
          >
            Don't have an account?{" "}
            <Link
              color="purple.500"
              fontWeight="bold"
              href="/signup"
              outline={"none"}
              border={"none"}
            >
              Sign up
            </Link>
          </Text>
          <Text textAlign="center" color="gray.500" fontSize="sm">
            OR
          </Text>
          <Button colorScheme="red" variant="outline" size="lg">
            <FaGoogle /> Continue with Google
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Login;
