import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  FileUpload,
  Flex,
  Input,
  Portal,
  Stack,
  Icon,
  HStack,
  FieldRoot,
  InputGroup,
  Group,
  Select,
  createListCollection,
  Text,
  Textarea,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaCircle, FaRegCircle } from "react-icons/fa";

export default function EditQuestion({
  isOpen,
  onClose,
  questionData,
  questionId,
  onQuestionUpdate,
}) {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [questionType, setQuestionType] = useState("");
  const [questionSkill, setQuestionSkill] = useState("");
  const [mark, setMark] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const answerLabels = ["A", "B", "C", "D"];
  const [isLoading, setIsLoading] = useState(false);
  const [approve, setApproved] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const marks = createListCollection({
    items: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
    ],
  });

  useEffect(() => {
    console.log(questionData);
    if (questionData) {
      const isMCQ = questionData.questionType === "MCQ";
      const mcqOptions = isMCQ
        ? [
            questionData.option1 || "",
            questionData.option2 || "",
            questionData.option3 || "",
            questionData.option4 || "",
          ]
        : [];

      setAnswers(isMCQ ? mcqOptions : questionData.options || ["", "", "", ""]);
      setQuestionType(questionData.questionType || "");
      setQuestionSkill(questionData.skillType || "");
      setMark(String(questionData.mark || ""));
      setQuestionText(questionData.questionText || "");
      setCorrectAnswer(questionData.answerText || "");
    }
  }, [questionData]);

  const handleSave = async (approvedStatus) => {
    setIsLoading(true);
    const updatedQuestion = {
      ...questionData,
      questionText,
      approved: approvedStatus,
      skillType: questionSkill,
      mark: Number(mark),
      answerText: correctAnswer,
    };

    if (questionType === "MCQ") {
      updatedQuestion.option1 = answers[0];
      updatedQuestion.option2 = answers[1];
      updatedQuestion.option3 = answers[2];
      updatedQuestion.option4 = answers[3];
    } else if (questionType === "T/F") {
      updatedQuestion.option1 = "True";
      updatedQuestion.option2 = "False";
      updatedQuestion.option3 = null;
      updatedQuestion.option4 = null;
    } else if (questionType === "Short Answer") {
      updatedQuestion.option1 = null;
      updatedQuestion.option2 = null;
      updatedQuestion.option3 = null;
      updatedQuestion.option4 = null;
    }

    try {
      const response = await fetch(
        "https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/update-question",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedQuestion),
        }
      );

      if (response.ok) {
        setAlertStatus("success");
        setAlertMessage("Question updated successfully!");
        // onClose();

        if (onQuestionUpdate) {
          onQuestionUpdate({
            ...updatedQuestion,
            // include updated fields if backend doesn't return full object
          });
        }
      } else {
        setAlertStatus("error");
        setAlertMessage("Failed to update question");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(v) => !v && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="5xl" w="full">
            <Dialog.Header>
              <Dialog.Title>Question {questionId}</Dialog.Title>
            </Dialog.Header>
            {alertStatus && (
              <Alert.Root
                colorPalette={alertStatus === "error" ? "red" : "green"}
                variant="solid"
                w={"90%"}
                mx={"auto"}
              >
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>
                    {alertStatus === "error" ? "Error" : "Success"}
                  </Alert.Title>
                  <Alert.Description>{alertMessage}</Alert.Description>
                </Alert.Content>
                <CloseButton
                  pos="relative"
                  top="-2"
                  insetEnd="-2"
                  onClick={() => setAlertStatus(null)}
                />
              </Alert.Root>
            )}
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                onClick={() => {
                  onClose();
                  setAlertMessage(null);
                  setAlertStatus(null);
                }}
              />
            </Dialog.CloseTrigger>
            <Dialog.Body pb="4" w="full">
              <Flex w="full" gap={6}>
                <Box
                  w="28%"
                  p={5}
                  bg={"gray.50"}
                  borderRadius={"md"}
                  spaceY={4}
                >
                  <Field.Root>
                    <Text fontWeight={"medium"}>Question Type</Text>
                    <Input
                      size={"sm"}
                      width={"full"}
                      value={questionType}
                      readOnly
                      bg={"white"}
                      disabled={isLoading}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Text fontWeight={"medium"}>Skill</Text>
                    <Input
                      size={"sm"}
                      width={"full"}
                      value={questionSkill}
                      disabled={isLoading}
                      onChange={(e) => setQuestionSkill(e.target.value)}
                      bg={"white"}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Select.Root
                      collection={marks}
                      size="sm"
                      width="full"
                      defaultValue={mark}
                      disabled={isLoading}
                      onValueChange={(e) => setMark(e?.value?.[0])}
                    >
                      <Select.HiddenSelect />
                      <Select.Label>Mark</Select.Label>
                      <Select.Control bg={"white"}>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select Mark" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Select.Positioner>
                        <Select.Content>
                          {marks.items.map((m) => (
                            <Select.Item item={m} key={m.value}>
                              {m.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Select.Root>
                  </Field.Root>
                </Box>

                <Stack flex={1} gap="4" align={"center"}>
                  <Field.Root>
                    <Textarea
                      placeholder="Question"
                      value={questionText}
                      disabled={isLoading}
                      onChange={(e) => setQuestionText(e.target.value)}
                      mb={5}
                    />
                  </Field.Root>

                  {questionType == "MCQ" &&
                    [0, 1, 2, 3].map((index) => (
                      <HStack key={index} spacing={4} align="start" w={"full"}>
                        <Field.Root w="full">
                          <InputGroup startElement={`${answerLabels[index]}:`}>
                            <Group attached w={"full"}>
                              <Input
                                w="full"
                                flex={1}
                                placeholder="Answer"
                                pl={9}
                                disabled={isLoading}
                                value={answers[index]}
                                onChange={(e) => {
                                  const updated = [...answers];
                                  updated[index] = e.target.value;
                                  setAnswers(updated);
                                }}
                              />
                              <Button
                                bg="ghost"
                                variant="outline"
                                disabled={isLoading}
                                onClick={() => setCorrectAnswer(answers[index])}
                              >
                                {correctAnswer === answers[index] ? (
                                  <FaCircle color="green" />
                                ) : (
                                  <FaRegCircle color="grey" />
                                )}
                              </Button>
                            </Group>
                          </InputGroup>
                        </Field.Root>
                      </HStack>
                    ))}

                  {questionType === "T/F" &&
                    ["True", "False"].map((value, index) => (
                      <HStack key={value} spacing={4} align="start" w={"full"}>
                        <Field.Root w="full">
                          <InputGroup>
                            <Group attached w={"full"}>
                              <Input
                                w="full"
                                flex={1}
                                readOnly
                                value={value}
                                disabled={isLoading}
                              />
                              <Button
                                bg="ghost"
                                variant="outline"
                                onClick={() => setCorrectAnswer(value)}
                                disabled={isLoading}
                              >
                                {correctAnswer === value ? (
                                  <FaCircle color="green" />
                                ) : (
                                  <FaRegCircle color="grey" />
                                )}
                              </Button>
                            </Group>
                          </InputGroup>
                        </Field.Root>
                      </HStack>
                    ))}

                  {questionType === "Short Answer" && (
                    <HStack spacing={4} align="start" w={"full"}>
                      <Field.Root w="full">
                        <InputGroup startElement={"Answer:"}>
                          <Group attached w={"full"}>
                            <Input
                              w="full"
                              flex={1}
                              pl={20}
                              placeholder="Correct answer"
                              value={correctAnswer}
                              disabled={isLoading}
                              onChange={(e) => setCorrectAnswer(e.target.value)}
                            />
                          </Group>
                        </InputGroup>
                      </Field.Root>
                    </HStack>
                  )}
                </Stack>
              </Flex>
            </Dialog.Body>

            <Dialog.Footer>
              <Flex w={"full"} gap={3} justify={"space-evenly"}>
                <Button
                  colorPalette={"green"}
                  w={"1/2"}
                  h={12}
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={async () => {
                    setApproved(true);
                    await handleSave(true);
                  }}
                  spinnerPlacement="start"
                >
                  {isLoading && approve === true ? (
                    <>
                      <HStack spacing={2}>
                        <Spinner size="sm" />
                        <span>Approving...</span>
                      </HStack>
                    </>
                  ) : (
                    "Approve"
                  )}
                </Button>
                <Button
                  colorPalette={"red"}
                  w={"1/2"}
                  h={12}
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={async () => {
                    setApproved(false);
                    await handleSave(false);
                  }}
                  spinnerPlacement="start"
                >
                  {isLoading && approve === false ? (
                    <>
                      <HStack spacing={2}>
                        <Spinner size="sm" />
                        <span>Declining...</span>
                      </HStack>
                    </>
                  ) : (
                    "Decline"
                  )}
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
