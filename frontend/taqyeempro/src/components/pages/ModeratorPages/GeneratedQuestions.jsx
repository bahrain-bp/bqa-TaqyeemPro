import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LuArrowBigRight, LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function GeneratedQuestions() {
  return (
    <Box maxW="6xl" mx="auto" mt={3} px={4}>
      <Text fontSize="3xl" fontWeight="bold" mb={7}>
        Generated Questions
      </Text>

      {/* Content */}
      <Stack gap={3}>
        {/* Math g9 english */}
        <Link to="/generated-questions/math-9-english">
          <Box
            bg="white"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
            p={6}
            py={8}
            _hover={{ bg: "gray.50", cursor: "pointer" }}
          >
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" fontSize="lg" color="gray.700">
                Maths for Grade 9 - English
              </Text>
              <Flex align="center" gap={4}>
                <LuArrowRight />
              </Flex>
            </Flex>
          </Box>
        </Link>

        {/* Math grade 9 arabic */}
        <Link to="/generated-questions/math-9-arabic">
          <Box
            bg="white"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
            p={6}
            py={8}
            _hover={{ bg: "gray.50", cursor: "pointer" }}
          >
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" fontSize="lg" color="gray.700">
                Maths for Grade 9 - Arabic
              </Text>
              <Flex align="center" gap={4}>
                <LuArrowRight />
              </Flex>
            </Flex>
          </Box>
        </Link>

        {/* math grade 12 englsih */}
        <Link to="/generated-questions/math-12-english">
          <Box
            bg="white"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
            p={6}
            py={8}
            _hover={{ bg: "gray.50", cursor: "pointer" }}
          >
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" fontSize="lg" color="gray.700">
                Maths for Grade 12 - English
              </Text>
              <Flex align="center" gap={4}>
                <LuArrowRight />
              </Flex>
            </Flex>
          </Box>
        </Link>

        {/* Math grade 12 arabic */}
        <Link to="/generated-questions/math-12-arabic">
          <Box
            bg="white"
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
            p={6}
            py={8}
            _hover={{ bg: "gray.50", cursor: "pointer" }}
          >
            <Flex align="center" justify="space-between">
              <Text fontWeight="bold" fontSize="lg" color="gray.700">
                Maths for Grade 12 - Arabic
              </Text>
              <Flex align="center" gap={4}>
                <LuArrowRight />
              </Flex>
            </Flex>
          </Box>
        </Link>
      </Stack>
    </Box>
  );
}
