import { Link } from 'react-router-dom';  // import Link
import '../Styling/LandingPage.css';
import franInnocentiUnsplash from '../assets/franInnocentiUnsplash.jpg';

function LandingPage() {
  return (
    <div className="LandingPageRootContainer">
      <div className="LandingPageMainContent">
        <div className="LandingPageLeft">
          <h1 id="MentorMeLP">MentorMe</h1>
          <p id="MentorMeLPText">
            MentorMe is a tutoring platform offering accessible, affordable education.
            Students can connect with tutors and other students across subjects, with options
            for free or paid sessions, easy scheduling, and personalized profiles for flexible,
            anytime learning.
          </p>

          <div className="ButtonSection">
            <Link to="/login">
              <button id="LogInButton">Log In</button>
            </Link>

            <Link to="/CreateAccount">
              <button>Sign Up</button> 
            </Link>
            
          </div>
        </div>

        <div className="LandingPageRight">
          <img id="lpIMGOne" src={franInnocentiUnsplash} alt="franInnocentiUnsplash"/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
