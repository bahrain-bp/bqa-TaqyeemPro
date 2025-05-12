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
  createListCollection,
  Select,
  Spinner,
  Text,
  Alert,
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { useEffect, useState } from "react";

export default function UploadSpecifications() {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [error, setError] = useState("");
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isDialogOpen) {
      setSelectedSubject(null);
      setSelectedGrade(null);
      setError("");
      setIsUploading(false);
      setAlertStatus(null);
      setAlertMessage("");
    }
  }, [isDialogOpen]);

  const subjects = createListCollection({
    items: [
      { label: "Maths", value: "Math" },
      { label: "Arabic", value: "Arabic" },
      { label: "English", value: "English" },
    ],
  });

  const grades = createListCollection({
    items: [
      { label: "Grade 9", value: "9" },
      { label: "Grade 12", value: "12" },
    ],
  });

  const handleFileUpload = async () => {
    const file = document.querySelector('input[type="file"]').files[0];

    if (!file) {
      setAlertStatus("error");
      setAlertMessage("Please select a file.");
      return;
    }

    if (!selectedSubject || !selectedGrade) {
      setAlertStatus("error");
      setAlertMessage("Please select both subject and grade.");
      return;
    }

    setAlertStatus(null); // clear previous alerts

    const subject = subjects.items.find((s) => s.value === selectedSubject);
    const grade = grades.items.find((g) => g.value === selectedGrade);
    const subjectLabel = subject ? subject.value : "Subject";
    const gradeLabel = grade ? grade.value : "9";
    const fileExtension = file.name.split(".").pop();
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Example format: 12May2025-143015
    const dateString = `${day}${month}${year}-${hours}${minutes}${seconds}`;

    const fileName = `G${gradeLabel}-${subjectLabel}-${dateString}.${fileExtension}`;

    setIsUploading(true);

    try {
      const response = await fetch(
        `https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/get-upload-url`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: fileName,
            contentType: file.type,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { uploadUrl } = await response.json();

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed");
      }

      setAlertStatus("success");
      setAlertMessage("Upload successful!");
    } catch (err) {
      console.error(err);
      setAlertStatus("error");
      setAlertMessage("An error occurred during upload.");
    } finally {
      setIsUploading(false);
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
            colorPalette={"red"}
          >
            Upload Specifications
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Upload Specifications</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <DataList.Root orientation="horizontal">
                  <p>
                    This will upload the specifications for you to use when
                    generating exam questions. Please note that to actually
                    generate the exam questions, you must complete the 'Generate
                    Questions' form.
                  </p>
                  <Stack gap="4">
                    {alertStatus && (
                      <Alert.Root
                        colorPalette={alertStatus === "error" ? "red" : "green"}
                        variant="solid"
                        mt={4}
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
                        collection={subjects}
                        onValueChange={(val) =>
                          setSelectedSubject(val?.value?.[0])
                        }
                        size="sm"
                        width="full"
                        mt={3}
                      >
                        <Select.HiddenSelect disabled={isUploading} />
                        <Select.Label>Subject</Select.Label>
                        <Box
                          pointerEvents={isUploading ? "none" : "auto"}
                          opacity={isUploading ? 0.6 : 1}
                        >
                          <Select.Control bg={"white"}>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Select Subject" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                        </Box>
                        <Select.Positioner>
                          <Select.Content>
                            {subjects.items.map((subject) => (
                              <Select.Item item={subject} key={subject.value}>
                                {subject.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>
                    <Field.Root>
                      <Select.Root
                        collection={grades}
                        onValueChange={(val) =>
                          setSelectedGrade(val?.value?.[0])
                        }
                        size="sm"
                        width="full"
                        mb={5}
                      >
                        <Select.HiddenSelect disabled={isUploading} />
                        <Select.Label>Grade</Select.Label>
                        <Box
                          pointerEvents={isUploading ? "none" : "auto"}
                          opacity={isUploading ? 0.6 : 1}
                        >
                          <Select.Control bg={"white"}>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Select Grade" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                        </Box>
                        <Select.Positioner>
                          <Select.Content>
                            {grades.items.map((grade) => (
                              <Select.Item item={grade} key={grade.value}>
                                {grade.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Upload File</Field.Label>
                      <FileUpload.Root
                        maxW="xl"
                        alignItems="stretch"
                        maxFiles={1}
                        accept={".pdf"}
                      >
                        <FileUpload.HiddenInput disabled={isUploading} />
                        <Box
                          pointerEvents={isUploading ? "none" : "auto"}
                          opacity={isUploading ? 0.6 : 1}
                        >
                          <FileUpload.Dropzone>
                            <Icon size="md" color="fg.muted">
                              <LuUpload />
                            </Icon>
                            <FileUpload.DropzoneContent>
                              <Box>Drag and drop files here</Box>
                              <Box color="fg.muted">.pdf, .docx up to 20MB</Box>
                            </FileUpload.DropzoneContent>
                          </FileUpload.Dropzone>
                        </Box>
                        <FileUpload.List />
                      </FileUpload.Root>
                    </Field.Root>

                    {/* Display error message */}
                    {error && <Text color="red.500">{error}</Text>}
                  </Stack>
                </DataList.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  colorPalette="red"
                  w="full"
                  h="12"
                  onClick={() => {
                    handleFileUpload();
                  }}
                  isDisabled={isUploading}
                  opacity={isUploading ? 0.6 : 1}
                  pointerEvents={isUploading ? "none" : "auto"}
                  cursor={isUploading ? "not-allowed" : "pointer"}
                >
                  {isUploading ? (
                    <HStack spacing={2}>
                      <Spinner size="sm" />
                      <span>Uploading...</span>
                    </HStack>
                  ) : (
                    "Upload"
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
