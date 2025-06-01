import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

export default function About() {
  return (
    <Box
      pt={6}
      pb={20}
      bgGradient="linear(to-br, red.50, white)"
      mx={"auto"}
      w={"70%"}
    >
      <Container maxW="container.lg">
        <VStack spacing={12} align="start">
          {/* Intro Section */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MotionHeading
              fontSize={["3xl", "4xl", "5xl"]}
              fontWeight="bold"
              color="gray.700"
              mb={4}
              textAlign={"left"}
            >
              About Taqyeem Pro
            </MotionHeading>
            <br /><br/>
            <MotionText fontSize="lg" color="gray.600">
              Taqyeem Pro is a smart, scalable platform designed to transform
              how educational and professional evaluations are conducted. Built
              with modern tools and a user-centric approach, our goal is to
              simplify assessment workflows, generate insightful data, and
              empower institutions with automation and clarity.
            </MotionText>
          </MotionBox>

          {/* Mission Section */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <br />
            <Heading fontSize="3xl" color="gray.700" mb={4}>
              Our Mission
            </Heading>
            <Text fontSize="lg" color="gray.600">
              To streamline the evaluation process for institutions and
              individuals by offering intelligent, intuitive, and interactive
              tools. We envision a world where feedback fuels growth, not
              friction.
            </Text>
          </MotionBox>

          <br />
          {/* How It Works */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Heading fontSize="3xl" color="gray.700" mb={4}>
              How It Works
            </Heading>
            <SimpleGrid columns={[1, 2]} spacing={8}>
              <Box>
                <Text fontSize="md" color="gray.600" mb={3}>
                  <strong>1. Sign In:</strong> Secure login with role-based
                  access.
                </Text>
                <Text fontSize="md" color="gray.600" mb={3}>
                  <strong>2. Generate Questions:</strong> Use AI to
                  auto-generate relevant exam questions.
                </Text>
                <Text fontSize="md" color="gray.600" mb={3}>
                  <strong>3. Analyze Reports:</strong> View structured data on
                  assessments and performance.
                </Text>
                <Text fontSize="md" color="gray.600">
                  <strong>4. Upload Documents:</strong> Share and manage
                  evaluation-related materials effortlessly.
                </Text>
              </Box>
              <Image
                src="/student.png"
                w={"35%"}
                alt="Process"
                borderRadius="lg"
                mx={"auto"}
              />
            </SimpleGrid>
          </MotionBox>
<br/>
          {/* Why Us */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Heading fontSize="3xl" color="gray.700" mb={4}>
              Why Taqyeem Pro?
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={2}>
              ✔️ User-friendly dashboards and tools
            </Text>
            <Text fontSize="lg" color="gray.600" mb={2}>
              ✔️ AI-powered question generation
            </Text>
            <Text fontSize="lg" color="gray.600" mb={2}>
              ✔️ Seamless data collection and reporting
            </Text>
            <Text fontSize="lg" color="gray.600">
              ✔️ Designed for institutions, educators, and evaluators
            </Text>
          </MotionBox><br/>

          {/* Team */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Heading fontSize="3xl" color="gray.700" mb={4}>
              Meet the Team
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={2}>
              We're a team of developers, educators, and designers passionate
              about empowering education through technology. We believe that
              thoughtful design, reliable engineering, and empathy make all the
              difference in building impactful tools.
            </Text>
          </MotionBox>

          {/* Contact */}<br/>
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Heading fontSize="3xl" color="gray.700" mb={4}>
              Contact Us
            </Heading>
            <Text fontSize="lg" color="gray.600">
              For support, questions, or feedback, reach out at:
              <br />
              <strong>Email:</strong> support@taqyeempro.com
              <br />
              <strong>Phone:</strong> +973-1234-5678
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
