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
import { fetchAuthSession, signUp, confirmSignUp, signIn } from 'aws-amplify/auth';
import { useState } from "react";
import { useRegisterLogic } from '../../Logic/Register';

import StudentRegister from "../registeration-forms/StudentRegister";
import ModeratorRegister from "../registeration-forms/ModeratorRegister";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("student");

  const {
    step, message, code, formData,
    setCode, handleChange,
    signUpUser, confirmUser, signInUser
  } = useRegisterLogic();
  
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
          {step === "signup" && (
            <>
              <HStack spacing={4} w="full">
                <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} size="lg" background={"white"} />
                <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} size="lg" background={"white"} />
              </HStack>

              <Input name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} size="lg" background={"white"} />
              <Input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} size="lg" background={"white"} />
              <Input name="grade" placeholder="Grade" value={formData.grade} onChange={handleChange} size="lg" background={"white"} />
              <Input name="school" placeholder="School Name" value={formData.school} onChange={handleChange} size="lg" background={"white"} />
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} size="lg" background={"white"} />
              <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} size="lg" background={"white"} />

              <Button
                bg="red.500"
                color="white"
                size="lg"
                w="full"
                _hover={{ bg: "black" }}
                onClick={signUpUser}
              >
                Register
              </Button>
            </>
          )}

          {step === "confirm" && (
            <>
              <Input
                name="code"
                placeholder="Confirmation Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                size="lg"
                background={"white"}
              />
              <Button
                bg="blue.500"
                color="white"
                size="lg"
                w="full"
                _hover={{ bg: "black" }}
                onClick={confirmUser}
              >
                Confirm
              </Button>
            </>
          )}

          {step === "signin" && (
            <>
              <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} size="lg" background={"white"} />
              <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} size="lg" background={"white"} />
              <Button
                bg="green.500"
                color="white"
                size="lg"
                w="full"
                _hover={{ bg: "black" }}
                onClick={signInUser}
              >
                Sign In
              </Button>
            </>
          )}
        </VStack>

        {message && (
          <Text mt={4} textAlign="center" color="gray.700" fontWeight="medium">
            {message}
          </Text>
        )}

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
