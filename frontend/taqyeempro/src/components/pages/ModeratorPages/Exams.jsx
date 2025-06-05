import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu";
import CreateEditExam from "./CreateEditExam";

export default function Exams() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy data for development
  const dummyExams = [
    {
      examId: "1",
      title: "Maths Final Exam",
      description: "Covers algebra, geometry, and statistics",
      grade: 12,
      subject: "Math",
      active: true,
      duration: "1 hour",
      language: "English",
      questions: ["rWIdB_Q10", "QS08d_Q2", "rWIdB_Q1"]
    },
    {
      examId: "2",
      title: "English Midterm",
      description: "Focus on grammar, reading comprehension",
      grade: 12,
      subject: "Math",
      active: false,
      duration: "2 hours",
      language: "English",
      questions: ["QS08d_Q2", "QS08d_Q4", "icXW3_Q1"]
    },
    {
      examId: "3",
      title: "Science Quiz",
      description: "Basic concepts of physics and chemistry",
      grade: 9,
      subject: "Math",
      active: true,
      duration: "3 hours",
      language: "English",
      questions: ["icXW3_Q3", "icXW3_Q8", "rWIdB_Q1"]
    },
  ];

  useEffect(() => {
    // Temporary dummy data usage
    setExams(dummyExams);
    setLoading(false);

    // Uncomment this when API is ready
    // fetch("https://knv1cln06e.execute-api.us-east-1.amazonaws.com/prod/view-exams")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setExams(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching exams:", err);
    //     setLoading(false);
    //   });
  }, []);

  return (
    <Box maxW="6xl" mx="auto" mt={3} px={4}>
      <CreateEditExam
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedExam(null);
        }}
        isEdit={isEdit}
        examData={selectedExam}
        
      />

      <Flex justify="space-between" align="center" mb={7}>
        <Text fontSize="3xl" fontWeight="bold">
          Exams List
        </Text>
        <Button
          colorPalette={"red"}
          _hover={{ bg: "black" }}
          onClick={() => {
            setIsEdit(false);
            setIsOpen(true);
          }}
        >
          <IoMdAdd /> Create Exam
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" py={10}>
          <Spinner size="lg" />
        </Flex>
      ) : (
        <Stack gap={3}>
          {exams.length === 0 ? (
            <Text>No exams found.</Text>
          ) : (
            exams.map((exam, idx) => (
              <Box
                key={idx}
                bg="white"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
                p={6}
                py={8}
                _hover={{ bg: "gray.50", cursor: "pointer" }}
                onClick={() => {
                  setIsEdit(true);
                  setSelectedExam(exam);
                  setIsOpen(true);
                }}
              >
                <Flex align="center" justify="space-between">
                  <Text fontWeight="bold" fontSize="lg" color="gray.700">
                    {exam.title} - Grade {exam.grade}
                  </Text>
                  <Flex align="center" gap={4}>
                    {exam.active ? (
                      <Badge
                        colorPalette="green"
                        variant="solid"
                        borderRadius="full"
                        px={4}
                        py={2}
                        fontSize="0.8em"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        colorPalette="red"
                        variant="solid"
                        borderRadius="full"
                        px={4}
                        py={2}
                        fontSize="0.8em"
                      >
                        Not Active
                      </Badge>
                    )}

                    <LuArrowRight />
                  </Flex>
                </Flex>
                <Text mt={1} color="gray.600">
                  {exam.subject}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {exam.description}
                </Text>
              </Box>
            ))
          )}
        </Stack>
      )}
    </Box>
  );
}
