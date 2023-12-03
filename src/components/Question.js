import React, { useState, useEffect } from 'react';

const Question = ({ question, options, handleAnswerClick, selectedAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer || '');
  const [answerSelected, setAnswerSelected] = useState(false);

  useEffect(() => {
    setSelectedOption(selectedAnswer);
    setAnswerSelected(selectedAnswer !== '');
  }, [selectedAnswer]);

  const handleOptionSelect = (option) => {
    if (!answerSelected) {
      setSelectedOption(option);
      setAnswerSelected(true);
      handleAnswerClick(option);
    }
  };

  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={selectedOption === option ? 'selected' : ''}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;