import React from "react";
import { Box, Flex, HStack, Link, Button, Text } from "@chakra-ui/react";
import { FaBars, FaBell } from "react-icons/fa";

export default function ModeratorNavBar() {
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
            <Button 
              variant="plain"
              color="black"
              _hover={{ bg: "gray.200" }}
              borderRadius={"full"}>
              <FaBell />
            </Button>
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
          </HStack>
        </Flex>
      </Box>
    </div>
  );
}
