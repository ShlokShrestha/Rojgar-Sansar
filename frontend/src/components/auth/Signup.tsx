import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { ISignUpValues } from "../../types/type";
import PrimaryButton from "../resuable/Button/PrimaryButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidationSchema } from "../../utils/validationSchema";
import APIS from "../../constants/EndPoint";
import { useFilePostHook } from "../../customhooks/useFileUploadApiHook";
import defaultUser from "../../assets/defaultUserBlack.svg";

const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");
  const { mutateAsync: signup, status } = useFilePostHook({
    queryKey: ["signup"],
    navigateURL: "/login",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      profileImage: null,
      role: "",
    },
    resolver: yupResolver(signUpValidationSchema),
  });

  const onSubmit = handleSubmit(async (data: ISignUpValues) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append(
      "profileImage",
      data.profileImage ? data.profileImage[0] : null
    );
    try {
      await signup({
        url: `${APIS.SIGNUP}`,
        formData: formData,
      });
    } catch (err) {
      console.log(err);
    }
  });
  const handleUploadImage = (data: any) => {
    const file = data.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFile(imageUrl);
    }
  };
  return (
    <Center minH="100vh" bg="gray.50">
      <Box w="full" maxW="sm" p={6} borderRadius="lg" boxShadow="lg" bg="white">
        <Text textAlign="center" fontSize="xl" fontWeight="bold" mb={2}>
          Welcome
        </Text>
        <Text textAlign="center" color="gray.600" mb={6}>
          Sign Up to continue to Rojgar Sansar.
        </Text>
        <form onSubmit={onSubmit}>
          <Stack gap={4} mb={4}>
            <Field
              label="FullName"
              invalid={!!errors.fullName}
              errorText={errors.fullName?.message}
            >
              <Input
                {...register("fullName")}
                type="text"
                placeholder="Enter your full name"
              />
            </Field>
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
            <Field
              label="Role"
              invalid={!!errors.role}
              errorText={errors.role?.message}
            >
              <HStack gap={5}>
                <label htmlFor="user">
                  <input
                    {...register("role")}
                    type="radio"
                    value="user"
                    id="user"
                  />
                  User
                </label>
                <label htmlFor="recruiter">
                  <input
                    {...register("role")}
                    type="radio"
                    value="recruiter"
                    id="recruiter"
                  />
                  Recruiter
                </label>
              </HStack>
            </Field>
            <Flex gap={4} alignItems={"center"}>
              <Image
                src={file ? file : defaultUser}
                boxSize="30px"
                borderRadius="full"
                fit="cover"
                alt="Naruto Uzumaki"
              />
              <Input
                {...register("profileImage")}
                type="file"
                onChange={handleUploadImage}
              />
            </Flex>
            <PrimaryButton
              text={"Continue"}
              disable={status === "pending" ? true : false}
            />
          </Stack>
        </form>
        <Stack gap={4}>
          <Text
            textAlign="center"
            fontSize="sm"
            color="gray.600"
            fontWeight="semibold"
          >
            Already have an account?{" "}
            <Link
              color="purple.500"
              fontWeight="bold"
              href="/login"
              outline={"none"}
              border={"none"}
            >
              Login
            </Link>
          </Text>
          <Text textAlign="center" color="gray.500" fontSize="sm">
            OR
          </Text>
          <Button
            // leftIcon={<FaGoogle />}
            colorScheme="red"
            variant="outline"
            size="lg"
          >
            Continue with Google
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default SignUp;
