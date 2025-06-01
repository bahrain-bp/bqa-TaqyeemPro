import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Stack,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";

export default function ExamPage() {
  // Timer state: starts at 60 minutes = 3600 seconds
  const [timeLeft, setTimeLeft] = useState(3600);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // Start countdown when component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Stop at 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  // ✅ Auto-submit when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0) {
      // Replace with your submission logic
      window.location.href = "/StudentQuitPage"; // Or use React Router's navigate()
    }
  }, [timeLeft]);

  return (
    <Box minH="100vh" px={{ base: 8, lg: 24 }}>
      {/* Page Heading */}
      <Flex mt={12} mb={8} borderBottom="2px solid #E6E6E6" pb={4}>
        <Text
          fontFamily="'YourPreferredFont'"
          fontSize={{ base: "4xl", md: "6xl" }}
          color="black"
          lineHeight="shorter"
        >
          Maths for Grade 9
        </Text>
        <Text ml="auto" fontSize={{ base: "xl", md: "2xl" }} color="#000000">
          Date — April 10, 2025
        </Text>
      </Flex>

      {/* Timer Chips */}
      <Flex paddingTop={20} justify="flex-end" mt={-8} mb={8}>
        <Button bg="#426B1F" color="white" px={4} py={2} borderRadius="full">
          Time Left
        </Button>
        <Box
          bg="white"
          border="1px solid #C2C2C2"
          borderRadius="full"
          mx={4}
          p={2}
        >
          <Text fontWeight="bold" fontSize="lg" color="#000000">
            {formatTime(timeLeft)}
          </Text>
        </Box>
      </Flex>

      {/* Main Content */}
      <Flex mt={12} gap={{ base: 8, md: 16 }} flexWrap={{ base: "wrap", md: "nowrap" }}>
        {/* Question Container */}
        <Box w={{ base: "full", md: "70%" }} maxW="800px">
          <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
            <Text fontWeight="bold" fontSize="xl" mb={4} textAlign="center" color="black">
              QUESTION 6:
            </Text>

            <Box bg="#FAFAF5" p={8} borderRadius="lg" mb={8} >
              <Text
                fontSize="4xl"
                color="black"
                mb={4}
                dangerouslySetInnerHTML={{
                  __html: "x + y = 4<br/>xy = 16",
                }}
              />
            </Box>

            <HStack spacing={8} justifyContent="center" color="black" >
                <Button
                  bg="white"
                  border="1px solid #C2C2C2"
                  borderRadius="lg"
                  px={8}
                  py={4}
                  _hover={{ bg: "#E4F5E1" }}
                >
                  <Text 
                    fontWeight="bold" 
                    fontSize="4xl" 
                    color="black" // ✅ Add this line
                  >
                    4
                  </Text>
                </Button>

                <Button
                  bg="white"
                  border="1px solid #C2C2C2"
                  borderRadius="lg"
                  px={8}
                  py={4}
                  _hover={{ bg: "#E4F5E1" }}
                >
                  <Text 
                    fontWeight="bold" 
                    fontSize="4xl" 
                    color="black" // ✅ Add this line
                  >
                    1
                  </Text>
                </Button>

                <Button
                  bg="white"
                  border="1px solid #C2C2C2"
                  borderRadius="lg"
                  px={8}
                  py={4}
                  _hover={{ bg: "#E4F5E1" }}
                >
                  <Text 
                    fontWeight="bold" 
                    fontSize="4xl" 
                    color="black" // ✅ Add this line
                  >
                    2
                  </Text>
                </Button>

                <Button
                  bg="white"
                  border="1px solid #C2C2C2"
                  borderRadius="lg"
                  px={8}
                  py={4}
                  _hover={{ bg: "#E4F5E1" }}
                >
                  <Text 
                    fontWeight="bold" 
                    fontSize="4xl" 
                    color="black" // ✅ Add this line
                  >
                    21
                  </Text>
                </Button>

            </HStack>
          </Box>

          <Flex mt={8} justifyContent="space-between">
            <Button
              bg="#426B1F"
              color="white"
              px={8}
              py={4}
              borderRadius="md"
              leftIcon={<Icon boxSize={4} path="M15 12H9" />}
            >
              PREVIOUS QUESTION
            </Button>

            <VStack alignItems="center" spacing={2}>
              <Text fontWeight="bold" fontSize="xl" color="black">
                QUESTION
              </Text>
              <Text fontWeight="bold" fontSize="4xl" color="black">
                6
              </Text>
            </VStack>

            <Button
              bg="#426B1F"
              color="white"
              px={8}
              py={4}
              borderRadius="md"
              rightIcon={<Icon boxSize={4} path="M9 12H15" />}
            >
              NEXT QUESTION
            </Button>
          </Flex>
        </Box>

        {/* Summary Card */}
        <Box
          w={{ base: "full", md: "30%" }}
          maxW="400px"
          bg="#FAFAF5"
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="xl" mb={4} color="black">
            Time Left
          </Text>

          <Box bg="white" p={8} borderRadius="lg" mb={8}>
            <Text fontWeight="bold" fontSize="xl" textAlign="center" color="black">
              {formatTime(timeLeft)}
            </Text>
          </Box>

          <Box border="2px solid #426B1F" borderRadius="lg" p={4}>
            <Text fontWeight="bold" fontSize="xl" mb={4} color="black">
              Maths for Grade 9
            </Text>

            <Stack direction="row" justifyContent="space-between" mb={2} color="black">
              <Text>Total Question:</Text>
              <Text>10</Text>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={2} color="black">
              <Text>Answered:</Text>
              <Text>6</Text>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={2} color="black">
              <Text>Not Answered:</Text>
              <Text>4</Text>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={4} color="black">
              <Text>Complete ratio:</Text>
              <Text>60%</Text>
            </Stack>

            <Button
              bg="#426B1F"
              color="white"
              w="full"
              h="12"
              _hover={{ bg: "#3A5C19" }}
              rightIcon={<Icon boxSize={4} path="M9 12H15" />}
              as="a"
              href="/StudentConfirmationPage"
            >
              SUBMIT EXAM
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

const AnswerButton = ({ value }) => {
  return (
    <Button
      bg="white"
      border="1px solid #C2C2C2"
      borderRadius="lg"
      px={8}
      py={4}
      _hover={{ bg: "#E4F5E1" }}
    >
      <Text fontWeight="bold" fontSize="4xl">
        {value}
      </Text>
    </Button>
  );
};