import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Separator,
  Link as ChakraLink,
  RadioGroup,
  Stack,
  Field,
  Alert,
  CloseButton,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "@/Logic/Login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "student",
      email: "",
      password: "",
    },
  });

  const selectedRole = watch("role");
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true); // Start loading

    const role = selectedRole;
    const { email, password } = data;
    const result = await loginUser(role, email, password);

    if (result.success) {
      console.log("Signed in:", result.user);
      setAlertStatus("success");
      setAlertMessage("Login successful!");
      navigate("/");
      window.location.reload();
    } else {
      setAlertStatus("error");
      setAlertMessage(result.message);
    }

    setIsLoading(false); // Stop loading
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" px={6}>
      <Box p={10} rounded="xl" w={{ base: "100%", sm: "400px" }}>
        <Heading
          mb={4}
          size="6xl"
          fontWeight={"bold"}
          textAlign="center"
          color="gray.800"
        >
          Login
        </Heading>
        <Text mb={6} textAlign="center" color="gray.600">
          Sign in to your Taqyeem Pro account
        </Text>

        <VStack spacing={4}>
          <RadioGroup.Root
            pb={5}
            defaultValue="student"
            onValueChange={(val) => setValue("role", val.value)}
          >
            <HStack gap="6">
              <RadioGroup.Item value="student">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Student</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item value="moderator">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Moderator</RadioGroup.ItemText>
              </RadioGroup.Item>
            </HStack>
          </RadioGroup.Root>
          {alertStatus && (
            <Text color={"red"} textAlign={"left"}>
              {alertMessage}
            </Text>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack w={"sm"} maxW={"xs"}>
              <Field.Root invalid={!!errors.email}>
                <Input
                  placeholder="Email"
                  bg={"white"}
                  size={"lg"}
                  disabled={isLoading}
                  css={{ "--focus-color": "red" }}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                <Field.ErrorText>Email is required</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.password}>
                <Input
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  bg={"white"}
                  size={"lg"}
                  css={{ "--focus-color": "red" }}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <Field.ErrorText>Password is requried</Field.ErrorText>
              </Field.Root>
              <Button
                bg="red.500"
                type="submit"
                color="white"
                size="lg"
                w="full"
                _hover={{ bg: "black" }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <HStack spacing={2}>
                    <Spinner size="sm" />
                    <span>Loging in...</span>
                  </HStack>
                ) : (
                  "Login"
                )}
              </Button>
            </Stack>
          </form>
        </VStack>

        {/* OR Separator */}
        <HStack m={5}>
          <Separator flex="1" size={"lg"} />
          <Text flexShrink="0" fontWeight={"semibold"}>
            OR
          </Text>
          <Separator flex="1" size={"lg"} />
        </HStack>

        <Text mt={6} textAlign="center" fontWeight={"bold"} color="gray.600">
          Don’t have an account?{" "}
          <ChakraLink as={Link} to="/register" color="red.500">
            Sign Up
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
}
