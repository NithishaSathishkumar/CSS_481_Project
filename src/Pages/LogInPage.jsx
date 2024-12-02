import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import bcrypt from 'bcryptjs'; // Import bcryptjs to compare passwords
import app from '../../firebaseConfi';

import '../Styling/LogInPage.css';
import loginIcon from '../assets/9.png';
import wavingIcon from '../assets/wavingIcon.png';
import backButton from '../assets/ReturnArrow.png';

function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchData = async (email, password) => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'account/user');
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      let emailFound = false;
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        const storedEmail = userData.email_;
        const storedPassword = userData.password_;

        // Check if the email matches
        if (storedEmail === email) {
          emailFound = true;

          // Compare the entered password with the stored hashed password
          bcrypt.compare(password, storedPassword, (err, result) => {
            if (result) {
              // Password matches, login successful
              alert('Welcome back!');
            } else {
              // Password mismatch
              alert('Password does not match. Click on Forgot Password to change password');
            }
          });
          return; // Exit the loop once email is found
        }
      });

      if (!emailFound) {
        // If email was not found in the database
        alert('Email not found. Please create an account.');
      }
    } else {
      alert('No users found in the database.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission (page refresh)

    // Client-side validation: Check if email and password are filled in
    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    // Call fetchData to validate credentials after basic validation
    fetchData(email, password);
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

              {/* Submit button should not trigger default form submission */}
              <button className="LogInPageButtons" type="submit">
                Log In
              </button>

              <Link to="/forgotPassword" className="ForgotPasswordLink">
                Forgot Password?
              </Link>

              <Link to="/">
                <button className="backButton">
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

