import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    Stack,
    Status,
    Text,
  } from "@chakra-ui/react";
  import React from "react";
  import { LuArrowBigRight, LuArrowRight } from "react-icons/lu";
  import { MdEdit } from "react-icons/md";
  
  export default function QuestionsList() {
    return (
      <Box maxW="6xl" mx="auto" mt={12} px={4}>
        {/* heading */}
        <Flex justify="space-between" align="center" mb={7} gap={4} wrap="wrap">
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Maths for Grade 9
          </Text>
          <Text fontSize="md" fontWeight="medium" color="gray.600">
            22nd of April 2025
          </Text>
        </Flex>
  
        {/* Content */}
        <Stack gap={3}>
          {/* question 1 */}
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
                Q1. Solve for x (MultipeChoice): 3(x−2)=2(x+5)3(x - 2) = 2(x + 5)
              </Text>
              <Flex align="center" gap={4}>
                <Status.Root size={"lg"} width="100px" colorPalette="green">
                  <Status.Indicator />
                  Approved
                </Status.Root>
                <Icon as={MdEdit} boxSize={6} color="gray.700" />
              </Flex>
            </Flex>
            <Text whiteSpace="pre-line" p={5} pl={16}>
              Options:{"\n"}
              A: x = 16{"\n"}
              B: x = 11{"\n"}
              C: x = -11{"\n"}
              D: x = -16{"\n"}✅ Answer: B: x = 11
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  }
  