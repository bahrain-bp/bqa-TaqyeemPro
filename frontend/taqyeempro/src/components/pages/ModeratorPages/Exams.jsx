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
import ViewExamModal from "./ViewExamModal";

export default function Exams() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);

  const [viewModalOpen, setViewModalOpen] = useState(false); 
  const [viewedExam, setViewedExam] = useState(null); 

  useEffect(() => {
    setLoading(true);
    fetch("https://knv1cln06e.execute-api.us-east-1.amazonaws.com/prod/view-all-exams")
      .then((res) => res.json())
      .then((data) => {
        setExams(data.exams || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching exams:", err);
        setLoading(false);
      });
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

      <ViewExamModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setViewedExam(null);
        }}
        exam={viewedExam}
      />

      <Flex justify="space-between" align="center" mb={7}>
        <Text fontSize="3xl" fontWeight="bold">
          Exams List
        </Text>
        <Button
          colorPalette="red"
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
                _hover={{ bg: "gray.50" }}
              >
                <Flex align="center" justify="space-between">
                  <Text fontWeight="bold" fontSize="lg" color="gray.700">
                    {exam.examTitle} - Grade {exam.grade}
                  </Text>
                  <Flex align="center" gap={4}>
                    {exam.isActive ? (
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
                    <Button
                      colorPalette="black"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewedExam(exam);
                        setViewModalOpen(true);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      colorPalette="blue"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEdit(true);
                        setSelectedExam(exam);
                        setIsOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      colorPalette="red"
                      size="sm"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (!window.confirm("Are you sure you want to delete this exam?")) return;
                        try {
                          const res = await fetch("https://knv1cln06e.execute-api.us-east-1.amazonaws.com/prod/delete-exam", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ examId: exam.examId }),
                          });
                          if (res.ok) {
                            alert("Exam created successfully");
                            window.location.reload();
                            onClose(); // close modal
                          } else {
                            alert(result.error || "Failed to delete exam");
                          }
                        } catch (err) {
                          window.location.reload();
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Flex>
                <Text mt={1} color="gray.600">
                  {exam.subject}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {exam.examDescription}
                </Text>
              </Box>
            ))
          )}
        </Stack>
      )}
    </Box>
  );
}