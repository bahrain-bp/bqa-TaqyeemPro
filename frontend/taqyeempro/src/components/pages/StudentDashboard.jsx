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
  Progress
} from "@chakra-ui/react";

// Mock data for the dashboard
const upcomingExams = [
  {
    id: 1,
    name: "Algebra Midterm",
    date: "2023-11-15",
    duration: "60 mins",
    status: "upcoming",
    progress: 0
  },
  {
    id: 2,
    name: "Geometry Quiz",
    date: "2023-11-20",
    duration: "30 mins",
    status: "upcoming",
    progress: 0
  }
];

const recentResults = [
  {
    id: 1,
    name: "Calculus Test",
    date: "2023-11-05",
    score: 85,
    total: 100,
    status: "completed"
  },
  {
    id: 2,
    name: "Trigonometry Quiz",
    date: "2023-11-01",
    score: 72,
    total: 100,
    status: "completed"
  }
];

export default function StudentDashboard() {
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

      {/* Dashboard Grid */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} maxW="1200px" mx="auto">
        {/* Upcoming Exams */}
        <Card bg="white" boxShadow="md" borderRadius="lg">
          <CardHeader>
            <Heading size="md">Upcoming Exams</Heading>
          </CardHeader>
          <CardBody>
            {upcomingExams.map((exam) => (
              <Box key={exam.id} mb={6} p={4} borderWidth="1px" borderRadius="md">
                <Flex justify="space-between" mb={2}>
                  <Text fontWeight="bold">{exam.name}</Text>
                  <Badge colorScheme="blue">{exam.status}</Badge>
                </Flex>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  {exam.date} • {exam.duration}
                </Text>
                <Progress value={exam.progress} size="xs" colorScheme="blue" />
                <Button mt={3} colorScheme="blue" size="sm" w="full">
                  View Details
                </Button>
              </Box>
            ))}
          </CardBody>
        </Card>

        {/* Recent Results */}
        <Card bg="white" boxShadow="md" borderRadius="lg">
          <CardHeader>
            <Heading size="md">Recent Results</Heading>
          </CardHeader>
          <CardBody>
            {recentResults.map((result) => (
              <Box key={result.id} mb={6} p={4} borderWidth="1px" borderRadius="md">
                <Flex justify="space-between" mb={2}>
                  <Text fontWeight="bold">{result.name}</Text>
                  <Badge colorScheme={result.score >= 70 ? "green" : "orange"}>
                    {result.status}
                  </Badge>
                </Flex>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Taken on {result.date}
                </Text>
                <Box mb={3}>
                  <Text display="inline-block" mr={2}>
                    Score: 
                  </Text>
                  <Text as="span" fontWeight="bold" color={result.score >= 70 ? "green.500" : "orange.500"}>
                    {result.score}/{result.total}
                  </Text>
                </Box>
                <Button mt={2} colorScheme="blue" size="sm" w="full">
                  Review Answers
                </Button>
              </Box>
            ))}
          </CardBody>
          <CardFooter>
            <Button variant="ghost" colorScheme="blue" w="full">
              View All Results
            </Button>
          </CardFooter>
        </Card>
      </SimpleGrid>

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