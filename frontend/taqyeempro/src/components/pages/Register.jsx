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
import StudentRegister from "../registeration-forms/StudentRegister";
import ModeratorRegister from "../registeration-forms/ModeratorRegister";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("student");
  useEffect(() => {
    console.log(selectedRole);
  }, [selectedRole])

  return (
    <Box display="flex" alignItems="center" justifyContent="center" px={6}>
      <Box p={10} rounded="xl" w={{ base: "100%", sm: "500px" }}>
        <Heading
          mb={4}
          size="6xl"
          fontWeight={"bold"}
          textAlign="center"
          color="gray.800"
        >
          Register
        </Heading>
        <Text mb={6} textAlign="center" color="gray.600">
          Create your Taqyeem Pro account
        </Text>

        {/* Register Form */}
        <VStack spacing={4}>
          <RadioGroup.Root
            pb={5}
            defaultValue="student"
            onChange={(value) => setSelectedRole(value.target.defaultValue)}
            value={selectedRole}
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
        </VStack>

        {/* Render form based on the selected role */}
        {selectedRole == "student" ? <StudentRegister/> : <ModeratorRegister/>}

        {/* OR Separator */}
        <HStack m={5}>
          <Separator flex="1" size={"lg"} />
          <Text flexShrink="0" fontWeight={"semibold"}>
            OR
          </Text>
          <Separator flex="1" size={"lg"} />
        </HStack>

        <Text mt={6} textAlign="center" fontWeight={"bold"} color="gray.600">
          Already have an account?{" "}
          <ChakraLink as={Link} to="/login" color="red.500">
            Log In
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
}
