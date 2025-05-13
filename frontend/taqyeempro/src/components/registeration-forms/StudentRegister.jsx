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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRegisterLogic } from "../../Logic/Register";

export default function StudentRegister({ role }) {
  const {
    step, message, code,
    setCode, signUpUser, confirmUser, signInUser,
    setFormData, email, password
  } = useRegisterLogic(role); //Use the passed role = 'student'

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

  const [schoolsList, setSchoolsList] = useState(createListCollection({ items: [] }));

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

  const handleSignupSubmit = (data) => {
    setFormData(data);
    signUpUser(data);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {step === 'signup' && (
        <form onSubmit={handleSubmit(handleSignupSubmit)}>
          <VStack spacing={4} w="full">
            <HStack spacing={4} w="full">
              <Field.Root invalid={!!errors.firstName}>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  size="lg"
                  bg="white"
                  {...register("firstName", { required: "First name is required" })}
                />
                <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.lastName}>
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  size="lg"
                  bg="white"
                  {...register("lastName", { required: "Last name is required" })}
                />
                <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
              </Field.Root>
            </HStack>

            <Field.Root invalid={!!errors.gender} w="full">
              <Select.Root
                collection={genderList}
                size="lg"
                width="full"
                onValueChange={(e) => setValue("gender", e.value)}
              >
                <Select.HiddenSelect {...register("gender", { required: "Gender is required" })} />
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
                {...register("dateOfBirth", { required: "Date of birth is required" })}
              />
              <Field.ErrorText>{errors.dateOfBirth?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.grade} w="full">
              <Select.Root
                collection={gradesList}
                size="lg"
                width="full"
                onValueChange={(e) => setValue("grade", e.value)}
              >
                <Select.HiddenSelect {...register("grade", { required: "Grade is required" })} />
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
                onValueChange={(e) => setValue("schoolId", e.value)}
              >
                <Select.HiddenSelect {...register("schoolId", { required: "School is required" })} />
                <Select.Control bg="white">
                  <Select.Trigger>
                    <Select.ValueText placeholder="School" />
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
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Button
              bg="red.500"
              color="white"
              size="lg"
              w="full"
              type="submit"
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
          <Button colorScheme="blue" w="full" onClick={confirmUser}>
            Confirm
          </Button>
        </VStack>
      )}

      {step === 'signin' && (
        <VStack spacing={4} w="full">
          <Input name="email" value={email} readOnly bg="white" />
          <Input name="password" type="password" value={password} readOnly bg="white" />
          <Button colorScheme="green" w="full" onClick={signInUser}>
            Sign In
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
