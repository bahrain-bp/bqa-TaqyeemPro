import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { getUserFromToken } from "../../../utils/decodeJWT";

export default function StudentExamCard() {
  const [exams, setExams] = useState([]);
  const [stats, setStats] = useState({
    completed: 0,
    invalid: 0,
    open: 0,
    ratio: 0
  });

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const user = getUserFromToken();
        if (!user) throw new Error('User not authenticated');

        const { sub: studentId, grade: gradeLevel } = user;

        const response = await fetch(`harn:aws:execute-api:us-east-1:666053140928:kjww415dkc/*/POST/invokeFunction?grade=${gradeLevel}&studentId=${studentId}`);
        const data = await response.json();

        setExams(data);

        const completed = data.filter(e => e.status === 'completed').length;
        const invalid = data.filter(e => e.status === 'invalid').length;
        const open = data.filter(e => e.status === 'open').length;
        const total = data.length;
        const ratio = total ? Math.round((completed / total) * 100) : 0;

        setStats({ completed, invalid, open, ratio });
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  return (
    <Box minH="100vh" px={{ base: 8, lg: 24 }}>
      <Flex mt={12} mb={8} borderBottom="2px solid #E6E6E6" pb={4} alignItems="center">
        <Text fontFamily="'YourPreferredFont'" color="black" fontSize={{ base: '5xl', md: '7xl' }} lineHeight="shorter" mr={1}>
          My Exams
        </Text>
        <Text fontFamily="'YourPreferredFont'" fontSize={{ base: '1xl', md: '3xl' }} color="black" paddingLeft={11} paddingTop={18} whiteSpace="nowrap">
          {exams.length} items
        </Text>
      </Flex>

      <Flex mt={12} gap={{ base: 8, md: 16 }} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
        {/* Exam Cards */}
        <Box w={{ base: 'full', md: '70%' }} maxW="1200px">
          {exams.map((exam, index) => (
            <ExamCard
              key={index}
              title={exam.title}
              grade={exam.score}
              date={exam.date}
              status={exam.status}
              imageSrc={exam.imageSrc || `/l${index + 1}.png`}
            />
          ))}
        </Box>

        {/* Summary Card */}
        <Box w={{ base: 'full', md: '30%' }} maxW="400px" bg="#FAFAF5" p={8} borderRadius="lg" boxShadow="md">
          <Text fontWeight="bold" color="black" fontSize="xl" mb={4}>Student Performance:</Text>

          <Flex direction="column" gap={2} mb={8} color="black">
            <PerformanceItem label="Completed:" value={stats.completed} />
            <PerformanceItem label="Not Valid:" value={stats.invalid} />
            <PerformanceItem label="Open Now:" value={stats.open} />
          </Flex>

          <Flex justify="space-between" mb={8}>
            <Text fontWeight="bold" color="black" fontSize="lg">Performance ratio:</Text>
            <Text fontWeight="bold" fontSize="lg" color="#426B1F">{stats.ratio}%</Text>
          </Flex>

          <Button
            bg="#426B1F"
            color="white"
            w="full"
            h="12"
            _hover={{ bg: "#3A5C19" }}
            as="a"
            href="/StudentExamPage"
          >
            OPEN EXAM →
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

const ExamCard = ({ title, grade, date, status }) => (
  <Box bg="white" p={8} borderRadius="lg" mb={8} boxShadow="md">
    <Flex align="center" gap={8}>
      <Box>
        <Text fontWeight="bold" color="black" fontSize="xl">{title}</Text>
        <Text color="black" mb={2}>DATE: {date}</Text>
        <Text fontWeight="bold" color="black" fontSize="lg">Grade: {grade}</Text>
      </Box>
    </Flex>

    <Button
      color="black"
      as={status === 'open' ? Link : undefined}
      to={status === 'open' ? '/StudentExamPage' : undefined}
      mt={4}
      w="full"
      h="10"
      borderRadius="full"
      bg={
        status === 'completed' ? '#2DFF02' :
        status === 'invalid' ? '#FF0202' :
        '#E4F5E1'
      }
      _hover={{
        bg:
          status === 'completed' ? '#22CC00' :
          status === 'invalid' ? '#CC0000' :
          '#D0F0D0'
      }}
    >
      {status === 'completed' ? 'COMPLETED' :
        status === 'invalid' ? 'NOT VALID' :
        'OPEN NOW'}
    </Button>
  </Box>
);

const PerformanceItem = ({ label, value }) => (
  <Flex justify="space-between" align="center">
    <Text>{label}</Text>
    <Text>{value}</Text>
  </Flex>
);
