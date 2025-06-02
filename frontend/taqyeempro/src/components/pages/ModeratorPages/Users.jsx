  import { Box, Button, Flex, Text } from "@chakra-ui/react";
  import React from "react";
  import { DataGrid } from "@mui/x-data-grid";
  import { AiOutlineUpload } from "react-icons/ai";
  import { IoMdAdd } from "react-icons/io";

  export default function Users() {
    // Sample data
    const columns = [
      { field: "id", headerName: "No.", width: 65 },
      { field: "firstName", headerName: "First Name", width: 150 },
      { field: "lastName", headerName: "Last Name", width: 150 },
      { field: "email", headerName: "Email", width: 270 },
      { field: "school", headerName: "School", width: 270 },
      { field: "type", headerName: "Type", width: 140 },
      { field: "action", headerName: "Action", width: 70},
    ];

    const rows = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
      },
      {
        id: 3,
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@example.com",
      },
      {
        id: 4,
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.davis@example.com",
      },
    ];

    return (
      <Box maxW="6xl" mx="auto" mt={3} px={4}>
        <Flex justify="space-between" align="center" mb={7}>
          <Text fontSize="3xl" fontWeight="bold">
            System Users
          </Text>

          {/* Aligning buttons to the right */}
          <Flex gap={2}>
            <Button colorPalette={"red"} _hover={{ bg: "black" }}><AiOutlineUpload/> Create Users</Button>
            <Button colorPalette={"red"} _hover={{ bg: "black" }}><IoMdAdd/> Register A User</Button>
          </Flex>
        </Flex>

        {/* DataGrid */}
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
          />
        </div>
      </Box>
    );
  }
