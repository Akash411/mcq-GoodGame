import React from 'react';

const QuestionTracker = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className="question-tracker">
      <p>Question {currentQuestion + 1} of {totalQuestions}</p>
    </div>
  );
};

export default QuestionTracker;
