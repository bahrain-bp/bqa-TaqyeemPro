import React, { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  createListCollection,
  Dialog,
  Field,
  Flex,
  HStack,
  Input,
  Portal,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { DataGrid } from "@mui/x-data-grid";

export default function CreateEditExam({ isOpen, onClose, examData, isEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [examTitle, setExamTitle] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [active, setActive] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

  const subjectOptions = createListCollection({
    items: [{ label: "Math", value: "Math" }],
  });

  const gradeOptions = createListCollection({
    items: [
      { label: "Grade 9", value: 9 },
      { label: "Grade 12", value: 12 },
    ],
  });

  const languageOptions = createListCollection({
    items: [
      { label: "Arabic", value: "Arabic" },
      { label: "English", value: "English" },
    ],
  });

  const durationOptions = createListCollection({
    items: [
      { label: "1 hour", value: "1 hour" },
      { label: "2 hours", value: "2 hours" },
      { label: "3 hours", value: "3 hours" },
    ],
  });

  const activeOptions = createListCollection({
    items: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/view-question"
    )
      .then((res) => res.json())
      .then((data) => {
        const activeQuestions = data.filter((q) => q.approved === true);
        setQuestions(activeQuestions);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setExamTitle("");
      setExamDescription("");
      setSubject("");
      setGrade("");
      setLanguage("");
      setDuration("");
      setActive("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isEdit && examData?.questions?.length > 0) {
      setSelectedQuestionIds(examData.questions);
    }
  }, [isEdit, examData]);

  const columns = [
    { field: "id", headerName: "No.", width: 70 },
    { field: "questionText", headerName: "Question", flex: 1 },
    { field: "subject", headerName: "Subject", width: 120 },
    { field: "grade", headerName: "Grade", width: 100 },
    { field: "language", headerName: "Language", width: 100 },
    { field: "questionType", headerName: "Type", width: 100 },
    { field: "mark", headerName: "Mark", width: 80 },
    { field: "skillType", headerName: "Skill", flex: 1 },
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchesSubject = subject ? q.subject === subject : true;
    const matchesGrade = grade ? q.grade === grade : true;
    const matchesLanguage = language ? q.language === language : true;
    return matchesSubject && matchesGrade && matchesLanguage;
  });

  const rows = filteredQuestions.map((q, index) => ({
    id: index + 1,
    questionText: q.questionText,
    subject: q.subject,
    grade: q.grade,
    language: q.language,
    questionType: q.questionType,
    mark: q.mark,
    skillType: q.skillType,
  }));

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-bottom"
      scrollBehavior="inside"
      open={isOpen}
      size="xl"
      onOpenChange={(v) => !v && onClose()}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {isEdit ? "Update Exam" : "Create New Exam"}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={() => onClose()} />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={4}>
                <Field.Root>
                  <Text fontWeight="medium">Exam Title</Text>
                  <Input
                    size="sm"
                    width="full"
                    value={examTitle}
                    disabled={isLoading}
                    onChange={(e) => setExamTitle(e.target.value)}
                    bg="white"
                    placeholder="Exam Title"
                  />
                </Field.Root>

                <Field.Root>
                  <Text fontWeight="medium">Exam Description</Text>
                  <Textarea
                    placeholder="Exam Description"
                    value={examDescription}
                    disabled={isLoading}
                    onChange={(e) => setExamDescription(e.target.value)}
                    h={32}
                  />
                </Field.Root>

                {[{
                  label: "Subject",
                  options: subjectOptions,
                  value: subject,
                  setter: setSubject
                }, {
                  label: "Grade",
                  options: gradeOptions,
                  value: grade,
                  setter: setGrade
                }, {
                  label: "Language",
                  options: languageOptions,
                  value: language,
                  setter: setLanguage
                }, {
                  label: "Duration",
                  options: durationOptions,
                  value: duration,
                  setter: setDuration
                }, {
                  label: "Active",
                  options: activeOptions,
                  value: active,
                  setter: setActive
                }].map(({ label, options, value, setter }) => (
                  <Field.Root key={label}>
                    <Select.Root
                      collection={options}
                      size="sm"
                      width="full"
                      defaultValue={value}
                      disabled={isLoading}
                      onValueChange={(e) => setter(e?.value?.[0])}
                    >
                      <Select.HiddenSelect />
                      <Select.Label>{label}</Select.Label>
                      <Select.Control bg="white">
                        <Select.Trigger>
                          <Select.ValueText placeholder={`Select ${label}`} />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Select.Positioner>
                        <Select.Content>
                          {options.items.map((item) => (
                            <Select.Item item={item} key={item.value}>
                              {item.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Select.Root>
                  </Field.Root>
                ))}

                <Field.Root>
                  <Box width="full">
                    <Text fontWeight="medium" mb={2}>Questions</Text>
                    <DataGrid
                      checkboxSelection
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5, 10, 20]}
                    />
                  </Box>
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Flex w="full" gap={3} justify="space-evenly">
                <Button
                  colorPalette="green"
                  w="1/2"
                  h={12}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <HStack spacing={2}>
                      <Spinner size="sm" />
                      <span>Saving...</span>
                    </HStack>
                  ) : (
                    "Save"
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
