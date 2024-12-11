import React from 'react';
import '../Styling/ContactUs.css'; // Optional: for component-specific styling

// IMPORTING PICTURES
import location from '../assets/2.png';
import phone from '../assets/3.png';
import mail from '../assets/4.png';
import largeImage from '../assets/1.png';

const ContactUs = () => {
    return (
        <>
            <div className="ContactUsRootContainer"> 
                <div className="ContactUsMainContent">
                    <h1 id="ContactUsTitle">Contact Us</h1>

                    <div className="ContactUsInfo">
                        <div>
                            <p>We are here to help answer any questions you might have.<br/>We look forward to hearing from you!</p>
                            <div className="IndContent">
                                <a href = "https://www.google.com/maps/place/University+of+Washington+Bothell/@47.7584797,-122.1934659,17z/data=!3m1!4b1!4m6!3m5!1s0x54900e60912da1e3:0xc3c813c4de1b50de!8m2!3d47.7584761!4d-122.190891!16zL20vMDZqbHJz?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D" target="_blank"><img src={location} alt="location" width="40px"></img></a>
                                <p>17927 113th Ave NE<br/>
                                    Bothell, WA 98011<br/>
                                    United States of America</p>
                            </div>

                            <div className="IndContent">
                                <img src={phone} alt="phone" width="40px" height="40px"></img>
                                <p>(425)-123-5678</p> 
                            </div>

                            <div className="IndContent">
                                <a href = "mailto:mentorme@gmail.com?subject=Questions%20for%20MentorMe&body=Hi%20MentorMe%20Team,%0A%0AI%20have%20the%20following%20questions:" target="_blank"><img src={mail} alt="mail" width="40px"></img></a>
                                <p>mentorMe@gmail.com</p> 
                            </div>
                        </div>

                        <div class="imgInfo">
                            <img src={largeImage} alt="image for people thinking" width="600px"></img>
                        </div>       
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs;