// src/components/LogInPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../../firebaseConfi'; // Ensure this import points to your Firebase config

import '../Styling/LogInPage.css';
import loginIcon from '../assets/9.png';
import wavingIcon from '../assets/wavingIcon.png';
import backButton from '../assets/ReturnArrow.png';

function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission (page refresh)

    // Client-side validation: Check if email and password are filled in
    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Handle "Remember Me" functionality
      const rememberMe = document.getElementById('rememberMe').checked;
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

      // Authenticate user with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;



      alert('Welcome back! You are successfully logged in.');
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error logging in:', error);
      let errorMessage = 'An error occurred during login. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      alert(errorMessage);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="LogInPageRootContainer">
      <div className="LogInPageMainContent">
        <div className="LogInSection">
          <h1 id="LogInTitle">
            LOGIN <img id="LogInIcon" src={loginIcon} alt="loginIcon" />
          </h1>

          {/* Ensure the form uses onSubmit */}
          <form className="LoginForm" onSubmit={handleSubmit}>
            <div className="FormGroupLogInPage">
              <label className="labelForEmail" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="FormGroupLogInPage">
              <label className="labelForPass" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="FormActions">
              <div className="RememberMeSection">
                <input type="checkbox" id="rememberMe" />
                <label className="remMe" htmlFor="rememberMe">
                  Remember me?
                </label>
              </div>

              {/* Submit button */}
              <button className="LogInPageButtons" type="submit" disabled={loading}>
                {loading ? 'Logging In...' : 'Log In'}
              </button>

              <Link to="/forgotPassword" className="ForgotPasswordLink">
                Forgot Password?
              </Link>

              <Link to="/">
                <button className="backButton" type="button">
                  <img src={backButton} alt="Back" />
                </button>
              </Link>
            </div>
          </form>
        </div>

        <div className="SignUpSection">
          <h1 className="WelcomeTitle">WELCOME!</h1>
          <div className="ImageDiv">
            <img id="wavingIcon" src={wavingIcon} alt="wavingIcon" />
          </div>

          <h2 className="SignUpEnc">Don't have an account? Sign up today!</h2>

          <Link to="/CreateAccount" className="SignUpButtonContainer">
            <button className="SignUpButton" type="button">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
