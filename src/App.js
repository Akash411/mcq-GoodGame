import React, { useState } from 'react';
import './App.css';
import Question from './components/Question';
import Score from './components/Score';
import QuestionTracker from './components/QuestionTracker';
import questionsData from './data/questions';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(questionsData.length).fill(''));

  const handleAnswerClick = (selectedOption) => {
    const updatedUserAnswers = [...userAnswers];
    const isCorrectAnswer = selectedOption === questionsData[currentQuestion].correctAnswer;
    const previouslyCorrect = userAnswers[currentQuestion] === questionsData[currentQuestion].correctAnswer;

    if (isCorrectAnswer && !previouslyCorrect) {
      setScore(score + 1);
    } else if (!isCorrectAnswer && previouslyCorrect) {
      setScore(score - 1);
    }

    updatedUserAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedUserAnswers);
  };

  const handleNextClick = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePrevClick = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const handleSkipClick = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  
  return (
    <div className="app">
      {showScore ? (
        <Score score={score} totalQuestions={questionsData.length} />
      ) : (
        <>
        <div className='header'>
          <QuestionTracker
            currentQuestion={currentQuestion}
            totalQuestions={questionsData.length}
          />
          {userAnswers[currentQuestion] !== '' && (
              <button className="reset-button" onClick={() => handleAnswerClick('')}>
                Reset
              </button>
            )}
          </div>
          <Question
            question={questionsData[currentQuestion].question}
            options={questionsData[currentQuestion].options}
            handleAnswerClick={handleAnswerClick}
            selectedAnswer={userAnswers[currentQuestion]}
          />
          <div className="button-container">
            <button onClick={handlePrevClick} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button onClick={handleSkipClick} disabled={showScore}>
              Skip
            </button>
            <button onClick={handleNextClick} disabled={showScore}>
              {currentQuestion === questionsData.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
          {currentQuestion > 0 && (
            <div className="summary">
              <h3>Summary of Answers:</h3>
              {userAnswers.map((answer, index) => (
                <p key={index}>
                  Question {index + 1}: {answer}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
