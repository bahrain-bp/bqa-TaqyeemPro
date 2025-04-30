import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  VStack,
  Container,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Box py={12}>
      {/* Top Section */}
      <Container maxW="container.lg" textAlign="center">
        <VStack spacing={6}>
          <Heading as="h1" size="7xl" fontWeight="bold" color="gray.700">
            Welcome to Taqyeem Pro
          </Heading>
          <Button
            as={Link}
            to="/login"
            colorPalette="red"
            size="2xl"
            m={9}
            px={14}
            boxShadow={"lg"}
            _hover={{ bg: 'black' }}
          >
            Get Started
          </Button>
          <Image
            src="/Students.png" 
            alt="Hero"
            borderRadius="lg"
            maxH="11/12"
            objectFit="contain"
          />
        </VStack>
      </Container>

      {/* About Section
      <Box mt={24} textAlign="center" px={6}>
        <Heading as="h2" size="xl" color="black" mb={4}>
          About Us
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto">
          Taqyeem Pro is a modern evaluation platform helping individuals and organizations collect, analyze,
          and respond to structured feedback. We're dedicated to simplicity, clarity, and insightful data.
        </Text>
      </Box> */}
    </Box>
  );
}
