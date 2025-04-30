import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Text,
  CloseButton,
  Drawer,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { FaBars, FaBell } from "react-icons/fa";

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
                        <Button w={"full"} variant="plain" textAlign={"left"}>Cancel</Button>
                        <Button w={"full"} variant="outlined">Save</Button>
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
                      <Drawer.Title>Menu</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <VStack>
                        <Button w={"full"}>Cancel</Button>
                        <Button w={"full"}>Save</Button>
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
