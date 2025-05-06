// UploadSpecifications.jsx
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
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";

export default function UploadSpecifications() {
  const subjects = createListCollection({
    items: [
      { label: "Maths", value: "math" },
      { label: "Arabic", value: "arabic" },
    ],
  });

  const grades = createListCollection({
    items: [
      { label: "Grade 9", value: "9" },
      { label: "Grade 12", value: "12" },
    ],
  });
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
            colorPalette={"red"}
          >
            Upload Specefications
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
                    <Field.Root>
                      <Select.Root collection={subjects} size="sm" width="full" mt={3}>
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
                            {subjects.items.map((subjects) => (
                              <Select.Item item={subjects} key={subjects.value}>
                                {subjects.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>
                    <Field.Root>
                      <Select.Root collection={grades} size="sm" width="full" mb={5}>
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
                            {grades.items.map((grades) => (
                              <Select.Item item={grades} key={grades.value}>
                                {grades.label}
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
                        <FileUpload.HiddenInput />
                        <FileUpload.Dropzone>
                          <Icon size="md" color="fg.muted">
                            <LuUpload />
                          </Icon>
                          <FileUpload.DropzoneContent>
                            <Box>Drag and drop files here</Box>
                            <Box color="fg.muted">.pdf, .docx up to 20MB</Box>
                          </FileUpload.DropzoneContent>
                        </FileUpload.Dropzone>
                        <FileUpload.List />
                      </FileUpload.Root>
                    </Field.Root>
                  </Stack>
                </DataList.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button colorPalette={"red"} w={"full"} h={"12"}>
                  Upload
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
