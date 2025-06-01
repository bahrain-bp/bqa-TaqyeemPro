import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { LuArrowBigRight, LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import CreateEditExam from "./CreateEditExam";

export default function Exams() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [exams, setExams] = useState(false);

  // useEffect(() => {
  //   fetch(
  //     "https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/view-exams"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setExams(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching questions:", err);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <Box maxW="6xl" mx="auto" mt={3} px={4}>
      <CreateEditExam
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isEdit={isEdit}
      />
      <Flex justify="space-between" align="center" mb={7}>
        <Text fontSize="3xl" fontWeight="bold">
          Exams List
        </Text>

        <Flex gap={2}>
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
      </Flex>

      {/* Content */}
      <Stack gap={3}>
        <Box
          bg="white"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="sm"
          p={6}
          py={8}
          _hover={{ bg: "gray.50", cursor: "pointer" }}
          onClick={() => {
            setIsEdit(true);
            setIsOpen(true);
          }}
        >
          <Flex align="center" justify="space-between">
            <Text fontWeight="bold" fontSize="lg" color="gray.700">
              Maths for Grade 9 - English
            </Text>
            <Flex align="center" gap={4}>
              <LuArrowRight />
            </Flex>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
}
