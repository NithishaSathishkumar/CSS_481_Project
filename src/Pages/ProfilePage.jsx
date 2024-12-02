import React from "react";
import "../Styling/ProfilePage.css"; // Updated CSS file
import profileImg from "../assets/profile.png";
import instructor1Img from "../assets/instructor1.png";
import instructor2Img from "../assets/instructor2.png";
import instructor4Img from "../assets/instructor4.png";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="main-content">
        {/* Left Section */}
        <div className="profile-left">
          {/* Profile Info */}
          <div className="profile-info">
            <img src={profileImg} className="profile-image" alt="Profile" />
            <div className="profile-basic-info">
              <p className="profile-name">Daniel Jackson</p>
              <p className="profile-time">Local Time: 11:24 AM</p>
              <button className="email-button">Send Email</button>
            </div>
            <button className="edit-button">Edit my Profile</button>
          </div>

          {/* Profile Topics */}
          <div className="profile-topics">
            <p className="profile-subjects">Primary Subjects</p>
            <div className="subjects">
              <span className="subject">Mathematics</span>
              <span className="subject">Science</span>
              <span className="subject">English</span>
            </div>
          </div>

          {/* Education Section */}
          <div className="profile-education">
            <p className="education-title">Education</p>
            <ul className="education-info">
              <li className="education-item">School: LinkedIn University</li>
              <li className="education-item">
                Degree: Bachelor of Science in Environmental Science
              </li>
              <li className="education-item">Graduation Year: 2023</li>
            </ul>
          </div>

          {/* Goals Section */}
          <div className="profile-goals">
            <p className="goals-title">Goals</p>
            <ul className="goals-info">
              <li className="goals-item">Improve my Math skills</li>
              <li className="goals-item">Pursue a career in engineering</li>
              <li className="goals-item">Improve in speaking</li>
              <li className="goals-item">Understand the quadratic formula</li>
              <li className="goals-item">Improve my writing skills</li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="profile-right">
          {/* About Section */}
          <div className="profile-about">
            <p className="profile-about-title">About</p>
            <p className="about-body">
              My name is Daniel Jackson, and I am a dedicated student with a
              passion for learning. I excel in Mathematics, Science, and
              English, and I am always eager to explore new subjects. In my free
              time, I enjoy reading, solving puzzles, and participating in
              science fairs. My goal is to pursue a career in engineering and
              make a positive impact on the world.
            </p>
          </div>

          {/* Previous Sessions */}
          <div className="previous-sessions">
            <p className="previous-sessions-title">Previous Sessions</p>
            <div className="session-list">
              {/* Session 1 */}
              <div className="profile-session-item">
                <div className="session-info">
                  <img
                    className="instructor-image"
                    src={instructor1Img}
                    alt="Instructor 1"
                  />
                  <div className="session-details">
                    <p className="instructor-name">Instructor: John Smith</p>
                    <p className="instructor-rating">
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                      <span>&#9734;</span>
                    </p>
                    <p className="session-date">Date: 09/12/2021</p>
                  </div>
                </div>
              </div>

              {/* Session 2 */}
              <div className="profile-session-item">
                <div className="session-info">
                  <img
                    className="instructor-image"
                    src={instructor2Img}
                    alt="Instructor 2"
                  />
                  <div className="session-details">
                    <p className="instructor-name">Instructor: Emily Davis</p>
                    <p className="instructor-rating">
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                      <span>&#9734;</span>
                      <span>&#9734;</span>
                    </p>
                    <p className="session-date">Date: 08/22/2021</p>
                  </div>
                </div>
              </div>

              {/* Session 3 */}
              <div className="profile-session-item">
                <div className="session-info">
                  <img
                    className="instructor-image"
                    src={instructor4Img}
                    alt="Instructor 3"
                  />
                  <div className="session-details">
                    <p className="instructor-name">Instructor: Sarah Johnson</p>
                    <p className="instructor-rating">
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                      <span>&#9734;</span>
                      <span>&#9734;</span>
                    </p>
                    <p className="session-date">Date: 06/18/2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
