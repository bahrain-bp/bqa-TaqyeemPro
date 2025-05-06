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
//   import StudentPopupMessages from './StudentPopupMessages';

  export default function StudentQuitPage() {
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
            lineHeight="shorter"
            color="#000000"
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

                {/* <StudentPopupMessages
                type="success"
                message="Account created successfully!"
                onClose={() => setShow(false)}
                /> */}
              <Text 
                fontWeight="bold" 
                fontSize={{ base: '3xl', md: '6xl' }} 
                textAlign="center"
                mb={8}
                color="black"
              >
                Great Work Good Luck..
              </Text>
  
              <Button 
                bg="#426B1F" 
                color="white" 
                w="full" 
                h="12" 
                _hover={{ bg: "#3A5C19" }}
                mb={8}
                as="a"
                href="/"
              >
                QUIT
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    );
  };