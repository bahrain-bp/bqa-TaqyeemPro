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

export default function Login() { 
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
          <Input
            placeholder="Email"
            type="email"
            size="lg"
            background={"white"}
          />
          <Input
            placeholder="Password"
            type="password"
            size="lg"
            background={"white"}
          />
          <Button
            bg="red.500"
            color="white"
            size="lg"
            w="full"
            _hover={{ bg: "black" }}
          >
            Login
          </Button>
        </VStack>

        {/* OR Separator */}
        <HStack m={5}>
          <Separator flex="1"  size={"lg"} />
          <Text flexShrink="0" fontWeight={"semibold"}>OR</Text>
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
