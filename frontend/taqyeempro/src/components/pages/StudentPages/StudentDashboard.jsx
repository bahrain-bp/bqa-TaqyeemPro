import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  VStack,
  HStack,
  Link,
  SimpleGrid,
} from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Box bg="white" minH="100vh" px={8} display="flex" flexDirection="column">


      {/* Main Content Area */}
      <Flex direction="column" flexGrow={1} mb={8}>
        {/* Hero Section */}
        <VStack 
          spacing={12} 
          mt={12} 
          maxW="container.xl" 
          mx="auto"
        >
          {/* Welcome Message */}
          <Text 
            fontSize={{ base: "3xl", md: "5xl" }} 
            color="#EE3944" 
            textAlign="center"
          >
            Welcome, Kamo in TaqyeemPro
          </Text>

          {/* Get Started Button */}
          <Button 
            bg="#D42121" 
            color="white"
            margin={20} 
            px={20} 
            py={10} 
            fontSize={20}
            borderRadius="lg"
            _hover={{ bg: "#C41F1F" }}
            as="a"
            href="/StudentExamCard"
          >
            Get Started
          </Button>

          {/* BQA Logo */}
          <Image 
            src="/HomeLogo.png" 
            alt="BQA Logo" 
            // boxSize="20rem" 
            marginTop={100}
            width={959}
            height={504}
            mb={4}
          />
        </VStack>

        {/* Content Sections */}
        <SimpleGrid 
          columns={{ base: 1, md: 2 }} 
          spacing={12} 
          mt={12} 
          maxW="container.xl" 
          mx="auto"
        >
          {/* Left Column */}
          <VStack align="flex-start" spacing={6} padding={200}>
            {/* What We Believe */}
            <Text 
              fontWeight="bold" 
              textTransform="uppercase" 
              mb={2}
            >
              WHAT WE BELIEVE
            </Text>
            <Text color="gray.600">
              We believe every student deserves smart evaluation - where AI-powered assessments provide fair, instant feedback and personalized learning paths. Just like Bahrain's BQA ensures quality education standards, we ensure your progress is measured meaningfully to unlock your full potential.
            </Text>

            {/* About Us */}
            <Text 
              fontWeight="bold" 
              textTransform="uppercase" 
              mt={8} 
              mb={2}
            >
              ABOUT US
            </Text>
            <Text color="gray.600">
              TaqyeemPro is proudly aligned with Bahrain's Education & Training Quality Authority (BQA) - the independent body ensuring excellence in education through rigorous evaluations, standardized testing, and quality certifications across all institutions, helping students like you achieve recognized, future-ready qualifications.
            </Text>
          </VStack>

        </SimpleGrid>
      </Flex>

      {/* Footer Section - Always at the bottom */}
      <Box mt="auto" textAlign="center" py={6} color="gray.500" fontSize="sm">
        <Text>هيئة جودة التعليم والتدريب | Education & Training Quality Authority</Text>
        <Text>Kingdom of Bahrain - مملكة البحرين</Text>
      </Box>
    </Box>
  );
}