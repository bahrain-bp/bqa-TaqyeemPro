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
} from "@chakra-ui/react";
import { useRef } from "react";
import { LuCircle, LuUpload } from "react-icons/lu";

export default function EditQuestion({ isOpen, onClose }) {
  const ref = useRef(null);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(v) => !v && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Question 1</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={onClose} />
            </Dialog.CloseTrigger>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Input placeholder="Question" />
                </Field.Root>
                <Field.Root>
                  <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={1}>
                    <FileUpload.HiddenInput />
                    <FileUpload.Dropzone>
                      <Icon size="md" color="fg.muted">
                        <LuUpload />
                      </Icon>
                      <FileUpload.DropzoneContent>
                        <Box>Add or Insert Image</Box>
                        <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                      </FileUpload.DropzoneContent>
                    </FileUpload.Dropzone>
                    <FileUpload.List />
                  </FileUpload.Root>
                </Field.Root>
                <HStack spacing={4} align="start">
                  <Field.Root>
                    <InputGroup startElement="A:">
                      <Group attached>
                        <Input flex={1} placeholder="Answer" pl={9} />
                        <Button bg="ghost" variant="outline">
                          <LuCircle />
                        </Button>
                      </Group>
                    </InputGroup>
                  </Field.Root>
                  <Field.Root>
                    <InputGroup startElement="B:">
                      <Group attached>
                        <Input flex={1} placeholder="Answer" pl={9} />
                        <Button bg="ghost" variant="outline">
                          <LuCircle />
                        </Button>
                      </Group>
                    </InputGroup>
                  </Field.Root>
                </HStack>
                <HStack spacing={4} align="start">
                  <Field.Root>
                    <InputGroup startElement="C:">
                      <Group attached>
                        <Input flex={1} placeholder="Answer" pl={9} />
                        <Button bg="ghost" variant="outline">
                          <LuCircle />
                        </Button>
                      </Group>
                    </InputGroup>
                  </Field.Root>
                  <Field.Root>
                    <InputGroup startElement="D:">
                      <Group attached>
                        <Input flex={1} placeholder="Answer" pl={9} />
                        <Button bg="ghost" variant="outline">
                          <LuCircle />
                        </Button>
                      </Group>
                    </InputGroup>
                  </Field.Root>
                </HStack>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Flex w={"full"} gap={3} justify={"space-evenly"}>
                <Button colorPalette={"green"} onClick={onClose} w={"1/2"}>
                  Approve
                </Button>
                <Button colorPalette={"red"} onClick={onClose} w={"1/2"}>
                  Decline
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
