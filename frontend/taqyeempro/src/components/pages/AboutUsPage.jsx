import React from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Link,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';

export default function AboutUsPage() {
  return (
    <Box bg="white" minH="100vh" px={8}>


      {/* Main Content */}
      <Box mt={12} maxW="container.md" mx="auto">
        <Heading 
          textAlign="center" 
          fontSize={{ base: "4xl", md: "5xl" }} 
          mb={8}
          padding={111}
        >
          About Us
        </Heading>

        <Text 
          textAlign="center" 
          fontSize={{ base: "lg", md: "2xl" }} 
          lineHeight="1.6" 
          mb={12}
          fontStyle="italic"
        >
          The Education & Training Quality Authority (BQA) presents TaqyeemPro as an intelligent system designed to enhance and streamline educational assessment processes by leveraging modern artificial intelligence technologies. The platform enables educational institutions to create interactive and diverse exams and to analyze student performance with accuracy and efficiency. This project is part of the Cloud Innovation Program, reflecting the Authority's commitment to advancing education quality through innovative assessment tools that support the sustainable development of the educational ecosystem in the Kingdom of Bahrain and beyond.
        </Text>
      </Box>

     
    </Box>
  );
}