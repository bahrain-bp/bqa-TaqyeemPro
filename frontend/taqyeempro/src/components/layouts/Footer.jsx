import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  Image,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function Footer() {
  const footerTextSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box
      as="footer"
      bg="white"
      py={8}
      width="100%"
      mt="auto"
      position="absolute"
      bottom={0}
      left={0}
    >
      <Flex direction="column" align="center" justify="center">
        {/* Logo in the center */}
        <HStack spacing={3} align="center" mb={5}>
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

        {/* Buttons Section */}
        <Flex justify="center" align="center" mb={6}>
          <Link
            href="/"
            fontSize="lg"
            mx={10}
            _hover={{ textDecoration: "underline" }}
          >
            Home
          </Link>
          <Link
            fontSize="lg"
            mx={10}
            _hover={{ textDecoration: "underline" }}
            as="a"
            href="/AboutUsPage"
          >
            About Us
          </Link>
          <Link
            fontSize="lg"
            mx={10}
            _hover={{ textDecoration: "underline" }}
            as="a"
            href="/ContactUsPage"
          >
            Contact Us
          </Link>
          <Link
            href="/terms"
            fontSize="lg"
            mx={10}
            _hover={{ textDecoration: "underline" }}
          >
            Terms
          </Link>
        </Flex>

        {/* All Rights Reserved */}
        <Text fontSize={footerTextSize} textAlign="center" color="gray.600">
          © 2025 Taqyeem Pro. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
}
