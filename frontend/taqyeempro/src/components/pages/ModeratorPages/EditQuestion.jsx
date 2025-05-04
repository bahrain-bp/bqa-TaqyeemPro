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
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuCircle, LuUpload } from "react-icons/lu";

export default function EditQuestion({ isOpen, onClose }) {
  const ref = useRef(null);
  const questionTypes = createListCollection({
    items: [
      { label: "Multiple Choice", value: "mc" },
      { label: "True Or False", value: "tof" },
      { label: "Short Answer", value: "sa" },
    ],
  });
  const marks = createListCollection({
    items: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
    ],
  });
  const [selectedAnswer, setSelectedAnswer] = useState("");

  return (
    <Dialog.Root open={isOpen} onOpenChange={(v) => !v && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="5xl" w="full">
            <Dialog.Header>
              <Dialog.Title>Question 1</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={onClose} />
            </Dialog.CloseTrigger>
            <Dialog.Body pb="4" w="full">
              {" "}
              {/* Make the dialog body wider */}
              <Flex w="full" gap={6}>
                {" "}
                {/* Flex container to align Box and Stack horizontally */}
                <Box
                  w="25%"
                  p={5}
                  bg={"gray.50"}
                  borderRadius={"md"}
                  spaceY={4}
                >
                  <Field.Root>
                    <Select.Root
                      collection={questionTypes}
                      size="sm"
                      width="full"
                    >
                      <Select.HiddenSelect />
                      <Select.Label>Question Type</Select.Label>
                      <Select.Control bg={"white"}>
                        <Select.Trigger>
                          <Select.ValueText placeholder="Select Type" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Select.Positioner>
                        <Select.Content>
                          {questionTypes.items.map((questionTypes) => (
                            <Select.Item
                              item={questionTypes}
                              key={questionTypes.value}
                            >
                              {questionTypes.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Select.Root>
                  </Field.Root>
                  <Field.Root>
                    <Select.Root collection={marks} size="sm" width="full">
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
                          {marks.items.map((marks) => (
                            <Select.Item item={marks} key={marks.value}>
                              {marks.label}
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
                    <Input placeholder="Question" />
                  </Field.Root>
                  <Field.Root alignItems={"center"}>
                    <FileUpload.Root alignItems="stretch" maxFiles={1}>
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
                  <HStack spacing={4} align="start" w={"full"}>
                    <Field.Root>
                      <InputGroup startElement="A:">
                        <Group attached w={"full"}>
                          <Input
                            w={"full"}
                            flex={1}
                            placeholder="Answer"
                            pl={9}
                          />
                          <Button bg="ghost" variant="outline">
                            <LuCircle />
                          </Button>
                        </Group>
                      </InputGroup>
                    </Field.Root>
                    <Field.Root>
                      <InputGroup startElement="B:">
                        <Group attached w={"full"}>
                          <Input
                            w={"full"}
                            flex={1}
                            placeholder="Answer"
                            pl={9}
                          />
                          <Button bg="ghost" variant="outline">
                            <LuCircle />
                          </Button>
                        </Group>
                      </InputGroup>
                    </Field.Root>
                  </HStack>
                  <HStack spacing={4} align="start" w={"full"}>
                    <Field.Root>
                      <InputGroup startElement="C:">
                        <Group attached w={"full"}>
                          <Input
                            w={"full"}
                            flex={1}
                            placeholder="Answer"
                            pl={9}
                          />
                          <Button bg="ghost" variant="outline">
                            <LuCircle />
                          </Button>
                        </Group>
                      </InputGroup>
                    </Field.Root>
                    <Field.Root>
                      <InputGroup startElement="D:">
                        <Group attached w={"full"}>
                          <Input
                            w={"full"}
                            flex={1}
                            placeholder="Answer"
                            pl={9}
                          />
                          <Button bg="ghost" variant="outline">
                            <LuCircle />
                          </Button>
                        </Group>
                      </InputGroup>
                    </Field.Root>
                  </HStack>
                </Stack>
              </Flex>
            </Dialog.Body>

            <Dialog.Footer>
              <Flex w={"full"} gap={3} justify={"space-evenly"}>
                <Button
                  colorPalette={"green"}
                  onClick={onClose}
                  w={"1/2"}
                  h={12}
                >
                  Approve
                </Button>
                <Button colorPalette={"red"} onClick={onClose} w={"1/2"} h={12}>
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
