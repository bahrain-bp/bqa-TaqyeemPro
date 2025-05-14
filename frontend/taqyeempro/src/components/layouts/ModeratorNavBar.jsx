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
  Image,
} from "@chakra-ui/react";
import { FaBars, FaBell } from "react-icons/fa";
import {
  AiOutlineBook,
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineDashboard,
  AiOutlineOrderedList,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { RiBookShelfLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import { signOut } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { getConfigByRole } from '@/auth/amplifyConfig'; 
import { useNavigate } from "react-router-dom";


export default function ModeratorNavBar() {
  const navigate = useNavigate(); 

  const handleSignOut = async () => {
    try {
      // retrieve the role from the session
      const role = sessionStorage.getItem('userRole');
      // Map to the user pool
      Amplify.configure(getConfigByRole(role)); 
      await signOut();

      sessionStorage.removeItem("userRole");
      alert("Signed out successfully.");
      window.location.reload(); // <-- force App to reload and show NonUserRoutes
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };    
  
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
                        <Image
                          src="/BQA-Logo.png"
                          alt="BQA Logo"
                          mx={"auto"}
                          boxSize={"28"}
                          mb={4}
                        />
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
                          href="/generated-questions"
                        >
                          <AiOutlineOrderedList size={20} />
                          Generated Questions
                        </Button>
                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          fontWeight="bold"
                          w="full"
                          as="a"
                          href="/reports"
                        >
                          <AiOutlineBook size={20} />
                          Reports
                        </Button>

                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          fontWeight="bold"
                          w="full"
                          as="a"
                          href="/exams"
                        >
                          <RiBookShelfLine size={20} />
                          Exams
                        </Button>

                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          textAlign="left"
                          fontWeight="bold"
                          w="full"
                          as="a"
                          href="/users"
                        >
                          <AiOutlineUsergroupAdd size={20} />
                          Users
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
                          onClick={handleSignOut}
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
