import React from 'react';
import { Box, Heading, Text, Button, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
      py={12}
    >
      <Center
        w="full"
        p={10}
        textAlign="center"
      >
        <Box>
          <Heading as="h1" size="6xl" fontWeight={"bold"} color="red.500" mb={4}>
            404
          </Heading>
          <Text fontSize="xl" color="gray.600" mb={6}>
            Oops! The page you're looking for doesn't exist.
          </Text>
          <Button
            as={Link}
            to="/"
            colorPalette="red"
            size="2xl"
            _hover={{ bg: 'black', color: 'white' }}
          >
            Go to Home
          </Button>
        </Box>
      </Center>
    </Box>
  );
}
