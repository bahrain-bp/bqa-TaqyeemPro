import {
  Box,
  Text,
  Badge,
  Stack,
  Flex,
  Button,
  useDisclosure,
  Portal,
  HStack,
} from "@chakra-ui/react";
import React from "react";

// Helper to export as TXT
function exportExamAsTXT(exam) {
  if (!exam) return;
  let txt = `Exam Title: ${exam.examTitle}
Subject: ${exam.subject}
Grade: ${exam.grade}
Language: ${exam.language}
Description: ${exam.examDescription}

Questions:
`;
  (exam.fullQuestions || []).forEach((q, i) => {
    txt += `
Q${i + 1}: ${q.questionText}
Question Type: ${q.questionType}
Skill Type: ${q.skillType}
Answer: ${q.answerText}
Option 1: ${q.option1 || ""}
Option 2: ${q.option2 || ""}
Option 3: ${q.option3 || ""}
Option 4: ${q.option4 || ""}
`;
  });
  const blob = new Blob([txt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${exam.examTitle || "exam"}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Helper to export as DOCX
function exportExamAsDOCX(exam) {
  if (!exam) return;
  // We'll use a simple HTML -> docx trick
  let html = `
    <h2><b>Exam Title: </b>${exam.examTitle}</h2>
    <p><b>Subject: </b> ${exam.subject}</p>
    <p><b>Grade: </b> ${exam.grade}</p>
    <p><b>Language: </b> ${exam.language}</p>
    <p><b>Description: </b> ${exam.examDescription}</p>
    <h3>Questions:</h3>
    <ol>
  `;
  (exam.fullQuestions || []).forEach((q, i) => {
    html += `<li>
      <b>Question:</b> ${q.questionText}<br/>
      <b>Question Type:</b> ${q.questionType}<br/>
      <b>Skill Type:</b> ${q.skillType}<br/>
      <b>Answer:</b> ${q.answerText}<br/>
      <b>Option 1:</b> ${q.option1 || ""}<br/>
      <b>Option 2:</b> ${q.option2 || ""}<br/>
      <b>Option 3:</b> ${q.option3 || ""}<br/>
      <b>Option 4:</b> ${q.option4 || ""}<br/>
    </li>`;
  });
  html += "</ol>";
  const blob = new Blob(
    [
      `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`,
    ],
    { type: "application/msword" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${exam.examTitle || "exam"}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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

          {/* Export Buttons (CSV removed) */}
          <HStack mb={4} spacing={3}>
            <Button colorScheme="green" size="sm" onClick={() => exportExamAsDOCX(exam)}>
              Export as DOCX
            </Button>
            <Button colorScheme="gray" size="sm" onClick={() => exportExamAsTXT(exam)}>
              Export as Text
            </Button>
          </HStack>

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