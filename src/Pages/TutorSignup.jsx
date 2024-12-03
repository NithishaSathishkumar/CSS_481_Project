import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, push } from "firebase/database";
import app from '../../firebaseConfi';  // Ensure this import points to your Firebase config
import '../Styling/TutorSignup.css';  // Add your styles as needed

function TutorSignup() {
    const navigate = useNavigate();
    const location = useLocation();

    // State for capturing tutor-specific details
    const [loading, setLoading] = useState(false);
    const signUpData = location.state || {};  // Default to empty object if no data
    const [formData, setFormData] = useState({
        firstName: signUpData.firstName || '',
        lastName: signUpData.lastName || '',
        country: signUpData.country || '',
        state: signUpData.state || '',
        city: signUpData.city || '',
        postalCode: signUpData.postalCode || '',
        username: signUpData.username || '',
        email: signUpData.email || '',
        password: signUpData.password || '',
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
        reviews: { reviewer: '', review: '', rating: '', date: '', photo: '' },
        goals: ['', '', '', '', ''],
        localTime: '',
        photo:'',
    });

    // Handle file input change and upload image to ImgBB
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', file);
    
            try {
                const response = await fetch('https://api.imgbb.com/1/upload?key=85b4f85673d02f9b9c9dc739f12c4b26', {
                    method: 'POST',
                    body: formData,
                });
    
                const data = await response.json();
                if (data.success) {
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
                setLoading(false);
            }
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { availableTime, daysAvailable, price, subjects, primarySubject, description, about, education, goals, localTime, photo } = formData;
        
        if (!availableTime || !daysAvailable.length || !price || !subjects.length || !primarySubject || !description || !about|| !education.school || !education.degree || !education.graduationYear || !goals.some(goal => goal.trim()) || !localTime) {
            alert('Please fill out all fields');
            return;
        }

        if (goals.some(goal => goal.trim() === '')) {
            alert('Please fill out all goal fields.');
            return;
        }

        if (price === 'free' && formData.exactPrice) {
            alert('Please do not enter an exact price if the price is "Free".');
            return;
        }
    
        saveTutorData(formData);
    };


    const saveTutorData = async (data) => {
        try {
            // Get the reference to Firebase Realtime Database
            const db = getDatabase(app);
            const tutorRef = ref(db, 'tutors'); // Define where to store tutors' data
            const newTutorRef = push(tutorRef); // Generate a unique ID for the new tutor entry
            
            await set(newTutorRef, {
                ...data, // Spread all data (SignUp and Tutor data combined)
            });
                
            //navigate('/tutor-dashboard'); // Redirect user to tutor dashboard or profile page
            navigate('/AccountConfirmation');
    
        } catch (error) {
            console.error('Error saving tutor data:', error.message);
            alert(`An error occurred while saving your data: ${error.message}`); // Display error message if saving fails
        }
    };
  
    return (
        <div className="space">
            <div className="TutorSignupPage">
                <h1>Complete Your Tutor Profile</h1>
                <form onSubmit={handleFormSubmit}>

                    {/* Time Availability */}
                    <div className="inputGroup">
                    <label>Preferred Time of Day:</label>
                    <select
                        value={formData.availableTime}
                        onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
                        required
                    >
                        <option value="" className="time">Select time</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                        <option value="allDays">All Day</option>
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
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                    >
                        <option value="">Select price range</option>
                        <option value="free">Free</option>
                        <option value="<20">$20/hour or less</option>
                        <option value="20-50">$20-$50/hour</option>
                        <option value=">50">More than $50/hour</option>
                    </select>
                    </div>

                    {/* Exact Price */}
                    <div className="inputGroup">
                    <label>If exact price per hour:</label>
                    <input
                        type="number"
                        value={formData.exactPrice}
                        onChange={(e) => setFormData({ ...formData, exactPrice: e.target.value })}
                        placeholder="Enter exact price"
                        min="0"
                    />
                    </div>

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
                    <label>Description (1 sentence for student's to get to know you):</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="one sentence of yourself as a tutor"
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
                    <label>Goals:</label>
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
                        />
                    ))}
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
                        <label>Profile Photo:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div>
                        {/* Form fields for tutor data (availableTime, price, education, etc.) */}
                        <button type="submit">Submit</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default TutorSignup;