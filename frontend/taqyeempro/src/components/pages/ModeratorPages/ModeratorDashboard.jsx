import React from "react";
import {
  Box,
  VStack,
  Heading,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { LuDollarSign } from "react-icons/lu";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import UploadSpecifications from "./UploadSpecifications";

// Register chart elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function ModeratorDashboard() {
  // Sample Pie Chart Data
  const pieData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Submissions",
        data: [300, 100, 80],
        backgroundColor: ["#3182CE", "#ECC94B", "#E53E3E"],
        borderWidth: 1,
      },
    ],
  };

  // Sample Bar Chart Data
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Monthly Exams",
        data: [40, 55, 75, 60, 90],
        backgroundColor: "#3182CE",
      },
    ],
  };

  return (
    <Box p={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} columnGap={5} rowGap={5}>
        <VStack colSpan={{ base: 1, md: 1 }} rowGap={5}>
          {/* Total Exams Box */}
          <Box
            bg="white"
            p={7}
            rounded="md"
            w={"full"}
            borderWidth="1px"
            h={"full"}
            textAlign="center"
          >
            <Heading fontSize={24} fontWeight="bold" color="gray.600">
              Total Exams
            </Heading>
            <Heading py={3} fontSize={38} fontWeight="bold" my={2}>
              4.2K
            </Heading>
          </Box>

          {/* Total Students Box */}
          <Box
            bg="white"
            p={7}
            w={"full"}
            h={"full"}
            rounded="md"
            borderWidth="1px"
            textAlign="center"
          >
            <Heading fontSize={24} fontWeight="bold" color="gray.600">
              Total Students
            </Heading>
            <Heading py={3} fontSize={38} fontWeight="bold" my={2}>
              8K
            </Heading>
          </Box>
        </VStack>

        <Box
          bg="white"
          p={7}
          rounded="md"
          borderWidth="1px"
          textAlign="center"
          colSpan={{ base: 1, md: 3 }}
        >
          <Heading fontSize={24} fontWeight="bold" color="gray.600">
            Submission Breakdown
          </Heading>
          <Box display="flex" justifyContent="center" height={"xs"} mt={4}>
            <Pie data={pieData} />
          </Box>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} columnGap={5} rowGap={5}>
        {/* Monthly Exams Bar Chart */}
        <Box
          bg="white"
          my={5}
          p={7}
          rounded="md"
          borderWidth="1px"
          textAlign="center"
        >
          <Heading fontSize={24} fontWeight="bold" color="gray.600">
            Monthly Exams
          </Heading>
          <Box display="flex" justifyContent="center" mt={4}>
            <Bar data={barData} height={150} />
          </Box>
        </Box>
        <SimpleGrid my={5} textAlign="center" rowGap={5}>
          <UploadSpecifications />

          <Button
            w={"full"}
            h={"full"}
            fontWeight={"bold"}
            fontSize={"lg"}
            variant={"subtle"}
            colorPalette={"blue"}
            as={"a"}
            href="generated-questions"
          >
            Generated Questions
          </Button>
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
