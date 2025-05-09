import React, { useEffect, useState } from "react";
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
  createListCollection,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function StudentRegister() {
  const gradesList = createListCollection({
    items: [
      { label: "Grade 9", value: "G9" },
      { label: "Grade 12", value: "G12" },
    ],
  });
  const genderList = createListCollection({
    items: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
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
  return (
    <VStack spacing={4}>
      {/* First Name and Last Name */}
      <HStack spacing={4} w="full">
        <Input placeholder="First Name" size="lg" background={"white"} />
        <Input placeholder="Last Name" size="lg" background={"white"} />
      </HStack>
      
      {/* Gender */}
      <Select.Root collection={genderList} size="lg" width="full">
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
            {genderList.items.map((specifications) => (
              <Select.Item item={specifications} key={specifications.value}>
                {specifications.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>

      {/* Date of Birth */}
      <Input
        placeholder="Date of Birth"
        size="lg"
        type="date"
        background={"white"}
      />

      {/* Grade */}
      <Select.Root collection={gradesList} size="lg" width="full">
        <Select.HiddenSelect />
        <Select.Control bg={"white"}>
          <Select.Trigger>
            <Select.ValueText placeholder="Grade" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {gradesList.items.map((specifications) => (
              <Select.Item item={specifications} key={specifications.value}>
                {specifications.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>

      {/* School Name */}
      <Select.Root collection={schoolsList} size="lg" width="full">
        <Select.HiddenSelect />
        <Select.Control bg="white">
          <Select.Trigger>
            <Select.ValueText placeholder="School" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {schoolsList.items.map((spec) => (
              <Select.Item item={spec} key={spec.value}>
                {spec.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>

      {/* Email */}
      <Input placeholder="Email" type="email" size="lg" background={"white"} />

      {/* Password */}
      <Input
        placeholder="Password"
        type="password"
        size="lg"
        background={"white"}
      />

      {/* Register Button */}
      <Button
        bg="red.500"
        color="white"
        size="lg"
        w="full"
        _hover={{ bg: "black" }}
      >
        Register
      </Button>
    </VStack>
  );
}
