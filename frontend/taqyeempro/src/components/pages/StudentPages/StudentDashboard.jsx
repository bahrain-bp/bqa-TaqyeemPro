import React, { useEffect, useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { fetchUserAttributes, getCurrentUser } from "@aws-amplify/auth";

export default function StudentDashboard() {
  const [userAttributes, setUserAttributes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();

        setUserAttributes(attributes);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttributes();
  }, []);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

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
    <Box pt="100px" px={5} minH="100vh">
      {/* Welcome Header */}
      <Box mb={10} textAlign="center">
        <Heading as="h1" size="xl" color="blue.800">
          Welcome, {userAttributes.given_name}
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Track your exams and progress
        </Text>
      </Box>

      {/* BQA Footer Note */}
      <Box mt={20} textAlign="center" color="gray.500" fontSize="sm">
        <Text>
          هيئة جودة التعليم والتدريب | Education & Training Quality Authority
        </Text>
        <Text>Kingdom of Bahrain - مملكة البحرين</Text>
      </Box>
    </Box>
  );
}
