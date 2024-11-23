import React from 'react';
import { Link } from 'react-router-dom';

import '../Styling/LogInPage.css';
import loginIcon from '../assets/9.png';
import wavingIcon from '../assets/wavingIcon.png';
import backButton from '../assets/ReturnArrow.png';

function LogInPage() {
  return (
    <div className="LogInPageRootContainer">
      <div className="LogInPageMainContent">
        <div className="LogInSection">
          <h1 id="LogInTitle">LOGIN <img id="LogInIcon" src={loginIcon} alt="loginIcon"/></h1>

          <form className="LoginForm">
            <div className="FormGroupLogInPage">
              <label className="labelForEmail" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div className="FormGroupLogInPage">
              <label className="labelForPass" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter your password" 
                required 
              />
            </div>

            <div className="FormActions">
              <div className="RememberMeSection">
                <input type="checkbox" id="rememberMe"/>
                <label className="remMe" htmlFor="rememberMe">Remember me?</label>
              </div>

              <button className="LogInPageButtons" type="submit">Log In</button>

              <a href="/forgot-password" className="ForgotPasswordLink">Forgot Password?</a>
              
              <Link to="/">
                <button className="backButton"><img src={backButton} alt="Back" /></button>
              </Link>
            </div>
          </form>
        </div>

        <div className="SignUpSection">
          <h1 className="WelcomeTitle">WELCOME!</h1>
          <div className="ImageDiv">
            <img id="wavingIcon" src={wavingIcon} alt="wavingIcon"/>
          </div>
          
          <h2 className="SignUpEnc">Don't have an account? Sign up today!</h2>

          <Link to="/CreateAccount" className="SignUpButtonContainer">
            <button className="SignUpButton" type="button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LogInPage
