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
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { MdEdit } from "react-icons/md";
import EditQuestion from "./EditQuestion";
import { useParams } from "react-router-dom";

export default function QuestionsList() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { subjectGradeLang } = useParams();
  const [subject, gradeStr, language] = subjectGradeLang?.split("-") || [];
  const gradeNumber = parseInt(gradeStr);
  const [sortOption, setSortOption] = useState("default");

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Create a reference to the Q{idx + 1} text
  const qTextRefs = useRef([]);

  useEffect(() => {
    fetch(
      "https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/view-question"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = questions;

    if (!isNaN(gradeNumber)) {
      filtered = filtered.filter(
        (q) =>
          Number(q.grade) === gradeNumber &&
          q.language?.toLowerCase() === language?.toLowerCase()
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((q) =>
        q.questionText.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    let sorted = [...filtered];

    switch (sortOption) {
      case "name-asc":
        sorted.sort((a, b) => a.questionText.localeCompare(b.questionText));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.questionText.localeCompare(a.questionText));
        break;
      case "date-newest":
        sorted.sort(
          (a, b) => new Date(b["date & time"]) - new Date(a["date & time"])
        );
        break;
      case "date-oldest":
        sorted.sort(
          (a, b) => new Date(a["date & time"]) - new Date(b["date & time"])
        );
        break;
      case "skill":
        sorted.sort((a, b) => a.skillType.localeCompare(b.skillType));
        break;
      case "questionType":
        sorted.sort((a, b) => a.questionType.localeCompare(b.questionType));
        break;
      case "mark-asc":
        sorted.sort((a, b) => a.mark - b.mark);
        break;
      case "mark-desc":
        sorted.sort((a, b) => b.mark - a.mark);
        break;
      case "default":
      default:
        // No sorting, or revert to original fetch order
        break;
    }

    setFilteredQuestions(sorted);
  }, [questions, gradeNumber, language, searchTerm, sortOption]);

  // useEffect(() => {
  //   fetch(
  //     "https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/view-question"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setQuestions(data);

  //       let filtered = data;
  //       if (!isNaN(gradeNumber)) {
  //         filtered = filtered.filter(
  //           (q) =>
  //             Number(q.grade) === gradeNumber &&
  //             q.language?.toLowerCase() === language?.toLowerCase()
  //         );
  //       }

  //       // Sort alphabetically by question text
  //       // Sort by date and time (most recent first)
  //       const sorted = filtered.sort(
  //         (a, b) => new Date(b["date & time"]) - new Date(a["date & time"])
  //       );

  //       setFilteredQuestions(sorted);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching questions:", err);
  //       setLoading(false);
  //     });
  // }, [gradeNumber]);

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
          Maths for Grade {gradeNumber} -{" "}
          {language.charAt(0).toUpperCase() + language.slice(1)}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button colorPalette={"red"} size={"md"} _hover={{ bg: "black" }}>
                <AiOutlineSortDescending /> Sort
              </Button>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>
                    <VStack align="stretch" spacing={3}>
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => setSortOption("name-asc")}
                      >
                        Sort by Name (A-Z)
                      </Button>
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => setSortOption("date-newest")}
                      >
                        Sort by Date (Newest First)
                      </Button>
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => setSortOption("skill")}
                      >
                        Sort by Skill Type
                      </Button>
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => setSortOption("questionType")}
                      >
                        Sort by Question Type
                      </Button>
                      <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        onClick={() => setSortOption("mark-asc")}
                      >
                        Sort by Mark (Low to High)
                      </Button>
                      <Button
                        justifyContent="flex-start"
                        colorPalette="red"
                        onClick={() => setSortOption("default")}
                        _hover={{ bg: "black" }}
                      >
                        Clear Sort
                      </Button>
                    </VStack>
                  </Popover.Body>
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
          [<Text></Text>]
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
                setSelectedQuestionId(idx + 1);
                setIsEditOpen(true);
              }}
            >
              <Flex justify="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="lg">
                  Q{idx + 1}. {q.questionText} ({q.questionType})
                </Text>
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
                ml={2}
                w={"60%"}
                justify="space-between"
                style={{
                  marginLeft: (qTextRefs.current[idx]?.offsetWidth || 0) + 8,
                }}
              >
                {" "}
                <Text fontSize="sm" color="gray.600">
                  Skill:{" "}
                  {q.skillType.length > 15
                    ? `${q.skillType.slice(0, 15)}...`
                    : q.skillType}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Type: {q.questionType}
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
