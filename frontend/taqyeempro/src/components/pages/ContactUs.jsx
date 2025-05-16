import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Icon,
  Alert,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment } from "react-icons/ai";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
  };

  return (
    <Box py={12} bgGradient="linear(to-br, red.50, white)">
      <Container maxW="container.lg">
        <VStack spacing={12} align="start">
          {/* Heading Section */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            w="full"
          >
            <MotionHeading fontSize={["3xl", "4xl", "5xl"]} fontWeight="bold" color="gray.700">
              Contact Us
            </MotionHeading>
            <MotionText fontSize="lg" color="gray.600" mt={2}>
              Have a question, suggestion, or need support? We’d love to hear from you.
            </MotionText>
          </MotionBox>

          {/* Contact Info & Form */}
          <SimpleGrid columns={[1, null, 2]} spacing={10} w="full">
            {/* Contact Information */}
            <VStack align="start" spacing={6}>
              <Box>
                <Icon as={AiOutlineMail} boxSize={6} color="red.500" />
                <Text mt={1} fontSize="md" color="gray.600">
                  support@taqyeempro.com
                </Text>
              </Box>
              <Box>
                <Icon as={AiOutlinePhone} boxSize={6} color="red.500" />
                <Text mt={1} fontSize="md" color="gray.600">
                  +973-1234-5678
                </Text>
              </Box>
              <Box>
                <Icon as={AiOutlineEnvironment} boxSize={6} color="red.500" />
                <Text mt={1} fontSize="md" color="gray.600">
                  Manama, Bahrain
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.500">
                Available: Sun–Thu | 9AM–4PM
              </Text>
            </VStack>

            {/* Contact Form */}
            <Box as="form" onSubmit={handleSubmit} bg="white" p={6} borderRadius="lg" boxShadow="md">
              <VStack spacing={4}>
                <Input placeholder="Your name" name="name" required />
                <Input type="email" placeholder="you@example.com" name="email" required />
                <Input placeholder="Subject (optional)" name="subject" />
                <Textarea placeholder="Write your message here..." rows={5} name="message" required />
                <Button
                  type="submit"
                  colorScheme="red"
                  size="lg"
                  width="full"
                  _hover={{ bg: "black", color: "white" }}
                >
                  Send Message
                </Button>
                {submitted && (
                  <Alert status="success" borderRadius="md" mt={4}>
                    
                    Message sent! We'll get back to you as soon as possible.
                  </Alert>
                )}
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
