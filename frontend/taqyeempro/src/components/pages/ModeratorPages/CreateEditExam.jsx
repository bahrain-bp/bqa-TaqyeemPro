import React, { useEffect, useState } from "react";
import { Button, CloseButton, Dialog, Flex, HStack, Portal, Spinner } from "@chakra-ui/react";

export default function CreateEditExam({ isOpen, onClose, examData, isEdit }) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(
      "https://ye12pw73we.execute-api.us-east-1.amazonaws.com/prod/view-question"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Dialog.Root
      placement="center"
      motionPreset="slide-in-bottom"
      open={isOpen}
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
                <CloseButton
                  size="sm"
                  onClick={() => {
                    onClose();
                  }}
                />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Dialog.Body>
            <Dialog.Footer>
              <Flex w={"full"} gap={3} justify={"space-evenly"}>
                <Button
                  colorPalette={"green"}
                  w={"1/2"}
                  h={12}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <HStack spacing={2}>
                        <Spinner size="sm" />
                        <span>Saving...</span>
                      </HStack>
                    </>
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
