import React from 'react';

const Welcome = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to Our Survey!</h1>
      <button onClick={onStart}>Start Survey</button>
    </div>
  );
};

export default Welcome;
