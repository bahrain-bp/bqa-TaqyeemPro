import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  VStack,
  Container,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionImage = motion(Image);
const MotionButton = motion(Button);

export default function Home() {
  return (
    <Box
      py={12}
      bgGradient="linear(to-br, red.50, white)"
      minH="100vh"
      overflow="hidden"
    >
      <Container maxW="container.lg" textAlign="center">
        <VStack spacing={10}>
          <MotionHeading
            as="h1"
            size="6xl"
            fontWeight="extrabold"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Taqyeem Pro
          </MotionHeading>

          <MotionText
            fontSize="lg"
            color="gray.600"
            maxW="600px"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            A smarter way to evaluate, track, and grow.
          </MotionText>

          <MotionButton
            as={Link}
            to="/login"
            size="3xl"
            w="xs"
            px={10}
            py={6}
            mt={5}
            fontSize="xl"
            bg="red.500"
            color="white"
            rounded="md"
            boxShadow="lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            _hover={{ bg: "black" }}
            
            objectFit="contain"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Get Started
          </MotionButton>

          <MotionImage
            src="/Students.png"
            alt="Students Illustration"
            borderRadius="2xl"
            maxH="full"
            mt={10}
            objectFit="contain"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          />
        </VStack>
      </Container>
    </Box>
  );
}

const MotionText = motion(Text);
