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
                      <Field.Label>Title</Field.Label>
                      <Input type="Text" placeholder="Title" />
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
