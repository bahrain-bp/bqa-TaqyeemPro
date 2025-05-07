import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  CloseButton,
  Drawer,
  Portal,
  VStack,
  Image
} from "@chakra-ui/react";
import {
  FaBars,
  FaBell,
} from "react-icons/fa";
import {
  AiOutlineBook,
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineDashboard,
} from "react-icons/ai";

export default function StudentNavBar() {
  return (
    <div className="w-full h-20">
      <Box as="nav" p={4}>
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          h="100%"
          mx="auto"
        >
          {/* Left Side: Logo and Name */}
          <HStack spacing={3} align="center">
            <img src="/BQA-Logo.png" alt="Logo" width="40px" height="40px" />
            <Link
              href="/"
              fontSize="xl"
              color="black"
              fontWeight="bold"
              _hover={{ textDecoration: "none" }}
            >
              Taqyeem Pro
            </Link>
          </HStack>

          {/* Right Side: Login Button */}
          <HStack>
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <Button
                  variant="plain"
                  color="black"
                  _hover={{ bg: "gray.200" }}
                  borderRadius={"full"}
                >
                  <FaBell />
                </Button>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>Notifications</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <VStack>
                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          whiteSpace="normal"
                          maxW="100%"
                          h="100%"
                          py="3"
                        >
                          🔔 You have a new Notification!
                        </Button>
                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          whiteSpace="normal"
                          maxW="100%"
                          h="100%"
                          py="3"
                        >
                          🔔 You have a new Notification!
                        </Button>
                      </VStack>
                    </Drawer.Body>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>

            <Button
              colorPalette="red"
              variant="outlined"
              color="red"
              _hover={{ bg: "black", color: "white" }}
              fontSize="md"
              boxShadow={"lg"}
              as="a"
              href="/StudentExamCard"
            >
              Start Exam
            </Button>

            <Drawer.Root>
              <Drawer.Trigger asChild>
                <Button
                  colorPalette="red"
                  variant="solid"
                  color="white"
                  _hover={{ bg: "black", color: "white" }}
                  fontSize="lg"
                  boxShadow={"lg"}
                >
                  <FaBars />
                </Button>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title></Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <VStack align="stretch" spacing={2}>
                      <Image src="/BQA-Logo.png" alt="BQA Logo" mx={"auto"} boxSize={"28"} mb={4} />
                      <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          fontWeight="bold"
                          w="full"
                          as="a"
                          href="/"
                        >
                          <AiOutlineDashboard size={20} />
                          Dashboard
                        </Button>

                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          fontWeight="bold"
                          w="full"
                          as="a"
                          href="/StudentExamCard"
                        >
                          <AiOutlineBook size={20} />
                          My Exams
                        </Button>

                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          fontWeight="bold"
                          w="full"
                          as="a"
                          href="/AboutUsPage"
                        >
                          <AiOutlineInfoCircle size={20} />
                          About Us
                        </Button>

                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          fontWeight="bold"
                          w="full"
                        >
                          <AiOutlinePhone size={20} /> Contact Us
                        </Button>

                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          fontWeight="bold"
                          w="full"
                          as="a"
                          href="/account"
                        >
                          <AiOutlineUser size={20} />
                          Account
                        </Button>

                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          fontWeight="bold"
                          colorPalette="red"
                          w="full"
                        >
                          <AiOutlineLogout size={20} />
                          Logout
                        </Button>
                      </VStack>
                    </Drawer.Body>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </HStack>
        </Flex>
      </Box>
    </div>
  );
}