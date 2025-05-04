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
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";

export default function UploadSpecifications() {
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
              <Dialog.Body pb="8">
                <DataList.Root orientation="horizontal">
                  <p>
                    This will upload the specifications for the AI to generate
                    the requested number of questions. Please note that the
                    process may take some time, and you will be notified once it
                    is complete. The generated questions will be available on
                    the "Generated Questions" page for you to review.
                  </p>
                  <Stack gap="4">
                    <Field.Root>
                      <Field.Label>Title</Field.Label>
                      <Input placeholder="Title" />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Upload File</Field.Label>
                      <FileUpload.Root
                        maxW="xl"
                        alignItems="stretch"
                        maxFiles={10}
                      >
                        <FileUpload.HiddenInput />
                        <FileUpload.Dropzone>
                          <Icon size="md" color="fg.muted">
                            <LuUpload />
                          </Icon>
                          <FileUpload.DropzoneContent>
                            <Box>Drag and drop files here</Box>
                            <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                          </FileUpload.DropzoneContent>
                        </FileUpload.Dropzone>
                        <FileUpload.List />
                      </FileUpload.Root>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Number of Questions</Field.Label>
                      <Input placeholder="ex. 10, 20, 50" />
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
