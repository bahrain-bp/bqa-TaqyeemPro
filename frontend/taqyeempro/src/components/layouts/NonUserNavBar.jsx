import React from "react";
import { Box, Flex, HStack, Link, Button, Text } from "@chakra-ui/react";

export default function NonUserNavBar() {

  return (
    <div className="w-full h-30">
      <Box
        as="nav"
        bg="white"
        borderRadius="md"
        p={4}
        position="relative"
        top="20px"
        left="50%"
        transform="translateX(-50%)"
        w="80%"
        maxW="1200px"
        boxShadow="sm"
      >
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          h="100%"
          mx="auto"
        >
          {/* Left Side: Logo and Name */}
          <HStack spacing={3} align="center">
            <img src="/BQA-Logo.png" alt="Logo" width="40px" height="40px" />
            <Link
              href="/"
              fontSize="xl"
              color="black"
              fontWeight="bold"
              _hover={{ textDecoration: "none" }}
            >
              Taqyeem Pro
            </Link>
          </HStack>

          {/* Center: Navigation Links */}
          <HStack display={{ base: "none", md: "flex" }} color="black">
            <Link
              href="/"
              fontSize="lg"
              _hover={{ textDecoration: "underline" }}
            >
              Home
            </Link>
            <Link
              fontSize="lg"
              _hover={{ textDecoration: "underline" }}
              ml={6}
              as="a"
              href="/AboutUsPage"
            >
              About Us
            </Link>
            <Link
              fontSize="lg"
              _hover={{ textDecoration: "underline" }}
              ml={6}
              as="a"
              href="/ContactUsPage"
            >
              Contact Us
            </Link>
          </HStack>

          {/* Right Side: Login Button */}
          <Button
            as={Link}
            href="/login"
            colorPalette="red"
            variant="solid"
            color="white"
            _hover={{ bg: "black", color: "white" }}
            fontSize="lg"
            px={6}
          >
            Login
          </Button>
        </Flex>
      </Box>
    </div>
  );
}