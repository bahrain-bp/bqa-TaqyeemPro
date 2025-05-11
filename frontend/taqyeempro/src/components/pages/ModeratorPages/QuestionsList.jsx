import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import EditQuestion from "./EditQuestion";
import { useParams } from "react-router-dom";

export default function QuestionsList() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true); 

  const { gradeId } = useParams();
  const gradeNumber = parseInt(gradeId?.replace("m", ""));

  useEffect(() => {
    console.log(gradeId);
    fetch("https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/view-question")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        if (!isNaN(gradeNumber)) {
          const filtered = data.filter((q) => Number(q.grade) === Number(gradeNumber));
          setFilteredQuestions(filtered);
        } else {
          setFilteredQuestions(data); // fallback to all
        }
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [gradeNumber]);

  return (
    <Box maxW="6xl" mx="auto" mt={12} px={4} pb={12}>
      <EditQuestion isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <Flex justify="space-between" align="center" mb={7} gap={4} wrap="wrap">
        <Text fontSize="3xl" fontWeight="bold" color="gray.800">
          Maths for Grade {gradeNumber}
        </Text>
      </Flex>
      <Stack gap={4}>
        {loading ? ( // Show spinner while loading
          <Flex justify="center" align="center" w="100%" h="200px">
            <Spinner size="xl" />
          </Flex>
        ) : filteredQuestions.length === 0 ? ( // Show message if no questions found
          <Text>No questions found for Grade {gradeNumber}.</Text>
        ) : (
          filteredQuestions.map((q, idx) => (
            <Box
              key={q.questionID}
              borderWidth="1px"
              borderRadius="md"
              p={6}
              bg="white"
              _hover={{ bg: "gray.50", cursor: "pointer" }}
              onClick={() => setIsEditOpen(true)}
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
              <Text pl={4}>✅ Answer: {q.answerText}</Text>
              <Text pl={4} mt={1} fontSize="sm" color="gray.600">
                Marks: {q.mark}
              </Text>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
}
