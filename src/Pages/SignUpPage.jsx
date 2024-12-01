import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backButton from '../assets/ReturnArrow.png';
import userProfile from '../assets/6.png';
import '../Styling/SignUpPage.css';
import { getDatabase, ref, set, push, get } from "firebase/database";
import app from '../../firebaseConfi';
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing the password

function SignUpPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    username: '',
    email: '',
    password: '',
  });

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
    // setSelectedCountry(e.target.value);
    // setSelectedState(''); // Reset state when country changes
    const value = e.target.value;
    setSelectedCountry(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: value, // Update formData
      state: '', // Reset state when country changes
    }));

    setSelectedState(''); // Reset selected state
  };

  const handleStateChange = (e) => {
    // setSelectedState(e.target.value);
    const value = e.target.value;
    setSelectedState(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      state: value, // Update formData
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if all required fields are filled
    const { firstName, lastName, country, state, city, postalCode, username, email, password } = formData;
    
    if ( !firstName || !lastName || !country || !state || !city || !postalCode || !username || !email || !password) {
      setErrorMessage('Please fill out all required fields.');
      console.log('Form validation failed: Missing required fields');
      return;
    }

    // Check if Terms and Conditions checkbox is checked
    const termsAccepted = document.getElementById('TermsAndService').checked;
    if (!termsAccepted) {
      setErrorMessage('You must agree to the Terms of Service and Privacy Policy.');
      console.log('Form validation failed: Terms not accepted');
      return;
    }

    // If validation passes, proceed to submit form
    setErrorMessage(''); // Reset error message
    console.log('Form submitted successfully:', formData);

    // Save data to the database
    saveData(formData);
  };
  
  const saveData = async (data) => {
    try {
      const db = getDatabase(app);
      const userRef = ref(db, "account/user");

      const snapshot = await get(userRef);
      let emailExists = false;

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          if (userData.email_ === data.email) {
            emailExists = true; // Email found
          }
        });
      }

      if (emailExists) {
        alert('Email already exists. Please log in.');
        return; // Stop execution
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newDocRef = push(ref(db, "account/user"));

      await set(newDocRef, {
        firstName_: data.firstName,
        lastName_: data.lastName,
        country_: data.country,
        state_: data.state,
        city_: data.city,
        postalCode_: data.postalCode,
        username_: data.username,
        email_: data.email,
        password_: hashedPassword,
      });

      alert('Account created successfully!');

    }catch (error) {
      console.error('Error saving data:', error.message); // Log the error message
      alert(`An error occurred while saving your data: ${error.message}`); // Show specific error to the user
    }
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
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name*"
              required
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>

          <div className="InputSecondRow">
            <select id="country" name="country" value={formData.country} onChange={handleCountryChange} required>
              {countries.map((country) => (
                <option id="countryOptions" key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>

            <select id="state" name="state" value={formData.state} onChange={handleStateChange} required>
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
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />

            <input
              type="number"
              id="postalCode"
              name="postalCode"
              placeholder="Postal Code*"
              required
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            />
          </div>

          <div className="InputThirdSection">
            <input
              type="text"
              id="userName"
              name="username"
              placeholder="Username*"
              required
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />

            <input
              type="email"
              id="newEmail"
              name="newEmail"
              placeholder="Email*"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <input
              type="password"
              id="newUserPassword"
              name="newUserPassword"
              placeholder="Password*"
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
