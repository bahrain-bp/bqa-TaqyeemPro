import { Box, Button, Flex, Stack, Text, Spinner } from "@chakra-ui/react";
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
      grade: "Grade 9",
      subject: "Mathematics",
    },
    {
      examId: "2",
      title: "English Midterm",
      description: "Focus on grammar, reading comprehension",
      grade: "Grade 10",
      subject: "English Language",
    },
    {
      examId: "3",
      title: "Science Quiz",
      description: "Basic concepts of physics and chemistry",
      grade: "Grade 8",
      subject: "Science",
    },
  ];

  useEffect(() => {
    // Temporary dummy data usage
    setExams(dummyExams);
    setLoading(false);

    // Uncomment this when API is ready
    // fetch("https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/view-exams")
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
        exam={selectedExam}
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
                    {exam.title} - {exam.grade}
                  </Text>
                  <Flex align="center" gap={4}>
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
