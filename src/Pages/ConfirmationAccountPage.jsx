import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { Link } from 'react-router-dom';
import '../Styling/ConfirmationAccountPage.css';

function ConfirmationAccountPage() {
  const [username, setUsername] = useState('User'); // Default to 'User' until fetched

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <ReactConfetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={150}
        gravity={0.04}
        initialVelocityY={20}
        recycle={true}
        colors={['#FFD700', '#FFFFFF', '#283618']}
      />

      <div className="SignUpCelebrationRoot">
        <div className="SignUpMainContent">
          <h1 id="hoorayTitle">Hooray!</h1>
          <h2 id="WelcomeUser">Welcome to MentorMe, {username}</h2>
          <Link to="/about">
            <button className="BackToHomeButton">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationAccountPage;
