import React, { useState, useEffect } from 'react';

const questions = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating', scale: 5 },
  { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', scale: 5 },
  { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', scale: 5 },
  { id: 4, text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', scale: 10 },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' }
];

const Survey = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [currentSessionId, setCurrentSessionId] = useState(() => `session_${Date.now()}`);
  
  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem(currentSessionId)) || {};
    setResponses(savedResponses);
  }, [currentSessionId]);

  const handleAnswer = (answer) => {
    setResponses(prev => ({ ...prev, [questions[currentQuestionIndex].id]: answer }));
  };

  const handleNext = () => {
    const nextIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
    setCurrentQuestionIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = Math.max(currentQuestionIndex - 1, 0);
    setCurrentQuestionIndex(prevIndex);
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = () => {
    localStorage.setItem(currentSessionId, JSON.stringify(responses));
    localStorage.setItem(`${currentSessionId}_status`, 'COMPLETED');
    onComplete();
  };

  const question = questions[currentQuestionIndex];
  const selectedRating = responses[question.id];

  return (
    <div className="survey-screen">
      <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
      <p>{question.text}</p>
      {question.type === 'rating' && (
        <div className="rating">
          {[...Array(question.scale).keys()].map((_, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index + 1)}
              className={`rating-button ${selectedRating === index + 1 ? 'selected' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      {question.type === 'text' && (
        <textarea
          rows="4"
          onBlur={(e) => handleAnswer(e.target.value)}
        />
      )}
      <div className="navigation-buttons">
        {currentQuestionIndex > 0 && <button onClick={handlePrevious}>Previous</button>}
        {currentQuestionIndex < questions.length - 1 && <button onClick={handleNext}>Next</button>}
        <button onClick={handleSkip}>Skip</button>
        {currentQuestionIndex === questions.length - 1 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default Survey;
