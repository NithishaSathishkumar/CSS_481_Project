import React from 'react';
import '/src/Components/ComponentStyling/about.css'; // Optional: for component-specific styling

// IMPORTING PICTURES
import aboutUs from '../assets/10.png';
import mission from '../assets/7.png';
import mail from '../assets/4.png';
import whyChoose from '../assets/8.png';

const About = () => {
    return (
        <>
            <div id="nav-placeholder"></div>

            <main class="section1">
                <div class="info">
                    <h2>About Us</h2>
                    <p class="p3">Welcome to MentorMe – Your Path to Personalized Learning! At MentorMe, we believe in the transformative power of education and the right of every student to access high-quality tutoring, regardless of background or location. Our mission is to bridge educational gaps by offering flexible, accessible, and affordable tutoring solutions for students of all ages and learning needs</p>
                    <p class="p3">Our Vision We envision a world where everyone has access to the resources they need to thrive academically. MentorMe aims to close educational inequalities by making tutoring services accessible and customizable. We believe in nurturing academic confidence and helping students achieve their personal best by providing a virtual learning environment tailored to meet diverse needs.</p>
                </div>

                <div class="imgInfo">
                    <img src={aboutUs} alt="about us" width="400px"></img>
                </div>
            </main>

            <main class="section2">
                <div class="imgInfo2">
                    <img src={mission} alt="our mission" width="400px"></img>
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
                    <img src={whyChoose} alt="choose mentorUs" width="400px"></img>
                </div>
            </main>
        </>
    )
}

export default About;