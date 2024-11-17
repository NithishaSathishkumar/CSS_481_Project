import '../Styling/LandingPage.css';
import '../Styling/index.css';
import franInnocentiUnsplash from '../assets/franInnocentiUnsplash.jpg';

function LandingPage() {
  return (
    <div className="LandingPageRootContainer">
      <div className="LandingPageMainContent">
        <div className="LandingPageLeft">
          <h1>MentorMe</h1>
          <p>
            MentorMe is a tutoring platform offering accessible, affordable education.
            Students can connect with tutors and other students across subjects, with options
            for free or paid sessions, easy scheduling, and personalized profiles for flexible,
            anytime learning.
          </p>

          <div className="ButtonSection">
            <button id="LogInButton">Log In</button>

            <button>Sign Up</button> 
          </div>
        </div>

        <div className="LandingPageRight">
          <img id="lpIMGOne" src={franInnocentiUnsplash} alt="franInnocentiUnsplash"/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage