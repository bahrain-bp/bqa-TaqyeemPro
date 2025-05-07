import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Link,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';

export default function ContactUsPage() {
  return (
    <Box bg="#FFFAFA" minH="100vh" px={8}>
      {/* Header */}

      {/* Main Content */}
      <Box mt={12} maxW="container.md" mx="auto">
        <Heading 
          textAlign="center" 
          fontSize={{ base: "3xl", md: "6xl" }} 
          mb={8}
        >
          Contact Us
        </Heading>

        <Text 
          textAlign="center" 
          fontSize={{ base: "lg", md: "5x1" }} 
          lineHeight="1.6" 
          mb={12}
        >
          We're here to help!
        </Text>

        <Text 
          textAlign="center" 
          fontSize={{ base: "lg", md: "3xl" }} 
          padding={40}
          lineHeight="1.6" 
          mb={8}
        >
          If you have any questions, suggestions, or need assistance, feel free to reach out to us. Our team is committed to supporting you and will get back to you as soon as possible. Whether you're experiencing technical issues, have feedback, or just want to say hello — we’d love to hear from you!
        </Text>

        <Text 
          textAlign="center" 
          fontWeight="bold" 
          fontSize={{ base: "lg", md: "xl" }} 
          mb={12}
        >
          Email: main@BQA.com<br />
          BQA Number: +973 17001111
        </Text>
      </Box>

      {/* Footer */}

    </Box>
  );
}