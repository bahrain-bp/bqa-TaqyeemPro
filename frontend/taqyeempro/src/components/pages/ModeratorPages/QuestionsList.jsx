import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Spinner,
  Button,
  Input,
  InputGroup,
  Popover,
  Portal,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { MdEdit } from "react-icons/md";
import EditQuestion from "./EditQuestion";
import { useParams } from "react-router-dom";
import { AiOutlineFilter } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";

export default function QuestionsList() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { gradeId } = useParams();
  const gradeNumber = parseInt(gradeId?.replace("m", ""));
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // Create a reference to the Q{idx + 1} text
  const qTextRefs = useRef([]);

  useEffect(() => {
    fetch(
      "https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/view-question"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);

        let filtered = data;
        if (!isNaN(gradeNumber)) {
          filtered = data.filter(
            (q) => Number(q.grade) === Number(gradeNumber)
          );
        }

        // Sort alphabetically by question text
        const sorted = filtered.sort((a, b) =>
          a.questionText.localeCompare(b.questionText)
        );

        setFilteredQuestions(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, [gradeNumber]);

  const handleQuestionUpdate = (updatedQuestion) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.QuestionId === updatedQuestion.QuestionId ? updatedQuestion : q
    )
  );

  setFilteredQuestions((prev) =>
    prev.map((q) =>
      q.QuestionId === updatedQuestion.QuestionId ? updatedQuestion : q
    )
  );
};


  return (
    <Box maxW="6xl" mx="auto" mt={3} px={4} pb={12}>
      <EditQuestion
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        questionData={isEditOpen ? selectedQuestion : null}
        questionId={selectedQuestionId}
        onQuestionUpdate={handleQuestionUpdate}
      />

      <Flex justify="space-between" align="center" mb={7} gap={4} wrap="wrap">
        <Text fontSize="3xl" fontWeight="bold" color="gray.800">
          Maths for Grade {gradeNumber}
        </Text>
        <Flex gap={4}>
          <InputGroup
            flex="1"
            bg={"white"}
            w={"sm"}
            startElement={<LuSearch />}
          >
            <Input
              placeholder="Search Question"
              css={{ "--focus-color": "red" }}
            />
          </InputGroup>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button colorPalette={"red"} size={"md"} _hover={{ bg: "black" }}>
                <AiOutlineFilter /> Filter
              </Button>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>Work in Progress 🙂</Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </Flex>
      </Flex>
      <Stack gap={4}>
        {loading ? (
          <Flex justify="center" align="center" w="100%" h="200px">
            <Spinner size="xl" />
          </Flex>
        ) : filteredQuestions.length === 0 ? (
          <Text>No questions found</Text>
        ) : (
          filteredQuestions.map((q, idx) => (
            <Box
              key={q.QuestionId}
              borderWidth="1px"
              borderRadius="md"
              p={6}
              bg="white"
              _hover={{ bg: "gray.50", cursor: "pointer" }}
              onClick={() => {
                setSelectedQuestion(q);
                setSelectedQuestionId(idx+1);
                setIsEditOpen(true);
              }}
            >
              <Flex justify="space-between" mb={2}>
                <Flex>
                  <Text
                    ref={(el) => (qTextRefs.current[idx] = el)}
                    fontWeight="bold"
                    fontSize="lg"
                    mr={2}
                  >
                    Q{idx + 1}.
                  </Text>
                  <Text fontWeight="bold" fontSize="lg">
                    {q.questionText}
                  </Text>
                </Flex>
                <Flex gap={3} align="center">
                  <Text
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="md"
                    bg={q.approved ? "green.100" : "red.100"}
                    color={q.approved ? "green.700" : "red.700"}
                  >
                    {q.approved ? "Approved" : "Denied"}
                  </Text>
                  <Icon as={MdEdit} boxSize={5} color="gray.600" />
                </Flex>
              </Flex>

              {/* Additional Information */}
              <Flex
                mt={2}
                gap={4}
                ml={2}
                style={{
                  marginLeft: (qTextRefs.current[idx]?.offsetWidth || 0) + 8,
                }}
              >
                {" "}
                <Text fontSize="sm" color="gray.600">
                  Skill: {q.skillType}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Language: {q.language}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Question Type: {q.questionType}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Mark: {q.mark}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Date: {new Date(q["date & time"]).toLocaleString()}
                </Text>
              </Flex>

              {/* Answer */}
              <Text mt={5} ml={10}>
                ✅ Answer: {q.answerText}
              </Text>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
}
