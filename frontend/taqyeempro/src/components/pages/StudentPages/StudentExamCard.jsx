import React from 'react';
import { Flex, Text, Box, Image } from '@chakra-ui/react';

const StudentExamCard = ({ level, grade, bgColor, image, quizStatus, date }) => {
  return (
    <Box position="relative">
      {/* Header */}
      <Flex justify="space-between" px="96px" py="16px">
        <Text 
          fontFamily="'Newsreader', sans-serif" 
          fontSize="64px" 
          lineHeight="120%"
          letterSpacing="-0.02em"
        >
          My Exams
        </Text>
        <Text fontSize="20px" color="#000000" alignSelf="flex-end">
          3 items
        </Text>
      </Flex>

      {/* Exam Card */}
      <Box
        position="absolute"
        left="96px"
        right="666px"
        height="159px"
        top={date}
        background="#FAFAF5"
        border="2px solid #E6E6E6"
        borderRadius="24px"
      >
        <Text position="absolute" left="184px" top="24px" fontFamily="Inter" fontWeight="600" fontSize="20px">
          Level - 9 {level}
        </Text>

        <Text position="absolute" right="24px" top="24px" fontFamily="Inter" fontWeight="600" fontSize="20px" textAlign="right">
          Grade: 30/30 {grade}
        </Text>

        <Box
          position="absolute"
          width="199px"
          height="40px"
          left="184px"
          bottom="24px"
          background= "#2DFF02"
          border="2px solid rgba(0,0,0,0.06)"
          borderRadius="20px"
        />

        <Text
          position="absolute"
          left="234px"
          top="calc(50% + 35px - 10.5px)"
          fontFamily="Inter"
          fontWeight="600"
          fontSize="16px"
          display="flex"
          alignItems="center"
          marginLeft= "25px"
        >
          OPEN {quizStatus}
        </Text>

        <Image
          src='image1.png'
          alt=""
          position="absolute"
          width="140px"
          height="121px"
          left="10px"
          top="19px"
        />
      </Box>
    </Box>
  );
};

export default StudentExamCard;
