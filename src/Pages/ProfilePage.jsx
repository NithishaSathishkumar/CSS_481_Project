import React from 'react';
import styles from '../Styling/ProfilePage.module.css'; 

function ProfilePage() {
  return (

  <div className = {styles.pageContainer}>
    <div className={styles.mainContent}> 
      <div className={styles.profileLeft}>
        <div className={styles.profileInfo}>
          <img src="./assets/profile.png" className={styles.profileImage} alt="Profile" />
          <div className={styles.profileBasicInfo}>
            <p className={styles.profileName}>Daniel Jackson</p>
            <p className={styles.profileTime}>Local Time: 11:24 AM</p>
            <button className={styles.emailButton}>Send Email</button>
          </div>
          <button className={styles.editButton}>Edit my Profile</button>
        </div>

        <div className={styles.profileTopics}>
          <p className={styles.profileSubjects}>Primary Subjects</p>
          <div className={styles.subjects}>
            <span className={styles.subject}>Mathematics</span>
            <span className={styles.subject}>Science</span>
            <span className={styles.subject}>English</span>
          </div>
        </div>

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

        <div className={styles.profileGoals}>
          <p className={styles.goalsTitle}>Goals</p>
          <ul className={styles.goalsInfo}>
            <li className={styles.goalsItem}>Improve my Math skills</li>
            <li className={styles.goalsItem}>Pursue a career in engineering</li>
            <li className={styles.goalsItem}>Improve in speaking</li>
            <li className={styles.goalsItem}>Understand the quadratic formula</li>
            <li className={styles.goalsItem}>Improve my writing skills</li>
          </ul>
        </div>
      </div>

      <div className={styles.profileRight}>
        <div className={styles.profileAbout}>
          <p className={styles.profileAboutTitle}>About</p>
          <p className={styles.aboutBody}>
            My name is Daniel Jackson, and I am a dedicated student with a passion for learning. 
            I excel in Mathematics, Science, and English, and I am always eager to explore new subjects. 
            In my free time, I enjoy reading, solving puzzles, and participating in science fairs. 
            My goal is to pursue a career in engineering and make a positive impact on the world.
          </p>
        </div>

        <div className={styles.previousSessions}>
          <p className={styles.previousSessionsTitle}>Previous Sessions</p>
          <div className={styles.sessionList}>
            <div className={styles.profileSessionItem}>
              <div className={styles.sessionInfo}>
                <img className={styles.instructorImage} src="./assets/instructor1.png" alt="Instructor 1" />
                <div className={styles.sessionDetails}>
                  <p className={styles.instructorName}>Instructor: John Smith</p>
                  <p className={styles.instructorRating}>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9734;</span>
                  </p>
                  <p className={styles.sessionDate}>Date: 09/12/2021</p>
                </div>
              </div>
            </div>

            <div className={styles.profileSessionItem}>
              <div className={styles.sessionInfo}>
                <img className={styles.instructorImage} src="./assets/instructor2.png" alt="Instructor 2" />
                <div className={styles.sessionDetails}>
                  <p className={styles.instructorName}>Instructor: Emily Davis</p>
                  <p className={styles.instructorRating}>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9734;</span>
                    <span>&#9734;</span>
                  </p>
                  <p className={styles.sessionDate}>Date: 08/22/2021</p>
                </div>
              </div>
            </div>

            <div className={styles.profileSessionItem}>
              <div className={styles.sessionInfo}>
                <img className={styles.instructorImage} src="./assets/instructor4.png" alt="Instructor 3" />
                <div className={styles.sessionDetails}>
                  <p className={styles.instructorName}>Instructor: Sarah Johnson</p>
                  <p className={styles.instructorRating}>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9734;</span>
                    <span>&#9734;</span>
                  </p>
                  <p className={styles.sessionDate}>Date: 06/18/2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProfilePage;