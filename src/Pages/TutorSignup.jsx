// TutorSignup.jsx

// Import necessary libraries and modules
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import { auth } from '../../firebaseConfi';  // Firebase configuration file
import '../Styling/TutorSignup.css';  // Custom CSS for the component

// Main component for Tutor Signup
function TutorSignup() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    // Extract initial form data and user ID from the location state
    const { formData: initialFormData, uid } = location.state || {};

    // State to manage form data with default or initial values
    const [formData, setFormData] = useState({
        firstName: initialFormData?.firstName || '',
        lastName: initialFormData?.lastName || '',
        country: initialFormData?.country || '',
        state: initialFormData?.state || '',
        city: initialFormData?.city || '',
        postalCode: initialFormData?.postalCode || '',
        username: initialFormData?.username || '',
        email: initialFormData?.email || '',
        password: initialFormData?.password || '', // Password is already handled by Firebase Auth
        photo: initialFormData?.photo || '',
        rating: '0',
        availableTime: '',
        daysAvailable: [],
        price: '',
        exactPrice: '',
        subjects: [],
        primarySubject: '',
        about: '',
        description: '',
        education: { school: '', degree: '', graduationYear: '' },
        reviews: [], // Array to hold reviews
        tutorSchedule: [{ studentID: '', sessionName: '', time: '', topic: '', meetingType:'', zoomLink:''}],
        goals: ['', ''], // Default minimum goals
        localTime: '',
    });

    // Handle file uploads for tutor profile photo
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true); // Indicate loading during the upload
            const uploadData = new FormData();
            uploadData.append('image', file);
    
            try {
                // Upload image to ImgBB API
                const response = await fetch('https://api.imgbb.com/1/upload?key=85b4f85673d02f9b9c9dc739f12c4b26', {
                    method: 'POST',
                    body: uploadData,
                });
    
                const data = await response.json();
                if (data.success) {
                    // Update photo URL in formData
                    setFormData((prevState) => ({
                        ...prevState,
                        photo: data.data.url,
                    }));
                } else {
                    alert('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Error uploading the photo. Please try again.');
            } finally {
                setLoading(false); // Reset loading state
            }
        }
    };

    // Handle form submission for tutor data
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Destructure necessary fields for validation
        const { availableTime, daysAvailable, price, subjects, primarySubject, description, about, education, goals, localTime, photo } = formData;
        
        // Basic validation to ensure required fields are completed
        if (
            !availableTime || 
            !daysAvailable.length || 
            !price || 
            !subjects.length || 
            !primarySubject || 
            !description || 
            !about || 
            !education.school || 
            !education.degree || 
            !education.graduationYear || 
            !goals.some(goal => goal.trim()) || 
            !localTime
        ) {
            alert('Please fill out all required fields');
            return;
        }

        // Validate goals for empty strings
        if (goals.some(goal => goal.trim() === '')) {
            alert('Please fill out all goal fields.');
            return;
        }

        // Validate price and exactPrice fields
        if (price === 'Free' && formData.exactPrice) {
            alert('Please do not enter an exact price if the price is "Free".');
            return;
        }
    
        saveTutorData(formData); // Save validated data to Firebase
    };

    // Save tutor data to Firebase Realtime Database
    const saveTutorData = async (data) => {
        try {
            setLoading(true); // Indicate loading during save
            const db = getDatabase(); // Get Firebase database reference
            const tutorRef = ref(db, `tutors/${uid}`); // Unique reference for tutor based on uid
            
            await set(tutorRef, {
                ...data, 
                uid: uid,
            });
                
            // Navigate to account confirmation or tutor dashboard
            navigate('/AccountConfirmation');
    
        } catch (error) {
            console.error('Error saving tutor data:', error.message);
            alert(`An error occurred while saving your data: ${error.message}`); // Display error message if saving fails
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Handle changes to the price field
    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (value === 'Free') {
            setFormData((prevState) => ({
                ...prevState,
                price: value,
                exactPrice: '', // Clear exactPrice if price is Free
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                price: value,
            }));
        }
    };
  
    // Return JSX for the Tutor Signup form
    return (
        <div className="space">
            <div className="TutorSignupPage">
                <h1>Complete Your Tutor Profile</h1>
                <form onSubmit={handleFormSubmit}>

                    {/* Profile Photo */}
                    <div className="inputGroup">
                    <label>Profile Photo:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={loading}
                    />
                    {formData.photo && (
                        <img
                            src={formData.photo}
                            alt="Tutor Profile"
                            width="100"
                            height="100"
                        />
                    )}
                    </div>

                    {/* Time Availability */}
                    <div className="inputGroup">
                        <label>Preferred Time of Day:</label>
                        <select
                            value={formData.availableTime}
                            onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
                            required
                        >
                            <option value="" className="time">Select time</option>
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                            <option value="All Days">All Day</option>
                        </select>
                    </div>

                    {/* Days Available */}
                    <div className="inputGroup">
                        <label>Days Available:</label>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                            <div key={day}>
                                <input
                                    type="checkbox"
                                    value={day}
                                    onChange={(e) => {
                                        const days = [...formData.daysAvailable];
                                        if (e.target.checked) {
                                            days.push(day);
                                        } else {
                                            const index = days.indexOf(day);
                                            if (index !== -1) {
                                                days.splice(index, 1);
                                            }
                                        }
                                        setFormData({ ...formData, daysAvailable: days });
                                    }}
                                />
                                <label>{day}</label>
                            </div>
                        ))}
                    </div>

                    {/* Price Options */}
                    <div className="inputGroup">
                        <label>Price:</label>
                        <select
                            value={formData.price}
                            onChange={handlePriceChange}
                            required
                        >
                            <option value="">Select price range</option>
                            <option value="Free">Free</option>
                            <option value="<$20/hour or less">$20/hour or less</option>
                            <option value="$20-$50/hour">$20-$50/hour</option>
                            <option value="More than $50/hour">More than $50/hour</option>
                        </select>
                    </div>

                    {/* Exact Price */}
                    {formData.price !== 'Free' && (
                        <div className="inputGroup">
                            <label>Exact Price per Hour:</label>
                            <input
                                type="number"
                                value={formData.exactPrice}
                                onChange={(e) => setFormData({ ...formData, exactPrice: e.target.value })}
                                placeholder="Enter exact price"
                                required
                            />
                        </div>
                    )}

                    {/* Subjects */}
                    <div className="inputGroup">
                        <label>Subjects:</label>
                        {['Math', 'Computer Science', 'English', 'Physics', 'Chemistry', 'SAT Prep', 'Other'].map(subject => (
                            <div key={subject}>
                                <input
                                    type="checkbox"
                                    value={subject}
                                    onChange={(e) => {
                                        const subjects = [...formData.subjects];
                                        if (e.target.checked) {
                                            subjects.push(subject);
                                        } else {
                                            const index = subjects.indexOf(subject);
                                            if (index !== -1) {
                                                subjects.splice(index, 1);
                                            }
                                        }
                                        setFormData({ ...formData, subjects });
                                    }}
                                />
                                <label>{subject}</label>
                            </div>
                        ))}
                    </div>

                    {/* Primary Subject */}
                    <div className="inputGroup">
                        <label>Select Primary Subject:</label>
                        <select
                            value={formData.primarySubject}
                            onChange={(e) => setFormData({ ...formData, primarySubject: e.target.value })}
                            required
                        >
                            <option value="">Select primary subject</option>
                            {formData.subjects.map(subject => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* About */}
                    <div className="inputGroup">
                        <label>About:</label>
                        <textarea
                            value={formData.about}
                            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                            placeholder="Brief about yourself as a tutor"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="inputGroup">
                        <label>Description (1 sentence for students to get to know you):</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="One sentence about yourself as a tutor"
                            required
                        />
                    </div>

                    {/* Education */}
                    <div className="inputGroup">
                        <label>School:</label>
                        <input
                            type="text"
                            value={formData.education.school}
                            onChange={(e) => setFormData({ ...formData, education: { ...formData.education, school: e.target.value } })}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Degree:</label>
                        <input
                            type="text"
                            value={formData.education.degree}
                            onChange={(e) => setFormData({ ...formData, education: { ...formData.education, degree: e.target.value } })}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Graduation Year:</label>
                        <input
                            type="number"
                            value={formData.education.graduationYear}
                            onChange={(e) => setFormData({ ...formData, education: { ...formData.education, graduationYear: e.target.value } })}
                            required
                        />
                    </div>

                    {/* Goals */}
                    <div className="inputGroup">
                        <label>Goals (Min 2, Max 5):</label>
                        {formData.goals.map((goal, index) => (
                            <input
                                key={index}
                                type="text"
                                value={goal}
                                onChange={(e) => {
                                    const updatedGoals = [...formData.goals];
                                    updatedGoals[index] = e.target.value;
                                    setFormData({ ...formData, goals: updatedGoals });
                                }}
                                placeholder={`Goal ${index + 1}`}
                                required={index < 2}
                            />
                        ))}
                        {formData.goals.length < 5 && (
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        goals: [...prevState.goals, ''],
                                    }))
                                }
                            >
                                Add Goal
                            </button>
                        )}
                        {formData.goals.length > 2 && (
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prevState) => {
                                        const updatedGoals = [...prevState.goals];
                                        updatedGoals.pop();
                                        return { ...prevState, goals: updatedGoals };
                                    })
                                }
                            >
                                Remove Goal
                            </button>
                        )}
                    </div>

                    {/* Local Time */}
                    <div className="inputGroup">
                        <label>Local Time:</label>
                        <input
                            type="time"
                            value={formData.localTime}
                            onChange={(e) => setFormData({ ...formData, localTime: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        {/* Form fields for tutor data (availableTime, price, education, etc.) */}
                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default TutorSignup; // Export component
