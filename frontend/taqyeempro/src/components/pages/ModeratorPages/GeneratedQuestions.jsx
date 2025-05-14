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
        {/* subject 1 */}
        <Link to="/generated-questions/m9">
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
                Maths for Grade 9
              </Text>
              <Flex align="center" gap={4}>
                <LuArrowRight />
              </Flex>
            </Flex>
          </Box>
        </Link>

        {/* subject 2 */}
        <Link to="/generated-questions/m12">
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
                Maths for Grade 12
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
