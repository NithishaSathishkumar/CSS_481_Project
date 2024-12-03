import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backButton from '../assets/ReturnArrow.png';
import userProfile from '../assets/6.png';
import '../Styling/SignUpPage.css';
import { getDatabase, ref, set, push, get } from "firebase/database";
import app from '../../firebaseConfi';
import bcrypt from 'bcryptjs';

function SignUpPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [profilePic, setProfilePic] = useState(null);
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
    userSchedule: [{ tutorID: '', sessionName: '', time: '', topic: '', meetingType:'', zoomLink:''}],
    signupAsTutor: false,
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

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };
    
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password, signUpAsTutor, ...userData } = formData;
  
    const completeUserData = {
      ...userData,
      email,
      password,
    };
  
    if (Object.values(completeUserData).some((field) => field === '')) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }
  
    const termsAccepted = document.getElementById('TermsAndService').checked;
    if (!termsAccepted) {
      setErrorMessage('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
  
    // Check for existing email in both 'account/user' and 'tutors'
    const db = getDatabase(app);
    const userRef = ref(db, "account/user");
    const tutorRef = ref(db, "tutors");
  
    const [userSnapshot, tutorSnapshot] = await Promise.all([
      get(userRef),
      get(tutorRef),
    ]);
  
    const emailExistsInUser = userSnapshot.exists()
      ? Object.values(userSnapshot.val()).some((user) => user.email === email)
      : false;
  
    const emailExistsInTutor = tutorSnapshot.exists()
      ? Object.values(tutorSnapshot.val()).some((tutor) => tutor.email === email)
      : false;
  
    if (emailExistsInUser || emailExistsInTutor) {
      setErrorMessage('Email already exists. Please log in.');
      return;
    }
  
    setErrorMessage('');
    const hashedPassword = await bcrypt.hash(password, 10);
    const dataToSave = { ...completeUserData, password: hashedPassword };
  
    if (signUpAsTutor) {
      navigate('/tutorSignup', { state: dataToSave });
    } else {
      // Save user data directly
      const userRef = push(ref(db, "account/user"));
      await set(userRef, dataToSave);
      navigate('/AccountConfirmation');
    }
  };

  return (
    <div className="SignUpPageRootContainer">
      <div className="SignUpPageMainContent">

      <form onSubmit={handleFormSubmit}>
          <div className="NewUserPPSec">
            <img className="NewUserProfile" src={profilePic || userProfile} alt="userProfile" />
            <button type="button" className="AddNewProfilePicButton" onClick={handleUploadClick}>+</button>
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

            <div className="TutorSelection">
              <input
                type="checkbox"
                id="signUpAsTutor"
                name="signUpAsTutor"
                checked={formData.signUpAsTutor}
                onChange={(e) => setFormData({ ...formData, signUpAsTutor: e.target.checked })}
              />
              <label htmlFor="signUpAsTutor">Sign up as a Tutor</label>
            </div>

            <div className="TermsAndServiceSection">
              <input type="checkbox" id="TermsAndService" required />
              <label className="TermsAndServiceLabel" htmlFor="TermsAndService">I agree to the Terms of Service and Privacy Policy</label>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button className="LogInPageButtons" type="submit">
            {formData.signUpAsTutor ? 'Next' : 'Sign Up'}
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