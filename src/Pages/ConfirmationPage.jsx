import '../Styling/ConfirmationPage.css';
import balloon from '../assets/15.png';
import celebrationCorn from '../assets/13.png';
import { Link, useLocation } from 'react-router-dom';  // import Link
import ReactConfetti from 'react-confetti';
import React, { useState, useEffect } from 'react';

function ConfirmationPage() {
    const location = useLocation();
    const { date, time } = location.state || {}; // Destructure state to get date and time


    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      useEffect(() => {
        const handleResize = () => {
          setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        };
    
        window.addEventListener('resize', handleResize);
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
                    {/* <img className="balloon-left" src={balloon} ></img> */}
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
                    {/* <img className="balloon-right" src={balloon} ></img> */}
                    <img className="celebration-left" src={celebrationCorn} ></img>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPage