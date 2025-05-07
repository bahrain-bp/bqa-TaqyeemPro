import { 
  Box, 
  Text, 
  Button, 
  Flex, 
  Image, 
  Grid, 
  GridItem, 
  IconButton, 
  Tooltip 
} from '@chakra-ui/react';

export default function Account() {
  return (
    <Box bg="gray.50" p={8}>
      {/* Header */}
      <Box 
        bg="white" 
        borderRadius="md" 
        p={6} 
        mb={8}
        color="black"
        boxShadow="md"
      >
        <Flex align="center">
          {/* <Image 
            src="/profile.jpg" 
            alt="Profile" 
            boxSize="80px" 
            borderRadius="full" 
            mr={4}
          /> */}
          <Box color="black" >
            <Text 
              fontWeight="bold" 
              fontSize="xl"
              
            >
              Ebrahim Ali
            </Text>
            <Text color="gray.600">Student</Text>
            <Text color="gray.600">Manama secondary School </Text>
          </Box>
        </Flex>
      </Box>

      {/* Personal Information */}
      <Box 
        bg="white" 
        borderRadius="md" 
        p={6} 
        mb={8}
        color="black"
        boxShadow="md"

      >
        <Flex justify="space-between" mb={4}>
          <Text fontWeight="bold" fontSize="lg">Personal Information</Text>
          <Button 
            size="sm" 
            colorScheme="orange" 
          >
            Edit
          </Button>
        </Flex>

        <Grid 
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} 
          gap={4}
          color="black"
        >
          <GridItem>
            <Text>First Name</Text>
            <Text fontWeight="bold">Ebrahim</Text>
          </GridItem>
          <GridItem>
            <Text>Last Name</Text>
            <Text fontWeight="bold">Ali</Text>
          </GridItem>
          <GridItem>
            <Text>Date of Birth</Text>
            <Text fontWeight="bold">15-10-2003</Text>
          </GridItem>
          <GridItem>
            <Text>Email Address</Text>
            <Text fontWeight="bold">202103293@stu.uob.edu.bh</Text>
          </GridItem>
          <GridItem>
            <Text>Phone Number</Text>
            <Text fontWeight="bold">(+973) 33928495</Text>
          </GridItem>

        </Grid>
      </Box>

      {/* Address */}
      <Box 
        bg="white" 
        borderRadius="md" 
        p={6}
        color="black"
        boxShadow="md"

      >
        <Flex justify="space-between" mb={4}>
          <Text fontWeight="bold" fontSize="lg">Address</Text>
          <Button 
            size="sm" 
            colorScheme="gray" 
          >
            Edit
          </Button>
        </Flex>

        <Grid 
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} 
          gap={4}
        >
          <GridItem>
            <Text>Country</Text>
            <Text fontWeight="bold">Bahrain</Text>
          </GridItem>
          <GridItem>
            <Text>City</Text>
            <Text fontWeight="bold">Manama</Text>
          </GridItem>
          <GridItem>
            <Text>School Name</Text>
            <Text fontWeight="bold">Manama secondary School </Text>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
