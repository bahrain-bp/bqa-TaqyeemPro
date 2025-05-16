import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  Icon,
  SimpleGrid,
  Stack,
  Alert,
  Image,
} from "@chakra-ui/react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    alert("email sent");
  };

  return (
    <Box py={5} pb={20}>
      <Container maxW="7xl">
        {/* Contact Header */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <VStack spacing={4} mb={10} textAlign="center">
            <MotionHeading
              fontSize={["3xl", "4xl", "5xl"]}
              fontWeight="bold"
              color="gray.700"
              mb={4}
            >
              Contact Us
            </MotionHeading>
            <MotionText fontSize="lg" color="gray.600">
              Email, call, or complete the form to learn how Snappy can solve
              your messaging problem.
            </MotionText>
            <Text color="red.500" fontWeight="semibold">
              info@taqypeempro.bh | 3873-3857
            </Text>
          </VStack>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Contact Info + Form */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={16}>
            {/* Contact Info */}
            <VStack align="start" spacing={6} maxW={"80%"} my={"auto"}>
              <Box>
                <Text fontWeight="bold" mb={1}>
                  Customer Support
                </Text>
                <Text color="gray.600">
                  Our support team is available around the clock to address any
                  concerns or queries you may have.
                </Text>
              </Box>
              <br />
              <Box>
                <Text fontWeight="bold" mb={1}>
                  Feedback and Suggestions
                </Text>
                <Text color="gray.600">
                  We value your feedback and are always open to improving your
                  Snappy experience.
                </Text>
              </Box>
              <br />
              <Box>
                <Text fontWeight="bold" mb={1}>
                  Media Inquiries
                </Text>
                <Text color="gray.600">
                  For media-related collaborations, contact media@taqyeempro.bh
                </Text>
              </Box>
            </VStack>

            {/* Contact Form */}
            <Box bg="white" p={8} borderRadius="xl" boxShadow="sm">
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <Input placeholder="Full name" name="name" required />
                  <Input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    required
                  />
                  <Input placeholder="Phone number" name="phone" />
                  <Textarea
                    placeholder="How can we help?"
                    rows={4}
                    name="message"
                    required
                  />
                  <Button type="submit" colorPalette="red" w="full">
                    Submit
                  </Button>
                  {submitted && (
                    <Alert status="success" borderRadius="md">
                      Message sent successfully!
                    </Alert>
                  )}
                </VStack>
                <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
                  By contacting us, you agree to our Terms of Service & Privacy
                  Policy.
                </Text>
              </form>
            </Box>
          </SimpleGrid>
        </MotionBox>

        {/* Location Info */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SimpleGrid
            mt={20}
            columns={{ base: 1, md: 2 }}
            spacing={10}
            alignItems="center"
          >
            <Box
              w="full"
              h="300px"
              bg="gray.200"
              borderRadius="md"
              backgroundImage="url('/location.png')"
              backgroundSize="cover"
              backgroundPosition="center"
            />

            {/* Address */}
            <VStack align="start" spacing={3} ml={16}>
              <Text fontSize="xl" fontWeight="bold">
                Our Location
              </Text>
              <Text fontSize="md" color="gray.600">
                <b>TaqyeempPro Inc.</b>
                <br />
                123 Tech Boulevard, Suite 456
                <br />
                Manama, 12345
                <br />
                Bahrain
              </Text>
            </VStack>
          </SimpleGrid>
        </MotionBox>
        {/* FAQ
        <Box mt={20}>
          <Heading size="lg" mb={6}>
            FAQ
          </Heading>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    What makes Snappy different from other messaging apps?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Snappy is built with speed, privacy, and modern collaboration in
                mind.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    How secure are my conversations on Snappy?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                We use end-to-end encryption to ensure all your conversations
                remain private and secure.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Can I personalize my Snappy experience?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Yes, you can customize themes, notification settings, and more
                to suit your preferences.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box> */}
      </Container>
    </Box>
  );
}
