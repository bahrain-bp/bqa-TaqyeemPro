import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  SimpleGrid,
  Button,
  HStack,
  Text,
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
import GenerateQuestions from "./GenerateQuestions";
import { FaBook, FaCheck, FaQuestion, FaTimes, FaUserGraduate } from "react-icons/fa";

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
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const approvalCounts = {
    Approved: 0,
    Pending: 0,
    Rejected: 0,
  };

  questions.forEach((q) => {
    const state = q.approved;
    if (state === true) approvalCounts.Approved += 1;
    // else if (state === "Pending") approvalCounts.Pending += 1;
    else if (state === false) approvalCounts.Rejected += 1;
  });

  const gradeCounts = {};
  questions.forEach((q) => {
    const grade = q.grade;
    gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
  });

  const gradeBarData = {
    labels: Object.keys(gradeCounts),
    datasets: [
      {
        label: "Questions per Grade",
        data: Object.values(gradeCounts),
        backgroundColor: "#805AD5",
      },
    ],
  };

  const subjectCounts = {};
  questions.forEach((q) => {
    const subject = q.subject;
    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
  });

  const subjectPieData = {
    labels: Object.keys(subjectCounts),
    datasets: [
      {
        data: Object.values(subjectCounts),
        backgroundColor: ["#3182CE", "#38A169", "#ED8936", "#D53F8C"],
      },
    ],
  };

  const monthlyCounts = {};

  questions.forEach((q) => {
    const month = new Date(q["date & time"]).toLocaleString("default", {
      month: "short",
    });
    monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
  });

  const monthLabels = Object.keys(monthlyCounts);
  const monthData = Object.values(monthlyCounts);

  const monthlyLineData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Questions Submitted",
        data: monthData,
        fill: false,
        borderColor: "#2B6CB0",
        tension: 0.1,
      },
    ],
  };

  // Sample Pie Chart Data
  const pieData = {
    labels: ["Approved", "Rejected"],
    datasets: [
      {
        label: "Questions",
        data: [approvalCounts.Approved, approvalCounts.Rejected],
        backgroundColor: ["#3182CE", "#E53E3E"],
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
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
        {/* LEFT: 4 data boxes in a 2x2 grid */}
        <SimpleGrid columns={2} gap={5}>
          <Box
            bg="white"
            p={6}
            rounded="md"
            borderWidth="1px"
            textAlign="center"
          >
            <HStack justify="center" mb={2}>
              <FaQuestion />
              <Text fontSize="lg" fontWeight="bold" color="gray.600">
                Total Questions
              </Text>
            </HStack>
            <Heading fontSize="3xl">
              {loading ? "..." : questions.length}
            </Heading>
          </Box>

          <Box
            bg="white"
            p={6}
            rounded="md"
            borderWidth="1px"
            textAlign="center"
          >
            <HStack justify="center" mb={2}>
              <FaCheck />
              <Text fontSize="lg" fontWeight="bold" color="gray.600">
                Approved
              </Text>
            </HStack>
            <Heading fontSize="3xl">
              {loading ? "..." : approvalCounts.Approved}
            </Heading>
          </Box>

          <Box
            bg="white"
            p={6}
            rounded="md"
            borderWidth="1px"
            textAlign="center"
          >
            <HStack justify="center" mb={2}>
              <FaTimes />
              <Text fontSize="lg" fontWeight="bold" color="gray.600">
                Rejected
              </Text>
            </HStack>
            <Heading fontSize="3xl">
              {loading ? "..." : approvalCounts.Rejected}
            </Heading>
          </Box>

          <Box
            bg="white"
            p={6}
            rounded="md"
            borderWidth="1px"
            textAlign="center"
          >
            <HStack justify="center" mb={2}>
              <FaBook />
              <Text fontSize="lg" fontWeight="bold" color="gray.600">
                Subjects Covered
              </Text>
            </HStack>
            <Heading fontSize="3xl">
              {loading ? "..." : Object.keys(subjectCounts).length}
            </Heading>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={1} gap={5}>
          <SimpleGrid flex="1" bg="gray.50" h={"32"} borderRadius="md">
            <UploadSpecifications />
          </SimpleGrid>
          <SimpleGrid flex="1" bg="gray.50" h={"32"} borderRadius="md">
            <GenerateQuestions />
          </SimpleGrid>
        </SimpleGrid>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} columnGap={5}>
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
            Question Breakdown
          </Heading>
          <Box display="flex" justifyContent="center" mt={4}>
            {loading ? (
              <Heading size="md" mt={4}>
                Loading...
              </Heading>
            ) : (
              <Bar data={gradeBarData} />
            )}
          </Box>
        </Box>
        <Box
          bg="white"
          rounded="md"
          borderWidth="1px"
          textAlign="center"
          my={5}
          p={7}
        >
          <Heading fontSize={24} fontWeight="bold" color="gray.600">
            Question Breakdown
          </Heading>
          <Box display="flex" justifyContent="center" height={"xs"} mt={4}>
            {loading ? (
              <Heading size="md" mt={4}>
                Loading...
              </Heading>
            ) : (
              <Pie data={pieData} />
            )}
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
