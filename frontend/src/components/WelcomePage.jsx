import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; 

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <img src="/favicon.png" alt="BalanceBites Logo" className="logo" />
        <h1>Welcome to Feastify!</h1>
        <p>Lets manage your calories!!</p>
        <button onClick={() => navigate('/login')}>Let’s get started</button>
      </div>
    </div>
  );
  
}

export default WelcomePage;
