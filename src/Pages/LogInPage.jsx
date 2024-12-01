import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import '../Styling/LogInPage.css';
import loginIcon from '../assets/9.png';
import wavingIcon from '../assets/wavingIcon.png';
import backButton from '../assets/ReturnArrow.png';

function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, redirect to dashboard
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/'); // Redirect to dashboard
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="LogInPageRootContainer">
      <div className="LogInPageMainContent">
        <div className="LogInSection">
          <h1 id="LogInTitle">
            LOGIN <img id="LogInIcon" src={loginIcon} alt="loginIcon" />
          </h1>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="FormActions">
              <div className="RememberMeSection">
                <input type="checkbox" id="rememberMe" />
                <label className="remMe" htmlFor="rememberMe">
                  Remember me?
                </label>
              </div>

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
