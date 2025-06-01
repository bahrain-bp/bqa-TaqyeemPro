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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isDialogOpen) {
      setSelectedSubject(null);
      setSelectedGrade(null);
      setSelectedSpecification(null);
      setNumQuestions(10);
      setIsLoading(false);
      setAlertStatus(null);
      setAlertMessage("");
      setSelectedLang(null);
      setSpecItems([]);
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (!isDialogOpen) return;

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
  }, [isDialogOpen]);

  const specifications = createListCollection({ items: specItems });
  const language = createListCollection({
    items: [
      { label: "English", value: "English" },
      { label: "Arabic", value: "Arabic" },
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
        "https://kjww415dkc.execute-api.us-east-1.amazonaws.com/prod/invokeFunction",
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
      setAlertMessage(
        "Your request has been received! The questions are being generated and will appear shortly on the Generated Questions page."
      );

      // log the response
      console.log("API response:", data);
    } catch (error) {
      console.error(error);
      setAlertStatus("error");
      setAlertMessage("Failed to generate questions.");
    } finally {
      setIsLoading(false);
      setIsCooldown(true);
      setTimeLeft(60);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <VStack alignItems="start">
      <Dialog.Root
        onOpenChange={setIsDialogOpen}
        closeOnInteractOutside={false}
      >
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
                    This will upload the requirements needed for the AI to
                    generate the specified number of questions based on the
                    provided specifications. Please note that this process may
                    take some time.
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

                    <Field.Root>
                      <Select.Root
                        collection={specifications}
                        size="sm"
                        width="full"
                        onValueChange={(e) => {
                          const spec = e?.value?.[0];
                          setSelectedSpecification(spec);

                          if (spec) {
                            const match = spec.match(
                              /^G(\d+)-([A-Za-z]+)-.*\.[A-Za-z0-9]+$/i
                            );
                            if (match) {
                              const grade = match[1];
                              const subject = match[2];

                              setSelectedGrade(grade);
                              setSelectedSubject(
                                subject.charAt(0).toUpperCase() +
                                  subject.slice(1)
                              );
                            } else {
                              setSelectedGrade(null);
                              setSelectedSubject(null);
                            }

                            // if (/Math/i.test(spec)) {
                            //   setSelectedLang(null);
                            // } else {
                            //   setSelectedLang(null);
                            // }
                          }
                        }}
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
                      <Field.Label>Number of Questions (10 to 15)</Field.Label>
                      <NumberInput.Root
                        defaultValue={10}
                        width="full"
                        min={10}
                        max={15}
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
                  disabled={isLoading || isCooldown}
                >
                  {isLoading ? (
                    <HStack spacing={2}>
                      <Spinner size="sm" />
                      <span>Sending Request...</span>
                    </HStack>
                  ) : isCooldown ? (
                    `Please wait ${timeLeft}s`
                  ) : (
                    "Start Generating"
                  )}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" onClick={() => setIsDialogOpen(false)} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </VStack>
  );
}
