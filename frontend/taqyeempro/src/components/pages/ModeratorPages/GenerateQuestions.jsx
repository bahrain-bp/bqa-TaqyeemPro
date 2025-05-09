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
} from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";

export default function GenerateQuestions() {
  const specifications = createListCollection({
    items: [
      { label: "File 2", value: "2" },
      { label: "File 11", value: "11" },
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
                    specifications. Please note that the process may take some
                    time, and you will be notified once it is complete. The
                    generated questions will be available on the "Generated
                    Questions" page under the selected subject and grade for
                    your review.
                  </p>
                  <Stack gap="4">
                    <Field.Root>
                      <Select.Root
                        collection={specifications}
                        size="sm"
                        width="full"
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
                            {specifications.items.map((specifications) => (
                              <Select.Item
                                item={specifications}
                                key={specifications.value}
                              >
                                {specifications.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Field.Root>
                    <Field.Root>
                      <Field.Label mt={5}>Number of Questions</Field.Label>
                      <InputGroup
                        startElement="Multiple Choice:"
                        startElementProps={{ color: "black" }}
                      >
                        <Group attached w={"full"}>
                          <Input
                            type="number"
                            w={"full"}
                            flex={1}
                            defaultValue={0}
                            min={0}
                            max={20}
                            pl={80}
                          />
                        </Group>
                      </InputGroup>
                      <InputGroup
                        startElement="True or False:"
                        startElementProps={{ color: "black" }}
                      >
                        <Group attached w={"full"}>
                          <Input
                            type="number"
                            w={"full"}
                            flex={1}
                            defaultValue={0}
                            min={0}
                            max={20}
                            pl={80}
                          />
                        </Group>
                      </InputGroup>
                      <InputGroup
                        startElement="Short Answer:"
                        startElementProps={{ color: "black" }}
                      >
                        <Group attached w={"full"}>
                          <Input
                            type="number"
                            w={"full"}
                            flex={1}
                            defaultValue={0}
                            min={0}
                            max={20}
                            pl={80}
                          />
                        </Group>
                      </InputGroup>
                    </Field.Root>
                  </Stack>
                </DataList.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button colorPalette={"blue"} w={"full"} h={"12"}>
                  Start Generating
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
