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
import React, { useEffect, useState } from "react";
import { LuArrowBigRight, LuArrowRight } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import EditQuestion from "./EditQuestion";

export default function QuestionsList() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(
      "https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/view-question"
    )
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

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
      <Stack gap={4}>
        {questions.map((q, idx) => (
          <Box
            key={q.QuestionID}
            borderWidth="1px"
            borderRadius="md"
            p={6}
            bg="white"
            _hover={{ bg: "gray.50", cursor: "pointer" }}
            onClick={() => setIsEditOpen(true)}
          >
            <Flex justify="space-between" mb={2}>
              <Text fontWeight="bold" fontSize="lg">
                Q{idx + 1}. {q.QuestionText} ({q.QuestionType})
              </Text>
              <Flex gap={3} align="center">
                <Text
                  fontSize="sm"
                  px={3}
                  py={1}
                  borderRadius="md"
                  bg={q.Approved ? "green.100" : "red.100"}
                  color={q.Approved ? "green.700" : "red.700"}
                >
                  {q.Approved ? "Approved" : "Denied"}
                </Text>
                <Icon as={MdEdit} boxSize={5} color="gray.600" />
              </Flex>
            </Flex>
            <Text pl={4}>✅ Answer: {q.AnswerText}</Text>
            <Text pl={4} mt={1} fontSize="sm" color="gray.600">
              Marks: {q.Mark}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
