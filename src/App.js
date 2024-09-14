import React, { useState } from 'react';
import Welcome from './Welcome';
import Survey from './Survey';
import './App.css'
import ThankYou from './ThankYou';

const App = () => {
  const [stage, setStage] = useState('welcome'); 
  
  const handleStartSurvey = () => {
    setStage('survey');
  };

  const handleCompleteSurvey = () => {
    setStage('thankYou');
    setTimeout(() => setStage('welcome'), 5000); 
  };

  return (
    <div className="app">
      {stage === 'welcome' && <Welcome onStart={handleStartSurvey} />}
      {stage === 'survey' && <Survey onComplete={handleCompleteSurvey} />}
      {stage === 'thankYou' && <ThankYou />}
    </div>
  );
};

export default App;
