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

export default function StudentRegister() {
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
      { label: "Grade 9", value: "G9" },
      { label: "Grade 12", value: "G12" },
    ],
  });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} w="full">
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

          {/* Grade */}
          <Field.Root invalid={!!errors.grade} w="full">
            <Select.Root
              collection={gradesList}
              size="lg"
              width="full"
              {...register("grade", { required: "Grade is required" })}
            >
              <Select.HiddenSelect />
              <Select.Control bg={"white"}>
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

          {/* School Name */}
          <Field.Root invalid={!!errors.school} w="full">
            <Select.Root
              collection={schoolsList}
              size="lg"
              width="full"
              {...register("schoolId", { required: "School is required" })}
            >
              <Select.HiddenSelect />
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
            <Field.ErrorText>{errors.school?.message}</Field.ErrorText>
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
    </Box>
  );
}
