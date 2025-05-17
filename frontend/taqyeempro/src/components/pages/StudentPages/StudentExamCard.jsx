  import { Box, Text, Button, Flex, Image } from '@chakra-ui/react';
  import { Link } from 'react-router-dom';

  export default function StudentExamCard () {
    return (
      <Box minH="100vh" px={{ base: 8, lg: 24 }}>
        {/* Header */}


        {/* Page Heading */}
        <Flex 
          mt={12} 
          mb={8} 
          borderBottom="2px solid #E6E6E6" 
          pb={4}
          alignItems="center"
        >
          <Text 
            fontFamily="'YourPreferredFont'"
            color="black" 
            fontSize={{ base: '5xl', md: '7xl' }} 
            lineHeight="shorter"
            mr={1}
          >
            My Exams
          </Text>
          <Text 
            fontFamily="'YourPreferredFont'"
            fontSize={{ base: '1xl', md: '3xl' }} 
            color="black"
            paddingLeft={11}
            paddingTop={18}
            whiteSpace="nowrap"
          >
            3 items
          </Text>
        </Flex>

        {/* Main Content */}
        <Flex 
          mt={12} 
          gap={{ base: 8, md: 16 }}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
          {/* Exam Cards */}
          <Box 
            w={{ base: 'full', md: '70%' }} 
            maxW="1200px"
          >
            <ExamCard 
              title="Arabic for Grade 12" 
              grade="30/30" 
              date="14/4/2025" 
              status="completed"
              imageSrc="/l1.png"
            />
            <ExamCard 
              title="Science for Grade 3" 
              grade="0/30" 
              date="22/7/2025" 
              status="invalid"
              imageSrc="/l2.png"
            />
            <ExamCard 
              title="Maths for Grade 9" 
              grade="--/30" 
              date="13/12/2025" 
              status="open"
              imageSrc="/l3.png"
            />
          </Box>

          {/* Summary Card */}
          <Box 
            w={{ base: 'full', md: '30%' }} 
            maxW="400px" 
            bg="#FAFAF5" 
            p={58} 
            borderRadius="lg"
            boxShadow="md"
          >
            <Text 
              fontWeight="bold" 
              color="black" 
              fontSize="xl" 
              mb={4}
            >
              Student Performance:
            </Text>

            <Flex 
              direction="column" 
              gap={2} 
              mb={8}
              color="black" 

            >
              <PerformanceItem label="Completed:" value="1" />
              <PerformanceItem label="Not Valid:" value="1" />
              <PerformanceItem label="Open Now:" value="1" />
            </Flex>

            <Flex 
              justify="space-between" 
              mb={8}
            >
              <Text 
                fontWeight="bold" 
                color="black" 
                fontSize="lg"
              >
                Performance ratio:
              </Text>
              <Text 
                fontWeight="bold" 
                fontSize="lg" 
                color="#426B1F"
              >
                43%
              </Text>
            </Flex>

            <Button 
              bg="#426B1F" 
              color="white" 
              w="full" 
              h="12" 
              _hover={{ bg: "#3A5C19" }}
            >
              OPEN EXAM →
            </Button>
          </Box>
        </Flex>
      </Box>
    );
  };

  const ExamCard = ({ title, grade, date, status }) => {
    return (
      <Box 
        bg="white" 
        p={8} 
        borderRadius="lg" 
        mb={8}
        boxShadow="md"
      >
        <Flex 
          align="center" 
          gap={8}
        >


          <Box>
            <Text 
              fontWeight="bold" 
              color="black" 
              fontSize="xl"
            >
              {title}
            </Text>
            <Text 
            color="black" 
            mb={2}
            >
              DATE: {date}
            </Text>
            <Text 
              fontWeight="bold" 
              color="black" 
              fontSize="lg"
            >
              Grade: {grade}
            </Text>
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

  const PerformanceItem = ({ label, value }) => {
    return (
      <Flex 
        justify="space-between" 
        align="center"
      >
        <Text>{label}</Text>
        <Text>{value}</Text>
      </Flex>
    );
  };