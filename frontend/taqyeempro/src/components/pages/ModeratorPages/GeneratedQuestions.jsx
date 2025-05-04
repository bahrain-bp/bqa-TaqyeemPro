import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LuArrowBigRight, LuArrowRight } from "react-icons/lu";

export default function GeneratedQuestions() {
  return (
    <Box maxW="6xl" mx="auto" mt={12} px={4}>
      <Text fontSize="3xl" fontWeight="bold" mb={7}>
        Generated Questions
      </Text>

      {/* Content */}
      <Stack gap={3}>
        {/* subject 1 */}
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
              Maths for grade 9
            </Text>
            <Flex align="center" gap={4}>
              <Text fontWeight="medium" fontSize="md" color="gray.600">
                22nd of April 2025
              </Text>
              <LuArrowRight />
            </Flex>
          </Flex>
        </Box>

        {/* subject 2 */}
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
              Science for grade 3
            </Text>
            <Flex align="center" gap={4}>
              <Text fontWeight="medium" fontSize="md" color="gray.600">
                10th of April 2025
              </Text>
              <LuArrowRight />
            </Flex>
          </Flex>
        </Box>

        {/* subject 3 */}
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
              History for grade 12
            </Text>
            <Flex align="center" gap={4}>
              <Text fontWeight="medium" fontSize="md" color="gray.600">
                25th of March 2025
              </Text>
              <LuArrowRight />
            </Flex>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
}
