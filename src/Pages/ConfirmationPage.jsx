// Import custom styling and imgs
import '../Styling/ConfirmationPage.css';
import celebrationCorn from '../assets/13.png';
// import Link and location
import { Link, useLocation } from 'react-router-dom';
// import condetti to add the interactive element on the page
import ReactConfetti from 'react-confetti';
// import hook
import React, { useState, useEffect } from 'react';

function ConfirmationPage() {
    // Access location object to retrieve state (date and time of booking)
    const location = useLocation();
    const { date, time } = location.state || {}; // Get date and time from location state

    // Define state to store the current window dimensions
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    // Hook to handle window resizing and update dimensions state
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };


        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);
        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="ConfirmationBookingContainer">
            <ReactConfetti
                width={dimensions.width}
                height={dimensions.height}
                numberOfPieces={200}
                gravity={0.04}
                initialVelocityY={30}
                recycle={true}
                colors={['#FFD700', '#FFFFFF', '#BC6C25']}
            />

            <div className="ConfirmationBookingMainContent">
                <div className="LeftContainer">
                    <img className="celebration-right" src={celebrationCorn} ></img>
                </div>

                <div className="mid-part">
                    <h1>Your Booking was successful!</h1>
                    <h3>Thank You for Choosing Us!</h3>
                    {date && time ? (
                        <div className="date-time-choosen">
                            <p><strong>Date:</strong> {date}</p>
                            <p><strong>Time:</strong> {time}</p>
                        </div>
                    ) : (
                        <p>No booking details available. Please go back and select a date and time.</p>
                    )}

                    <Link to="/about">
                        <button className="button-cancle">Go to Home Page</button>
                    </Link>
                </div>

                <div className="RightContainer">
                    <img className="celebration-left" src={celebrationCorn} ></img>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPage // Export the ConfirmationPage component