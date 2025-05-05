import React from 'react';
import StudentExamCard from './StudentExamCard';

const StudentExamHistory = () => {
  return (
    <div>
      <ExamCard
        level="MATHS LEVEL-1"
        grade="30/30"
        bgColor="#2DFF02"
        image="image1.png"
        quizStatus="Quiz Completed"
        date={{ top: '301px' }}
      />
      <ExamCard
        level="MATHS LEVEL-9"
        grade="0/30"
        bgColor="#FF0202"
        image="image2.png"
        quizStatus="Quiz Completed"
        date={{ top: '491px' }}
      />
      <ExamCard
        level="MATHS LEVEL-11"
        grade="--/30"
        bgColor="#E4F5E1"
        image="image3.png"
        quizStatus="Quiz Completed"
        date={{ top: '681px' }}
      />

      <ExamCard
        level="MATHS LEVEL-11"
        grade="--/30"
        bgColor="#E4F5E1"
        image="image3.png"
        quizStatus="Quiz Completed"
        date={{ top: '681px' }}
      />

      
    </div>

    
  );
};

export default StudentExamHistory;
