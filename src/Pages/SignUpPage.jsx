import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backButton from '../assets/ReturnArrow.png';
import userProfile from '../assets/6.png';
import '../Styling/SignUpPage.css';

function SignUpPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const countries = [
    { value: '', label: 'Select your country' },
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'australia', label: 'Australia' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'japan', label: 'Japan' },
    { value: 'china', label: 'China' },
    { value: 'brazil', label: 'Brazil' },
    { value: 'india', label: 'India' },
  ];

  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState(''); // Reset state when country changes
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const country = form.country.value.trim();
    const state = form.state.value.trim();
    const city = form.city.value.trim();
    const postalCode = form.postalCode.value.trim();
    const username = form.username.value.trim();
    const email = form.newEmail.value.trim();
    const password = form.newUserPassword.value.trim();
    const termsAccepted = form.TermsAndService.checked;

    // Validate required fields
    if (!firstName || !lastName || !country || !city || !postalCode || !username || !email || !password || !termsAccepted) {
      setErrorMessage('Please fill out all required fields and accept the Terms of Service.');
      console.log('Form validation failed.');
      return;
    }

    // Reset error message and submit form logic
    setErrorMessage('');
    console.log('Form submitted successfully:', {
      firstName,
      lastName,
      country,
      state,
      city,
      postalCode,
      username,
      email,
      password,
    });
  };

  return (
    <div className="SignUpPageRootContainer">
      <div className="SignUpPageMainContent">
        <div className="NewUserPPSec">
          <img class="NewUserProfile" src={userProfile} alt="userProfile" />
          <button className="AddNewProfilePicButton" type="button">+</button>
        </div>

        <h1 className="heading">Create New Account</h1>

        <form onSubmit={handleFormSubmit}>
          <div className="InputFirstRow">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name*"
              required
            />
            
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name*"
              required
            />
          </div>

          <div className="InputSecondRow">
            <select id="country" name="country" value={selectedCountry} onChange={handleCountryChange} required>
              {countries.map((country) => (
                <option id="countryOptions" key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>

            <select id="state" name="state" value={selectedState} onChange={handleStateChange} required>
              {selectedCountry === 'usa' ? (usStates.map((state) => (
                <option id="stateOptions" key={state} value={state}>
                  {state}
                </option>
              ))) : (
                <option value="International">International</option>
              )}
            </select>

            <input
              type="text"
              id="city"
              name="city"
              placeholder="City*"
              required
            />

            <input
              type="number"
              id="postalCode"
              name="postalCode"
              placeholder="Postal Code*"
              required
            />
          </div>

          <div className="InputThirdSection">
            <input
              type="text"
              id="userName"
              name="username"
              placeholder="Username*"
              required
            />

            <input
              type="email"
              id="newEmail"
              name="newEmail"
              placeholder="Email*"
              required
            />

            <input
              type="password"
              id="newUserPassword"
              name="newUserPassword"
              placeholder="Password*"
              required
            />
            
            <div className="TermsAndServiceSection">
              <input type="checkbox" id="TermsAndService" required />
              <label className="TermsAndServiceLabel" htmlFor="TermsAndService">I agree to the Terms of Service and Privacy Policy</label>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
          
          <button className="LogInPageButtons" type="submit">Sign Up</button>
        </form>

        <Link to="/Login">
          <button className="BackButtonSignUpPage"><img src={backButton} alt="Back" /></button>
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
