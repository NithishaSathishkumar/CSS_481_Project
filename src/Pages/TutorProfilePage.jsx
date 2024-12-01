import React from "react";
import "../Styling/ProfilePage.css";
import "../Styling/tutorprofile.css";
import profileImg from "../assets/profile.png";
import instructor1Img from "../assets/instructor1.png";
import instructor2Img from "../assets/instructor2.png";
import instructor3Img from "../assets/instructor3.png";

const TutorProfilePage = () => {
  return (
    <div className="main-content">
      {/* Left Section */}
      <div className="profile-left">
        {/* Profile Info */}
        <div className="profile-info">
          <img
            src={profileImg}
            className="profile-image"
            alt="Tutor Profile"
          />
          <div className="profile-basic-info">
            <p className="profile-name">Daniel Jackson</p>
            <p className="profile-time">Local Time: 11:24 AM</p>
            <p className="profile-hourly-rate">Hourly Rate: $30</p>
            <p className="profile-rating">
              <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
            </p>
            <div className="profile-buttons">
              <button className="email-button">Send Email</button>
              <button className="schedule-button">Schedule</button>
            </div>
          </div>
          <button className="edit-button">Edit my Profile</button>
        </div>

        {/* Approved Qualifications */}
        <div className="profile-topics">
          <p className="profile-subjects">Approved Qualifications</p>
          <div className="subjects">
            <span
              className="subject"
              data-topics="Calculus I, Algebra, Geometry"
            >
              Mathematics
            </span>
            <span className="subject" data-topics="Physics, Chemistry, Biology">
              Science
            </span>
            <span
              className="subject"
              data-topics="Grammar, Literature, Composition"
            >
              English
            </span>
          </div>
        </div>

        {/* Education */}
        <div className="profile-education">
          <p className="education-title">Education</p>
          <ul className="education-info">
            <li className="education-item">
              <p>School: LinkedIn University</p>
            </li>
            <li className="education-item">
              <p>Degree: Bachelor of Science in Environment Science</p>
            </li>
            <li className="education-item">
              <p>Graduation Year: 2023</p>
            </li>
          </ul>
        </div>

        {/* Similar Tutors */}
        <div className="similar-tutors">
          <p className="similar-tutors-title">Similar Tutors</p>
          <div className="tutor-container">
            <div className="tutor-item">
              <a href="#tutor">
                <img
                  src={instructor1Img}
                  className="tutor-image"
                  alt="Tutor 1"
                />
                <p className="tutor-name">John Doe</p>
                <p className="tutor-rating">★★★★☆ (4.3)</p>
                <ul className="tutor-subjects">
                  <li>Mathematics</li>
                  <li>Science</li>
                  <li>English</li>
                </ul>
              </a>
            </div>

            <div className="tutor-item">
              <a href="#tutor">
                <img
                  src={instructor2Img}
                  className="tutor-image"
                  alt="Tutor 2"
                />
                <p className="tutor-name">Jane Smith</p>
                <p className="tutor-rating">★★★★★ (4.8)</p>
                <ul className="tutor-subjects">
                  <li>Physics</li>
                  <li>Chemistry</li>
                </ul>
              </a>
            </div>

            <div className="tutor-item">
              <a href="#tutor">
                <img
                  src={instructor3Img}
                  className="tutor-image"
                  alt="Tutor 3"
                />
                <p className="tutor-name">Alice Brown</p>
                <p className="tutor-rating">★★★☆☆ (3.7)</p>
                <ul className="tutor-subjects">
                  <li>Biology</li>
                  <li>Geography</li>
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="profile-right">
        {/* About Section */}
        <div className="profile-about">
          <p className="profile-about-title">About</p>
          <p className="about-body">
            My name is Daniel Jackson, and I am a dedicated tutor with a passion
            for teaching. I specialize in Mathematics, Science, and English,
            and I am always eager to help students understand and excel in these
            subjects. In my free time, I enjoy reading, solving puzzles, and
            staying updated with the latest educational techniques. My goal is
            to inspire and guide my students to achieve their academic potential
            and develop a love for learning.
          </p>
        </div>

        {/* Reviews Section */}
        <div className="previous-sessions">
          <p className="previous-sessions-title">Reviews</p>
          <div className="session-list">
            <div className="review-item">
              <div className="review-info">
                <img
                  className="student-image"
                  src={instructor1Img}
                  alt="Student"
                />
                <div className="reviewer-details">
                  <div className="name-and-rating">
                    <p className="reviewer-name">Jerry Smith</p>
                    <p className="student-rating">
                      <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                    </p>
                  </div>
                  <p className="review-date">9/21/21</p>
                  <p className="review-text">
                    Daniel was very helpful in explaining calculus concepts!
                  </p>
                </div>
              </div>
            </div>

            <div className="review-item">
              <div className="review-info">
                <img
                  className="student-image"
                  src={instructor1Img}
                  alt="Student"
                />
                <div className="reviewer-details">
                  <div className="name-and-rating">
                    <p className="reviewer-name">Sarah Lee</p>
                    <p className="student-rating">
                      <span>&#9733;&#9733;&#9733;&#9734;&#9734;</span>
                    </p>
                  </div>
                  <p className="review-date">8/12/21</p>
                  <p className="review-text">
                    Helped me understand physics concepts clearly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;