import React from "react";
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
  Select,
  createListCollection,
  Field,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegisterLogic } from "../../Logic/Register";
import { useNavigate } from "react-router-dom";


export default function ModeratorRegister({ role }) {
  const navigate = useNavigate();

  const {
    step, message, code,
    setCode, signUpUser, confirmUser, 
    setFormData
  } = useRegisterLogic(role); // Use the passed role = 'moderator'

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const genderList = createListCollection({
    items: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  });

  const handleSignupSubmit = (data) => {
    setFormData(data);
    signUpUser(data); // Send data to Cognito using the moderator pool
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {step === 'signup' && (
        <form onSubmit={handleSubmit(handleSignupSubmit)}>
          <VStack spacing={4}>
            {/* First Name and Last Name */}
            <HStack spacing={4} w="full">
              <Field.Root invalid={!!errors.firstName}>
                <Input
                  placeholder="First Name"
                  size="lg"
                  bg="white"
                  {...register("firstName", { required: "First name is required" })}
                />
                <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.lastName}>
                <Input
                  placeholder="Last Name"
                  size="lg"
                  bg="white"
                  {...register("lastName", { required: "Last name is required" })}
                />
                <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
              </Field.Root>
            </HStack>

            {/* Gender */}
            <Field.Root invalid={!!errors.gender} w="full">
              <Select.Root
                collection={genderList}
                size="lg"
                width="full"
                {...register("gender", { required: "Gender is required" })}
                onValueChange={(e) => setValue("gender", e.value)}
              >
                <Select.HiddenSelect />
                <Select.Control bg={"white"}>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Gender" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {genderList.items.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
              <Field.ErrorText>{errors.gender?.message || "Gender is required"}</Field.ErrorText>
            </Field.Root>

            {/* Date of Birth */}
            <Field.Root invalid={!!errors.dateOfBirth} w="full">
              <Input
                type="date"
                size="lg"
                bg="white"
                {...register("dateOfBirth", { required: "Date of birth is required" })}
              />
              <Field.ErrorText>{errors.dateOfBirth?.message}</Field.ErrorText>
            </Field.Root>

            {/* Phone Number */}
            <Field.Root invalid={!!errors.phoneNumber} w="full">
              <Input
                type="tel"
                size="lg"
                bg="white"
                placeholder="Phone Number"
                {...register("phoneNumber", { required: "Phone number is required" })}
              />
              <Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
            </Field.Root>

            {/* Email */}
            <Field.Root invalid={!!errors.email} w="full">
              <Input
                type="email"
                size="lg"
                bg="white"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            {/* Password */}
            <Field.Root invalid={!!errors.password} w="full">
              <Input
                type="password"
                size="lg"
                bg="white"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            {/* Register Button */}
            <Button
              bg="red.500"
              type="submit"
              color="white"
              size="lg"
              w="full"
              _hover={{ bg: "black" }}
            >
              Register
            </Button>
          </VStack>
        </form>
      )}

      {step === 'confirm' && (
        <VStack spacing={4} w="full">
          <Input
            name="code"
            placeholder="Confirmation Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            size="lg"
            bg="white"
          />
          <Button
            colorScheme="blue"
            w="full"
            onClick={async () => {
              await confirmUser();
              setTimeout(() => navigate("/login"), 400); // Wait 1.5s
            }}
          >
            Confirm
          </Button>
        </VStack>
      )}

      {message && (
        <Box mt={4} p={2} color="gray.700" textAlign="center">
          {message}
        </Box>
      )}
      </Box>
  );
}
