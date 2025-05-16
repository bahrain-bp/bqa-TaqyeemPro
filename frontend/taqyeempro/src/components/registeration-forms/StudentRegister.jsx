import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Select,
  Field,
  createListCollection,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRegisterLogic } from "../../Logic/Register";
import { useNavigate } from "react-router-dom";

export default function StudentRegister({ role }) {
  const navigate = useNavigate();
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { step, message, code, setCode, signUpUser, confirmUser, setFormData } =
    useRegisterLogic(role); 

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
      grade: "",
      schoolId: "",
      email: "",
      password: "",
    },
  });

  const [schoolsList, setSchoolsList] = useState(
    createListCollection({ items: [] })
  );

  useEffect(() => {
    fetch("/bahrain_schools_list.json")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((school) => ({
          label: school.name,
          value: school.id || school.name,
        }));
        setSchoolsList(createListCollection({ items: formatted }));
      })
      .catch((err) => console.error("Error loading schools:", err));
  }, []);

  const genderList = createListCollection({
    items: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  });

  const gradesList = createListCollection({
    items: [
      { label: "Grade 9", value: 9 },
      { label: "Grade 12", value: 12 },
    ],
  });

  const handleSignupSubmit = async (data) => {
    setIsLoading(true);
    try {
      setFormData(data);
      await signUpUser(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {step === "signup" && (
        <form onSubmit={handleSubmit(handleSignupSubmit)}>
          <VStack spacing={4} w="full">
            {message && <Text color="red">{message}</Text>}
            <HStack spacing={4} w="full">
              <Field.Root invalid={!!errors.firstName}>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  size="lg"
                  bg="white"
                  disabled={isLoading}
                  css={{ "--focus-color": "red" }}
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.lastName}>
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  size="lg"
                  bg="white"
                  disabled={isLoading}
                  css={{ "--focus-color": "red" }}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
              </Field.Root>
            </HStack>

            <Field.Root invalid={!!errors.gender} w="full">
              <Select.Root
                collection={genderList}
                size="lg"
                width="full"
                disabled={isLoading}
                css={{ "--focus-color": "red" }}
                onValueChange={(e) => setValue("gender", e.value)}
              >
                <Select.HiddenSelect
                  {...register("gender", { required: "Gender is required" })}
                />
                <Select.Control bg="white">
                  <Select.Trigger>
                    <Select.ValueText placeholder="Gender" />
                  </Select.Trigger>
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
              <Field.ErrorText>{errors.gender?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.dateOfBirth} w="full">
              <Input
                name="dateOfBirth"
                type="date"
                size="lg"
                bg="white"
                disabled={isLoading}
                css={{ "--focus-color": "red" }}
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
              />
              <Field.ErrorText>{errors.dateOfBirth?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.grade} w="full">
              <Select.Root
                collection={gradesList}
                size="lg"
                css={{ "--focus-color": "red" }}
                width="full"
                disabled={isLoading}
                onValueChange={(e) => setValue("grade", e.value)}
              >
                <Select.HiddenSelect
                  {...register("grade", { required: "Grade is required" })}
                />
                <Select.Control bg="white">
                  <Select.Trigger>
                    <Select.ValueText placeholder="Grade" />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {gradesList.items.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
              <Field.ErrorText>{errors.grade?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.schoolId} w="full">
              <Select.Root
                collection={schoolsList}
                size="lg"
                width="full"
                disabled={isLoading}
                onValueChange={(e) => setValue("schoolId", e.value)}
              >
                <Select.HiddenSelect
                  {...register("schoolId", { required: "School is required" })}
                />
                <Select.Control bg="white">
                  <Select.Trigger>
                    <Select.ValueText
                      placeholder="School"
                      css={{ "--focus-color": "red" }}
                    />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {schoolsList.items.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
              <Field.ErrorText>{errors.schoolId?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.email} w="full">
              <Input
                name="email"
                type="email"
                size="lg"
                bg="white"
                disabled={isLoading}
                css={{ "--focus-color": "red" }}
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password} w="full">
              <Input
                name="password"
                type="password"
                size="lg"
                bg="white"
                disabled={isLoading}
                css={{ "--focus-color": "red" }}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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
                  <span>Registering...</span>
                </HStack>
              ) : (
                "Register"
              )}
            </Button>
          </VStack>
        </form>
      )}

      {step === "confirm" && (
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
            colorPalette="red"
            w="full"
            color="white"
              size="lg"
            onClick={async () => {
              await confirmUser();
              setTimeout(() => navigate("/login"), 400); // Wait 1.5s
            }}
          >
            Confirm
          </Button>
        </VStack>
      )}
    </Box>
  );
}
