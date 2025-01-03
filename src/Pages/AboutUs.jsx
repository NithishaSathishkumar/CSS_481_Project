// AboutUs.jsx

// Import necessary libraries and modules
import React from 'react';
import { Link } from 'react-router-dom';
import '/src/Styling/AboutUs.css'; // Optional: for component-specific styling

// IMPORTING PICTURES
import aboutUs from '../assets/10.png';
import mission from '../assets/7.png';
import whyChoose from '../assets/8.png';
import team from '../assets/5.png';

// Main component for About us
const AboutUs = () => {
    // Return JSX for the About us
    return (
        <>
            <div className="AboutUsMainContent">
                <div id="nav-placeholder"></div>

                {/* Section 1: About Us */}
                <main class="section1">
                    <div class="info">
                        <h2>About Us</h2>
                        <p class="p3">Welcome to MentorMe – Your Path to Personalized Learning! At MentorMe, we believe in the transformative power of education and the right of every student to access high-quality tutoring, regardless of background or location. Our mission is to bridge educational gaps by offering flexible, accessible, and affordable tutoring solutions for students of all ages and learning needs</p>
                        <p class="p3">Our Vision We envision a world where everyone has access to the resources they need to thrive academically. MentorMe aims to close educational inequalities by making tutoring services accessible and customizable. We believe in nurturing academic confidence and helping students achieve their personal best by providing a virtual learning environment tailored to meet diverse needs.</p>
                    </div>
                    <div class="imgInfo">
                        <img src={aboutUs} alt="location" width="400px"></img>
                        </div>
                </main>

                {/* Section 2: Our Mission */}
                <main class="section2">
                    <div class="imgInfo2">
                        <img src={mission} alt="location" width="400px"></img>
                    </div>
    
                    <div class="info2">
                        <h2 class="title2">Our Mission</h2>
                        <ul class="ul2">
                            <li>Providing students with dependable, easily accessible academic support in a variety of subjects</li>
                            <li>Offering tutoring services that cater to individual learning styles, academic levels, and schedules.</li>
                            <li>Enabling students to connect with knowledgeable tutors from around the globe, giving them the flexibility to learn anytime, anywhere.</li>
                        </ul>
                    </div>
                </main>

                {/* Section 3: Why Choose MentorMe */}
                <main class="section3">
                    <div class="info3">
                        <h2 class="title3">Why Choose MentorMe?</h2>
                        <p class="p3">We understand that finding dependable academic support outside of school can be challenging due to limited local options, high costs, or scheduling issues. MentorMe tackles these barriers by offering</p>
                        <ul class="ul3">
                            <li><p><strong>Expert Tutors:</strong> Our tutors are carefully selected for their expertise, experience, and passion for teaching.</p></li>
                            <li><p><strong>Affordable Options:</strong> With a choice between free and paid sessions, we make quality tutoring accessible to all students.</p></li>
                            <li><p><strong>Secure Payments:</strong> We offer various secure payment options for paid sessions, so you can focus on learning without worrying about payment hassles.</p></li>  
                            <li><p><strong>Customized Learning:</strong> MentorMe's platform lets students personalize their learning by selecting tutors based on their academic goals, learning pace, and personal preferences.</p></li>
                        </ul>
                    </div>
                    <div class="imgInfo3">
                        <img src={whyChoose} alt="location" width="400px"></img>
                    </div>
                </main>

                {/* Section 4: Meet Our Team */}
                <main class="section4">
                    <h2>Meet Our Team</h2>
                    <div class="content4">
                        <p>Our team is a passionate group of students, educators, and tech enthusiasts committed to making a difference in education. We bring together our skills in technology, teaching, and customer service to create a seamless, enriching experience for both students and tutors</p>
                    </div>

                    <div class="imgInfo4">
                        <img src={team} alt="team" width="600px"></img>
                    </div>  
                </main>

                {/* Section 5: Call to Action */}
                <main class="section5">
                    <div class="imgInfo5">
                        <h2 class="title5">Join Us in Our Journey</h2>
                        <Link to="/CreateAccount">
                            <button>Sign up</button>
                        </Link>
                    </div>
    
                    <div class="info5">
                        <p class="ul2">
                            Whether you’re looking for academic support, career advancement, or just a new way to learn, MentorMe is here to help. Join us and take your first step towards a brighter, more confident academic future.
                        </p>
                    </div>
                </main>
            </div>
        </>
    )
}

export default AboutUs; // Export component