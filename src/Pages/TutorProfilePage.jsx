import React from "react";
import styles from "../Styling/tutorprofile.module.css"; 
import profileImg from "../assets/6.png";
import instructor1Img from "../assets/6.png";
import instructor2Img from "../assets/6.png";
import instructor3Img from "../assets/6.png";

const TutorProfilePage = () => {
  return (
    <div className={styles.container}> 
      <div className={styles.mainContent}>
        {/* Left Section */}
        <div className={styles.profileLeft}>
          {/* Profile Info */}
          <div className={styles.profileInfo}>
            <img
              src={profileImg}
              className={styles.profileImage}
              alt="Tutor Profile"
            />
            <div className={styles.profileBasicInfo}>
              <p className={styles.profileName}>Daniel Jackson</p>
              <p className={styles.profileTime}>Local Time: 11:24 AM</p>
              <p className={styles.profileHourlyRate}>Hourly Rate: $30</p>
              <p className={styles.profileRating}>
                <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span> 
              </p>
              <div className={styles.profileButtons}>
                <button className={styles.emailButton}>Send Email</button>
                <button className={styles.scheduleButton}>Schedule</button>
              </div>
            </div>
            <button className={styles.editButton}>Edit my Profile</button>
          </div>

          {/* Approved Qualifications */}
          <div className={styles.profileTopics}>
            <p className={styles.profileSubjects}>Approved Qualifications</p>
            <div className={styles.subjects}>
              <span
                className={styles.subject}
                data-topics="Calculus I, Algebra, Geometry"
              >
                Mathematics
              </span>
              <span
                className={styles.subject}
                data-topics="Physics, Chemistry, Biology"
              >
                Science
              </span>
              <span
                className={styles.subject}
                data-topics="Grammar, Literature, Composition"
              >
                English
              </span>
            </div>
          </div>

          {/* Education */}
          <div className={styles.profileEducation}>
            <p className={styles.educationTitle}>Education</p>
            <ul className={styles.educationInfo}>
              <li className={styles.educationItem}>
                <p>School: LinkedIn University</p>
              </li>
              <li className={styles.educationItem}>
                <p>Degree: Bachelor of Science in Environment Science</p>
              </li>
              <li className={styles.educationItem}>
                <p>Graduation Year: 2023</p>
              </li>
            </ul>
          </div>

          {/* Similar Tutors */}
          <div className={styles.similarTutors}> 
            <p className={styles.similarTutorsTitle}>Similar Tutors</p>
            <div className={styles.tutorContainer}>
              <div className={styles.tutorItem}>
                <a href="#tutor">
                  <img
                    src={instructor1Img}
                    className={styles.tutorImage}
                    alt="Tutor 1"
                  />
                  <p className={styles.tutorName}>John Doe</p>
                  <p className={styles.tutorRating}>★★★★☆ (4.3)</p>
                  <ul className={styles.tutorSubjects}>
                    <li>Mathematics</li>
                    <li>Science</li>
                    <li>English</li>
                  </ul>
                </a>
              </div>

              <div className={styles.tutorItem}>
                <a href="#tutor">
                  <img
                    src={instructor2Img}
                    className={styles.tutorImage}
                    alt="Tutor 2"
                  />
                  <p className={styles.tutorName}>Jane Smith</p>
                  <p className={styles.tutorRating}>★★★★★ (4.8)</p>
                  <ul className={styles.tutorSubjects}>
                    <li>Physics</li>
                    <li>Chemistry</li>
                  </ul>
                </a>
              </div>

              <div className={styles.tutorItem}>
                <a href="#tutor">
                  <img
                    src={instructor3Img}
                    className={styles.tutorImage}
                    alt="Tutor 3"
                  />
                  <p className={styles.tutorName}>Alice Brown</p>
                  <p className={styles.tutorRating}>★★★☆☆ (3.7)</p>
                  <ul className={styles.tutorSubjects}>
                    <li>Biology</li>
                    <li>Geography</li>
                  </ul>
                </a>
              </div>
            </div>
          </div>
        </div> 

        {/* Right Section */}
        <div className={styles.profileRight}>
          {/* About Section */}
          <div className={styles.profileAbout}>
            <p className={styles.profileAboutTitle}>About</p>
            <p className={styles.aboutBody}>
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
          <div className={styles.previousSessions}> {/* Changed to "Reviews" */}
            <p className={styles.previousSessionsTitle}>Reviews</p> 
            <div className={styles.sessionList}> 
              <div className={styles.reviewItem}> {/* Changed to reviewItem */}
                <div className={styles.reviewInfo}> {/* Changed to reviewInfo */}
                  <img
                    className={styles.studentImage} 
                    src={instructor1Img}
                    alt="Student"
                  />
                  <div className={styles.reviewerDetails}> 
                    <div className={styles.nameAndRating}> 
                      <p className={styles.reviewerName}>Jerry Smith</p> 
                      <p className={styles.studentRating}> 
                        <span>&#9733;&#9733;&#9733;&#9733;&#9734;</span> 
                      </p>
                    </div>
                    <p className={styles.reviewDate}>9/21/21</p> 
                    <p className={styles.reviewText}>
                      Daniel was very helpful in explaining calculus concepts!
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.reviewItem}>
                <div className={styles.reviewInfo}>
                  <img
                    className={styles.studentImage}
                    src={instructor1Img}
                    alt="Student"
                  />
                  <div className={styles.reviewerDetails}>
                    <div className={styles.nameAndRating}>
                      <p className={styles.reviewerName}>Sarah Lee</p>
                      <p className={styles.studentRating}>
                        <span>&#9733;&#9733;&#9733;&#9734;&#9734;</span>
                      </p>
                    </div>
                    <p className={styles.reviewDate}>8/12/21</p>
                    <p className={styles.reviewText}>
                      Helped me understand physics concepts clearly.
                    </p>
                  </div>
                </div>
              </div>
              {/* ... more reviews ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;