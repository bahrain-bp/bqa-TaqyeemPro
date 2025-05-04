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
import React, { useState } from "react";
import { LuArrowBigRight, LuArrowRight } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import EditQuestion from "./EditQuestion";

export default function QuestionsList() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <Box maxW="6xl" mx="auto" mt={12} px={4}>
      <EditQuestion isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />{" "}
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
          onClick={() => setIsEditOpen(true)}
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

        {/* question 2 */}
        <Box
          bg="white"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="sm"
          p={6}
          py={8}
          _hover={{ bg: "gray.50", cursor: "pointer" }}
          onClick={() => setIsEditOpen(true)}
        >
          <Flex align="center" justify="space-between">
            <Text fontWeight="bold" fontSize="lg" color="gray.700">
              Q2. Simplify (Short Answer Number):
            </Text>
            <Flex align="center" gap={4}>
              <Status.Root size={"lg"} width="100px" colorPalette="red">
                <Status.Indicator />
                Denied
              </Status.Root>
              <Icon as={MdEdit} boxSize={6} color="gray.700" />
            </Flex>
          </Flex>
          <Text whiteSpace="pre-line" p={5} pl={16}>
            34×89\frac{3}
            {4} \times \frac{8}
            {9}43​×98​ D: x = -16{"\n"}✅ Answer:23\frac{2}
            {3}32​
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
