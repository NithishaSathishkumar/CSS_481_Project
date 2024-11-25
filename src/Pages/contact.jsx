import React from 'react';
import '/src/Styling/contact.css'; // Optional: for component-specific styling

// IMPORTING PICTURES
import location from '../assets/2.png';
import phone from '../assets/3.png';
import mail from '../assets/4.png';
import largeImage from '../assets/1.png';

const Contact = () => {
    return (
        <>
            <div id="nav-placeholder"></div>

            <h2>Contact Us</h2>
            <div class="content">
                <p>We are here to help and answer any questions you might have. We forward to hearing from you!</p>
                <div class="textbody">
                    <div class="info">
                        <div>
                            <img src={location} alt="location" width="40px"></img>
                            <p>Seattle, Washington</p> 
                        </div>
                        <div>
                            <img src={phone} alt="phone" width="40px"></img>
                            <p>+1 425 123 5678</p> 
                        </div>
                        <div>
                            <img src={mail} alt="mail" width="40px"></img>
                            <p>mentorMe@gmail.com</p> 
                        </div>
                    </div>
        
                    <div class="imgInfo">
                        <img src={largeImage} alt="image for people thinking" width="600px"></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;