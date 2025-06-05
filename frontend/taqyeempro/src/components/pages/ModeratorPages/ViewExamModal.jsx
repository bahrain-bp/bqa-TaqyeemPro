import {
  Box,
  Text,
  Badge,
  Stack,
  Flex,
  Button,
  useDisclosure,
  Portal,
} from "@chakra-ui/react";
import React from "react";

export default function ViewExamModal({ isOpen, onClose, exam }) {
  if (!exam || !isOpen) return null;

  return (
    <Portal>
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="rgba(0,0,0,0.5)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={1400}
      >
        <Box bg="white" p={8} borderRadius="md" w="90%" maxW="4xl" maxH="90vh" overflowY="auto">
          <Flex justify="space-between" mb={4}>
            <Text fontSize="2xl" fontWeight="bold">Exam Details</Text>
            <Button onClick={onClose} colorScheme="red" size="sm">Close</Button>
          </Flex>

          <Box mb={4}>
            <Text fontSize="xl" fontWeight="bold">{exam.examTitle}</Text>
            <Text>Subject: {exam.subject}</Text>
            <Text>Grade: {exam.grade}</Text>
            <Text>Language: {exam.language}</Text>
            <Text>Description: {exam.examDescription}</Text>
            <Text>Duration: {exam.duration} mins</Text>
            <Text>Status:
              <Badge ml={2} colorScheme={exam.isActive ? "green" : "red"}>
                {exam.isActive ? "Active" : "Not Active"}
              </Badge>
            </Text>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>Questions</Text>
            <Stack spacing={4}>
              {exam.fullQuestions?.map((q, index) => (
                <Box key={index} p={3} borderWidth="1px" borderRadius="md">
                  <Text fontWeight="medium">Q{index + 1}: {q.questionText}</Text>
                  <Text>Type: {q.questionType}</Text>
                  <Text>Skill: {q.skillType}</Text>
                  <Text>Answer: {q.answerText}</Text>
                  {q.option1 && <Text>Option 1: {q.option1}</Text>}
                  {q.option2 && <Text>Option 2: {q.option2}</Text>}
                  {q.option3 && <Text>Option 3: {q.option3}</Text>}
                  {q.option4 && <Text>Option 4: {q.option4}</Text>}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Portal>
  );
}