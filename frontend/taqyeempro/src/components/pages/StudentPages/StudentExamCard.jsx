import { Box, Text, Button, Flex, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// 🔁 Replace this with your actual JWT decoding logic
const getUserFromToken = () => {
  return {
    sub: 'student-123', // student ID
    grade: '9'         // get this from Cognito custom attribute
  };
};

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

        const { grade } = user;

        // 🚀 Fetch real data from Lambda API
        const response = await fetch(`https://knv1cln06e.execute-api.us-east-1.amazonaws.com/prod/ViewActiveExams?grade=${grade}`);
        const data = await response.json();

        // 🧹 Transform DynamoDB records into UI-friendly format
        const transformedExams = data.map((exam) => {
          const score = parseInt(exam.grade) || 0;
          let status = 'open';

          if (score === 30) status = 'completed';
          else if (score === 0) status = 'invalid';

          return {
            title: exam.examTitle || 'Untitled Exam',
            score: `${score}/30`,
            date: exam.creationDate || 'N/A',
            status,
            imageSrc: `/l${Math.floor(Math.random() * 4) + 1}.png` // Optional placeholder images
          };
        });

        setExams(transformedExams);

        // 📊 Update stats
        const completed = transformedExams.filter(e => e.status === 'completed').length;
        const invalid = transformedExams.filter(e => e.status === 'invalid').length;
        const open = transformedExams.filter(e => e.status === 'open').length;
        const total = transformedExams.length;
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
          {exams.length === 0 ? (
            <Text color="gray.500">No active exams found.</Text>
          ) : (
            exams.map((exam, index) => (
              <ExamCard
                key={index}
                title={exam.title}
                grade={exam.score}
                date={exam.date}
                status={exam.status}
                imageSrc={exam.imageSrc}
              />
            ))
          )}
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
            as={Link}
            to="/StudentExamPage"
          >
            OPEN EXAM →
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

// ✅ Individual Exam Card Component
const ExamCard = ({ title, grade, date, status }) => {
  return (
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
};

// ✅ Stats Item Component
const PerformanceItem = ({ label, value }) => (
  <Flex justify="space-between" align="center">
    <Text>{label}</Text>
    <Text>{value}</Text>
  </Flex>
);


//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================


// import { Box, Heading, Text, VStack, Card } from '@chakra-ui/react';
// import { useEffect, useState } from 'react';
// import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth';

// // 🔐 Function to get student's grade from Cognito
// const getStudentGrade = async () => {
//   try {
//     const currentUser = await getCurrentUser();
//     const session = await fetchAuthSession();
//     const idToken = session.tokens?.idToken;

//     // Get custom:grade attribute
//     const grade = currentUser.attributes['custom:grade'] || 'N/A';
//     console.log('Student Grade:', grade);
//     return grade;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return null;
//   }
// };

// const StudentExamCard = () => {
//   const [exams, setExams] = useState([]);
//   const [studentGrade, setStudentGrade] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🟢 Step 1: Fetch student grade when component mounts
//   useEffect(() => {
//     const fetchStudentGrade = async () => {
//       const grade = await getStudentGrade();
//       setStudentGrade(grade);
//     };

//     fetchStudentGrade();
//   }, []);

//   // 🟢 Step 2: Fetch exams based on student grade
//   useEffect(() => {
//     const fetchExams = async () => {
//       if (!studentGrade) {
//         console.warn("Student grade not available");
//         setLoading(false);
//         return;
//       }

//       try {
//         const url = `https://knv1cln06e.execute-api.us-east-1.amazonaws.com/prod/ViewActiveExams?grade=${studentGrade}`;
//         console.log('Fetching from:', url);

//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const text = await response.text();
//         let data = [];

//         try {
//           data = JSON.parse(text);
//         } catch (parseError) {
//           throw new Error('Failed to parse JSON');
//         }

//         console.log('Fetched Exams:', data);
//         setExams(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error('Error fetching exams:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExams();
//   }, [studentGrade]);

//   return (
//     <Box p={6}>
//       <Heading size="lg" mb={4}>
//         My Active Exams
//       </Heading>

//       {/* Show loading */}
//       {loading && <Text color="gray.500">Loading...</Text>}

//       {/* Show message if no exams found */}
//       {!loading && exams.length === 0 && (
//         <Text color="gray.500">No active exams found.</Text>
//       )}

//       {/* Render exam cards */}
//       {!loading && exams.length > 0 && (
//         exams.map((exam, index) => (
//           <Card key={index} bg="white" p={5} mb={4} shadow="sm">
//             <VStack align="start" spacing={2}>
//               <Text fontSize="md" fontWeight="bold">
//                 Subject:{' '}
//                 <Text as="span" fontWeight="normal">
//                   {exam.subject || 'N/A'}
//                 </Text>
//               </Text>
//               <Text fontSize="md" fontWeight="bold">
//                 Title:{' '}
//                 <Text as="span" fontWeight="normal">
//                   {exam.examTitle || 'Untitled Exam'}
//                 </Text>
//               </Text>
//               <Text fontSize="md" fontWeight="bold">
//                 Description:{' '}
//                 <Text as="span" fontWeight="normal">
//                   {exam.examDescription || 'No description available.'}
//                 </Text>
//               </Text>
//               <Text fontSize="md" fontWeight="bold">
//                 Duration:{' '}
//                 <Text as="span" fontWeight="normal">
//                   {typeof exam.duration === 'number' ? `${exam.duration} minutes` : 'Unknown'}
//                 </Text>
//               </Text>
//               <Text fontSize="md" fontWeight="bold">
//                 Grade Level:{' '}
//                 <Text as="span" fontWeight="normal">
//                   {exam.grade || 'N/A'}
//                 </Text>
//               </Text>
//             </VStack>
//           </Card>
//         ))
//       )}
//     </Box>
//   );
// };

// export default StudentExamCard;