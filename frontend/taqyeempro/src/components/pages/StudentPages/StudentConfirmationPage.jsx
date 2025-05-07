import { 
  Box, 
  Text, 
  Button, 
  Flex, 
  Image, 
  Stack, 
  HStack, 
  VStack, 
  Icon 
} from '@chakra-ui/react';

export default function StudentConfirmationPage() {
  return (
    <Box bg="white" minH="100vh" px={{ base: 8, lg: 24 }}>
      {/* Header */}
      
      {/* Page Heading */}
      <Flex 
        mt={12} 
        mb={8} 
        borderBottom="2px solid #E6E6E6" 
        pb={4}
      >
        <Text 
          fontFamily="'YourPreferredFont'"
          fontSize={{ base: '4xl', md: '6xl' }} 
          color="black"
          lineHeight="shorter"
        >
          Maths for Grade 9
        </Text>
        <Text 
          ml="auto" 
          fontSize={{ base: 'xl', md: '2xl' }} 
          color="#000000"
        >
          Date — April 10, 2025
        </Text>
      </Flex>

      {/* Main Content */}
      <Flex 
        mt={12} 
        gap={{ base: 8, md: 16 }}
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
      >
        {/* Confirmation Card */}
        <Box 
          w={{ base: 'full', md: '70%' }} 
          maxW="800px"
        >
          <Box 
            bg="#FAFAF5" 
            p={8} 
            borderRadius="lg" 
            boxShadow="md"
          >
            <Text 
              fontWeight="bold" 
              fontSize={{ base: '3xl', md: '6xl' }} 
              textAlign="center"
              mb={8}
              color="#000000"
            >
              ARE YOU SURE TO SUBMIT THE QUIZ:
            </Text>

            <Button 
              bg="#426B1F" 
              color="white" 
              w="full" 
              h="12" 
              _hover={{ bg: "#3A5C19" }}
              mb={8}
              as="a"
              href="/StudentQuitPage"
            >
              YES
            </Button>
          </Box>
        </Box>

        {/* Summary Card */}
        <Box 
          w={{ base: 'full', md: '30%' }} 
          maxW="400px" 
          bg="#FAFAF5" 
          p={8} 
          borderRadius="lg"
          boxShadow="md"
        >
          <Text 
            fontWeight="bold" 
            fontSize="xl" 
            mb={4}
            color="#000000"
          >
            Maths for Grade 9
          </Text>

          <Stack 
            direction="column" 
            spacing={2} 
            mb={8}
            color="#000000"
          >
            <SummaryItem label="Total Question:" value="10" />
            <SummaryItem label="Answered:" value="10" />
            <SummaryItem label="Not Answered:" value="0" />
            <SummaryItem label="Complete ratio:" value="100%" />
          </Stack>

          <Button 
            bg="#426B1F" 
            color="white" 
            w="full" 
            h="12" 
            _hover={{ bg: "#3A5C19" }}
            rightIcon={<Icon boxSize={4} path="M9 12H15" />}
            as="a"
            href="/StudentQuitPage"
          >
            SUBMIT QUIZ
          </Button>
        </Box>
      </Flex>

      {/* New Go Back Button */}
      <Box mt={12} textAlign="center">
        <Button 
          bg="white" 
          border="1px solid #426B1F" 
          color="#426B1F" 
          px={8} 
          py={4} 
          borderRadius="md"
          _hover={{ bg: "#E4F5E1" }}
          as="a"
          href="/StudentExamPage" // Replace with actual route
        >
          GO BACK TO EXAM
        </Button>
      </Box>
    </Box>
  );
};

const SummaryItem = ({ label, value }) => {
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