// TutorProfilePage.js

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; // Import useParams
import styles from "../Styling/tutorprofile.module.css";
import profileImg from "../assets/6.png"; // Default profile image
import { getDatabase, ref, onValue } from "firebase/database";
import app from "/firebaseConfi"; 

const TutorProfilePage = () => {
  const { tutorId } = useParams(); // Get tutorId from URL
  const [tutorData, setTutorData] = useState(null);
  const [similarTutors, setSimilarTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tutorId) return;

    const db = getDatabase(app);
    const tutorRef = ref(db, `tutors/${tutorId}`);

    onValue(tutorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTutorData(data);

        // Fetch all tutors to find similar ones
        const tutorsRef = ref(db, 'tutors');
        onValue(tutorsRef, (tutorsSnapshot) => {
          const tutorsData = tutorsSnapshot.val();
          const tutorsList = Object.entries(tutorsData).map(([id, tutor]) => ({
            id,
            ...tutor,
          }));

          // Filter similar tutors based on subjects
          const similar = tutorsList.filter((tutor) => {
            if (tutor.id === tutorId) return false; // Exclude current tutor
            if (!tutor.subjects || !data.subjects) return false;
            // Check if there is any common subject
            return tutor.subjects.some((subject) => data.subjects.includes(subject));
          });

          // Limit the number of similar tutors to 3
          setSimilarTutors(similar.slice(0, 3));
          setLoading(false);
        });
      } else {
        // Tutor not found
        setTutorData(null);
        setLoading(false);
      }
    });
  }, [tutorId]);

  const renderStars = (rating) => {
    const ratingNumber = parseFloat(rating) || 0;
    const fullStars = Math.round(ratingNumber);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tutorData) {
    return <div>Tutor not found.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Left Section */}
        <div className={styles.profileLeft}>
          {/* Profile Info */}
          <div className={styles.profileInfo}>
            <img
              src={tutorData.photo || profileImg}
              className={styles.profileImage}
              alt="Tutor Profile"
            />
            <div className={styles.profileBasicInfo}>
              <p className={styles.profileName}>
                {tutorData.firstName} {tutorData.lastName}
              </p>
              <p className={styles.profileTime}>Local Time: {tutorData.localTime}</p>
              <p className={styles.profileHourlyRate}>
                Hourly Rate: {tutorData.price === 'free' ? 'Free' : `$${tutorData.price}`}
              </p>
              <p className={styles.profileRating}>
                <span>{renderStars(tutorData.rating)}</span>
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
              {tutorData.subjects &&
                tutorData.subjects.map((subject, index) => (
                  <span key={index} className={styles.subject}>
                    {subject}
                  </span>
                ))}
            </div>
          </div>

          {/* Education */}
          <div className={styles.profileEducation}>
            <p className={styles.educationTitle}>Education</p>
            <ul className={styles.educationInfo}>
              <li className={styles.educationItem}>
                <p>School: {tutorData.education?.school || 'Not specified'}</p>
              </li>
              <li className={styles.educationItem}>
                <p>Degree: {tutorData.education?.degree || 'Not specified'}</p>
              </li>
              <li className={styles.educationItem}>
                <p>
                  Graduation Year: {tutorData.education?.graduationYear || 'Not specified'}
                </p>
              </li>
            </ul>
          </div>

          {/* Similar Tutors */}
          <div className={styles.similarTutors}>
            <p className={styles.similarTutorsTitle}>Similar Tutors</p>
            <div className={styles.tutorContainer}>
              {similarTutors.length > 0 ? (
                similarTutors.map((tutor, index) => (
                  <div className={styles.tutorItem} key={index}>
                    <a href={`/tutor/${tutor.id}`}>
                      <img
                        src={tutor.photo || profileImg}
                        className={styles.tutorImage}
                        alt={`Tutor ${index + 1}`}
                      />
                      <p className={styles.tutorName}>
                        {tutor.firstName} {tutor.lastName}
                      </p>
                      <p className={styles.tutorRating}>
                        {renderStars(tutor.rating)} ({tutor.rating})
                      </p>
                      <ul className={styles.tutorSubjects}>
                        {tutor.subjects &&
                          tutor.subjects.map((subject, idx) => (
                            <li key={idx}>{subject}</li>
                          ))}
                      </ul>
                    </a>
                  </div>
                ))
              ) : (
                <p>No similar tutors available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.profileRight}>
          {/* About Section */}
          <div className={styles.profileAbout}>
            <p className={styles.profileAboutTitle}>About</p>
            <p className={styles.aboutBody}>
              {tutorData.about || tutorData.description || 'No description available.'}
            </p>
          </div>

          {/* Reviews Section */}
          {/* Assuming you have reviews in your database; adjust accordingly */}
          <div className={styles.previousSessions}>
            <p className={styles.previousSessionsTitle}>Reviews</p>
            <div className={styles.sessionList}>
              {tutorData.reviews ? (
                tutorData.reviews.map((review, index) => (
                  <div className={styles.reviewItem} key={index}>
                    <div className={styles.reviewInfo}>
                      <img
                        className={styles.studentImage}
                        src={review.reviewerImage || profileImg}
                        alt="Student"
                      />
                      <div className={styles.reviewerDetails}>
                        <div className={styles.nameAndRating}>
                          <p className={styles.reviewerName}>{review.reviewerName}</p>
                          <p className={styles.studentRating}>
                            <span>{renderStars(review.rating)}</span>
                          </p>
                        </div>
                        <p className={styles.reviewDate}>{review.date}</p>
                        <p className={styles.reviewText}>{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;
