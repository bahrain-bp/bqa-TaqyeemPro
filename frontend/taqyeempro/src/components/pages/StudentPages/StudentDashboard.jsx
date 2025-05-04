import React from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Badge,
  Progress,
} from "@chakra-ui/react";

export default function StudentDashboard() {
  // ✅ بيانات الامتحانات القادمة
  const upcomingExams = [
    {
      id: 1,
      name: "Mathematics Final",
      date: "May 5, 2025",
      duration: "1.5 hours",
      status: "Scheduled",
      progress: 0,
    },
    {
      id: 2,
      name: "Science Quiz",
      date: "May 8, 2025",
      duration: "45 minutes",
      status: "Scheduled",
      progress: 0,
    },
  ];

  // ✅ بيانات النتائج الأخيرة
  const recentResults = [
    {
      id: 1,
      name: "History Midterm",
      date: "April 20, 2025",
      score: 82,
      total: 100,
      status: "Passed",
    },
    {
      id: 2,
      name: "English Grammar Test",
      date: "April 15, 2025",
      score: 65,
      total: 100,
      status: "Needs Improvement",
    },
  ];

  return (
    <Box pt="100px" px={5} bg="gray.50" minH="100vh">
      {/* Welcome Header */}
      <Box mb={10} textAlign="center">
        <Heading as="h1" size="xl" color="blue.800">
          Welcome, Ahmed
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Track your exams and progress
        </Text>
      </Box>



      {/* BQA Footer Note */}
      <Box mt={20} textAlign="center" color="gray.500" fontSize="sm">
        <Text>هيئة جودة التعليم والتدريب | Education & Training Quality Authority</Text>
        <Text>Kingdom of Bahrain - مملكة البحرين</Text>
      </Box>
    </Box>
  );
}
