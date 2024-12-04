// src/components/SignUpPage.js
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set, push } from 'firebase/database';
import { auth, db } from '/firebaseConfi';
import backButton from '../assets/ReturnArrow.png'; // Ensure the path is correct
import userProfile from '../assets/6.png'; // Ensure the path is correct
import '../Styling/SignUpPage.css';

function SignUpPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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
    signupAsTutor: false,
    photo: '',
  });

  const navigate = useNavigate();

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
    const value = e.target.value;
    setSelectedCountry(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: value,
      state: '',
    }));
    setSelectedState('');
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setSelectedState(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      state: value,
    }));
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true); // Show loading state during upload
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('https://api.imgbb.com/1/upload?key=85b4f85673d02f9b9c9dc739f12c4b26', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          setProfilePic(data.data.url);
          setFormData((prevState) => ({
            ...prevState,
            photo: data.data.url, // Set photo URL in formData
          }));
        } else {
          alert('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading the photo. Please try again.');
      } finally {
        setLoading(false); // Hide loading state after upload
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Ensure photo is set; if not, use default
    if (!formData.photo) {
      setFormData((prevData) => ({
        ...prevData,
        photo: userProfile,
      }));
    }

    const { email, password, signupAsTutor, ...userData } = formData;

    // Basic form validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.country ||
      !formData.state ||
      !formData.city ||
      !formData.postalCode ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    const termsAccepted = document.getElementById('TermsAndService').checked;
    if (!termsAccepted) {
      setErrorMessage('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    const authInstance = auth;
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;

      // Update the user's displayName and photoURL in Firebase Auth
      await updateProfile(user, {
        displayName: formData.username,
        photoURL: formData.photo || userProfile,
      });

      // Add user data to Firebase Realtime Database
      const db1 = db;
      const userRef = ref(db1, signupAsTutor ? "tutors" : "account/user");
      const newUserRef = push(userRef);

      await set(newUserRef, { 
        ...userData, 
        username: formData.username, 
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      // Navigate based on user type
      navigate(signupAsTutor ? '/tutorSignup' : '/AccountConfirmation');

    } catch (error) {
      console.error('Error signing up:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="SignUpPageRootContainer">
      <div className="SignUpPageMainContent">

        <form onSubmit={handleFormSubmit}>
          <div className="NewUserPPSec">
            <img className="NewUserProfile" src={profilePic || userProfile} alt="userProfile" />
            <button type="button" className="AddNewProfilePicButton" onClick={handleUploadClick} disabled={loading}>
              +
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>

          <h1 className="heading">Create New Account</h1>

          <div className="InputFirstRow">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name*"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />

            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name*"
              required
              value={formData.lastName}
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
              <option value="" disabled>Select your state</option>
              {selectedCountry === 'usa' ? (
                usStates.map((state) => (
                  <option id="stateOptions" key={state} value={state}>
                    {state}
                  </option>
                ))
              ) : (
                <option value="International">International</option>
              )}
            </select>

            <input
              type="text"
              id="city"
              name="city"
              placeholder="City*"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />

            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="Postal Code*"
              required
              value={formData.postalCode}
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
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />

            <input
              type="email"
              id="newEmail"
              name="newEmail"
              placeholder="Email*"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <input
              type="password"
              id="newUserPassword"
              name="newUserPassword"
              placeholder="Password*"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <div className="TutorSelection">
              <input
                type="checkbox"
                id="signUpAsTutor"
                name="signUpAsTutor"
                checked={formData.signupAsTutor}
                onChange={(e) => setFormData({ ...formData, signupAsTutor: e.target.checked })}
              />
              <label htmlFor="signUpAsTutor">Sign up as a Tutor</label>
            </div>

            <div className="TermsAndServiceSection">
              <input type="checkbox" id="TermsAndService" required />
              <label className="TermsAndServiceLabel" htmlFor="TermsAndService">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button className="LogInPageButtons" type="submit" disabled={loading}>
            {formData.signupAsTutor ? 'Next' : 'Sign Up'}
          </button>
        </form>

        <Link to="/Login">
          <button className="BackButtonSignUpPage"><img src={backButton} alt="Back" /></button>
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
