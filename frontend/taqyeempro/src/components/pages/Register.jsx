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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Register() {
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
          {/* First Name and Last Name */}
          <HStack spacing={4} w="full">
            <Input placeholder="First Name" size="lg" background={"white"} />
            <Input placeholder="Last Name" size="lg" background={"white"} />
          </HStack>

          {/* Date of Birth */}
          <Input
            placeholder="Date of Birth"
            size="lg"
            type="date"
            background={"white"}
          />

          {/* Grade */}
          <Input placeholder="Grade" size="lg" background={"white"} />

          {/* School Name */}
          <Input placeholder="School Name" size="lg" background={"white"} />

          {/* Email */}
          <Input
            placeholder="Email"
            type="email"
            size="lg"
            background={"white"}
          />

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
