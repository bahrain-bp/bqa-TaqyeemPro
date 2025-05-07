import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

function ExamPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [popupType, setPopupType] = useState("");

  const handleClick = (type) => {
    setPopupType(type);
    onOpen();
  };

  const getMessage = () => {
    if (popupType === "notValid") {
      return "This exam is no longer valid. Please contact your instructor if you think this is a mistake.";
    } else if (popupType === "completed") {
      return "You have already completed this exam. You cannot retake it.";
    }
    return "";
  };

  return (
    <>
      {/* Example buttons */}
      <Button colorScheme="red" onClick={() => handleClick("notValid")}>
        Not Valid
      </Button>
      <Button colorScheme="blue" ml={4} onClick={() => handleClick("completed")}>
        Completed Exam
      </Button>

      {/* Modal Popup */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{getMessage()}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ExamPopup;
