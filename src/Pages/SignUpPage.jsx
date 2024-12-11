//Import necessary libraries and modules
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; //Firebase auth functions
import { ref, set, push } from 'firebase/database'; //Firebase database functions
import { auth, db } from '/firebaseConfi'; //Firebase configuration
import backButton from '../assets/ReturnArrow.png'; 
import userProfile from '../assets/6.png';
import '../Styling/SignUpPage.css';

//Main component for Signup Page
function SignUpPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  //State to manage form data with default or initial values set = empty ('')
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

  //List of countries for the dropdown menu
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

  //List of U.S. states for the dropdown menu
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  //Handler for country dropdown selection
  const handleCountryChange = (e) => {
    const value = e.target.value;   //Get Selected country value
    setSelectedCountry(value);    //Update the country to value
    setFormData((prevFormData) => ({
      ...prevFormData,  //Keep the existing form data
      country: value,   //Update the country field with the selected value
      state: '',
    }));
    setSelectedState('');
  };

  //Handler for state dropdown selection
  const handleStateChange = (e) => {
    const value = e.target.value; //Get selected state value
    setSelectedState(value);  //Updated the state to value
    setFormData((prevFormData) => ({
      ...prevFormData,  //Keep the existing form data
      state: value,   //Update the state field with the selected value
    }));
  };

  //Handler for changing the profile picture based on user's upload submission
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0]; //Getting file input from user
    if (file) {
      setLoading(true); //Show loading state during upload
      const uploadData = new FormData();
      uploadData.append('image', file);

      try {
        //Sending a POST request to the imgbb API to upload the image
        const response = await fetch('https://api.imgbb.com/1/upload?key=85b4f85673d02f9b9c9dc739f12c4b26', { //Where we store our images
          method: 'POST',
          body: uploadData,
        });

        const data = await response.json();

        //If the upload is successful, update the profile picture URL
        if (data.success) {
          setProfilePic(data.data.url);
          setFormData((prevState) => ({
            ...prevState,
            photo: data.data.url, //Set photo URL in formData
          }));
        } else {
          alert('Failed to upload image');  //Alert the user if the upload fails
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading the photo. Please try again.');
      } finally {
        setLoading(false); //Hide loading state after upload
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  
  //Handler for when the user clicks on sign up, subnmitting all data in the form
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    //Ensure photo is set; if not, use default
    if (!formData.photo) {
      setFormData((prevData) => ({
        ...prevData,
        photo: userProfile,
      }));
    }

    const { email, password, signupAsTutor, ...userData } = formData;

    //Basic form validation
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

    //Use this to help chceck if the user has checked the term and service agrrement
    const termsAccepted = document.getElementById('TermsAndService').checked;
    if (!termsAccepted) {
      setErrorMessage('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    const authInstance = auth;
    try {
      //Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;

      //Update the user's displayName and photoURL in Firebase Auth
      await updateProfile(user, {
        displayName: formData.username,
        photoURL: formData.photo || userProfile,
      });

      if (!signupAsTutor) {
        //If not signing up as a tutor, add user data to Firebase Realtime Database
        const db1 = db;
        const userRef = ref(db1, "account/user");
        const newUserRef = push(userRef);

        //save the new user's data to the Realtime Database with additional fields
        await set(newUserRef, { 
          ...userData, 
          username: formData.username, 
          uid: user.uid,
          firstName: formData.firstName,
          lastName: formData.lastName,
        });

        //Navigate to Account Confirmation
        navigate('/AccountConfirmation');
      } else {
        //If signing up as a tutor, navigate to TutorSignup and pass necessary data
        navigate('/tutorSignup', { state: { formData: formData, uid: user.uid } });
      }

    } catch (error) {
      console.error('Error signing up:', error.message);
      setErrorMessage(error.message);
    }
  };

  //Return JSX for the Signup Page
  //HTML
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

            <select id="signUpPageState" name="state" value={formData.state} onChange={handleStateChange} required>
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
              id="signUpPageCity"
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

export default SignUpPage; // Export component
