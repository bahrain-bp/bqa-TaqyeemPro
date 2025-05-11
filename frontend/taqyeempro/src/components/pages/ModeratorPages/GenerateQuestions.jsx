import {
  Avatar,
  Badge,
  Button,
  CloseButton,
  DataList,
  Dialog,
  Field,
  HStack,
  Portal,
  Stack,
  Textarea,
  VStack,
  Input,
  FileUpload,
  Icon,
  Box,
  Select,
  createListCollection,
  InputGroup,
  Group,
  NumberInput,
  Spinner,
  Alert,
  Text,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { useState, useEffect } from "react";

export default function GenerateQuestions() {
  const [specItems, setSpecItems] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSpecification, setSelectedSpecification] = useState(null);
  const [numQuestions, setNumQuestions] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedLang, setSelectedLang] = useState(null);

  useEffect(() => {
    async function fetchSpecifications() {
      try {
        const response = await fetch(
          "https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/list-files"
        );
        const data = await response.json();
        const formatted = data.files
          .filter((file) => file !== ".DS_Store")
          .map((file) => ({
            label: file,
            value: file,
          }));
        setSpecItems(formatted);
      } catch (error) {
        console.error("Error fetching specifications:", error);
      }
    }

    fetchSpecifications();
  }, []);

  const specifications = createListCollection({ items: specItems });
  const language = createListCollection({
    items: [
      { label: "English", value: "English" },
      { label: "Arabic", value: "Arabic" },
    ],
  });

  const subject = createListCollection({
    items: [
      { label: "Math", value: "Math" },
      { label: "Arabic", value: "Arabic" },
    ],
  });

  const grade = createListCollection({
    items: [
      { label: "Grade 9", value: "9" },
      { label: "Grade 12", value: "12" },
    ],
  });

  const handleSubmit = async () => {
  if (
    !selectedSpecification ||
    !selectedSubject ||
    !selectedGrade ||
    (selectedSubject === "Math" && !selectedLang)
  ) {
    setAlertStatus("error");
    setAlertMessage("Please select all fields.");
    return;
  }

  setIsLoading(true);
  setAlertStatus(null);

  const payload = {
    file_key: selectedSpecification,
    subject: selectedSubject,
    grade: Number(selectedGrade),
    quesions: numQuestions,
    language: selectedSubject === "Math" ? selectedLang : null,
  };

  console.log(payload);

  try {
    const response = await fetch(
      "https://kjww415dkc.execute-api.us-east-1.amazonaws.com/prod/invoke",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate questions");
    }

    const data = await response.json();

    setAlertStatus("success");
    setAlertMessage("Questions generated successfully!");

    // Optional: log the response
    console.log("API response:", data);
  } catch (error) {
    console.error(error);
    setAlertStatus("error");
    setAlertMessage("Failed to generate questions.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <VStack alignItems="start">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            w={"full"}
            h={"full"}
            fontWeight={"bold"}
            fontSize={"lg"}
            variant={"subtle"}
            colorPalette={"blue"}
          >
            Generate Questions
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Generate Questions</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <DataList.Root orientation="horizontal">
                  <p>
                    This will upload the requirements for the AI to generate the
                    specified number of questions based on the uploaded
                    specifications.
                  </p>
                  <Stack gap="4">
                    {/* Alert message */}
                    {alertStatus && (
                      <Alert.Root
                        colorPalette={alertStatus === "error" ? "red" : "green"}
                        variant="solid"
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

                    {/* Select Specification */}
                    <Field.Root>
                      <Select.Root
                        collection={specifications}
                        size="sm"
                        width="full"
                        onValueChange={(e) =>
                          setSelectedSpecification(e?.value?.[0])
                        }
                        disabled={isLoading}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Specification</Select.Label>
                        <Select.Control bg={"white"}>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select Specification" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {specifications.items.map((item) => (
                              <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>

                    {/* Select Grade */}
                    <Field.Root>
                      <Select.Root
                        collection={grade}
                        size="sm"
                        width="full"
                        onValueChange={(e) => setSelectedGrade(e?.value?.[0])}
                        disabled={isLoading}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Grade</Select.Label>
                        <Select.Control bg={"white"}>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select Grade" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {grade.items.map((item) => (
                              <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>

                    {/* Select Subject */}
                    <Field.Root>
                      <Select.Root
                        collection={subject}
                        size="sm"
                        width="full"
                        onValueChange={(e) => {
                          setSelectedSubject(e.value[0]);
                        }}
                        disabled={isLoading}
                      >
                        <Select.HiddenSelect />
                        <Select.Label>Subject</Select.Label>
                        <Select.Control bg={"white"}>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select Subject" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            {subject.items.map((item) => (
                              <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>

                    {/* Select Language (Only for Math) */}
                    {selectedSubject === "Math" && (
                      <Field.Root>
                        <Select.Root
                          collection={language}
                          size="sm"
                          width="full"
                          onValueChange={(e) => setSelectedLang(e?.value?.[0])}
                          disabled={isLoading}
                        >
                          <Select.HiddenSelect />
                          <Select.Label>Language</Select.Label>
                          <Select.Control bg={"white"}>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Select Language" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Select.Positioner>
                            <Select.Content>
                              {language.items.map((item) => (
                                <Select.Item item={item} key={item.value}>
                                  {item.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Select.Root>
                      </Field.Root>
                    )}

                    {/* Number of Questions */}
                    <Field.Root>
                      <Field.Label>Number of Questions (10 to 50)</Field.Label>
                      <NumberInput.Root
                        defaultValue="10"
                        width="full"
                        min={10}
                        max={50}
                        onChange={(value) => setNumQuestions(value)}
                        disabled={isLoading}
                      >
                        <NumberInput.Control />
                        <NumberInput.Input />
                      </NumberInput.Root>
                      <Field.ErrorText>The entry is invalid</Field.ErrorText>
                    </Field.Root>
                  </Stack>
                </DataList.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  colorPalette={"blue"}
                  w={"full"}
                  h={"12"}
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  disabled={isLoading}
                  spinnerPlacement="start"
                >
                  {isLoading ? "Generating..." : "Start Generating"}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </VStack>
  );
}
