// TutorProfilePage.js

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styles from "../Styling/tutorprofile.module.css";
import profileImg from "../assets/6.png";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import {app} from "/firebaseConfi"; 

const TutorProfilePage = () => {
  const { tutorId } = useParams();
  const [tutorData, setTutorData] = useState(null);
  const [similarTutors, setSimilarTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    reviewerName: '',
    rating: '',
    text: '',
  });

  useEffect(() => {
    if (!tutorId) return;

    const db = getDatabase(app);
    const tutorRef = ref(db, `tutors/${tutorId}`);

    onValue(tutorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {

        data.id = tutorId;
        // Convert reviews object to array and filter out empty reviews
        if (data.reviews) {
          const reviewsArray = Object.values(data.reviews);
          const validReviews = reviewsArray.filter(
            (review) => review.reviewerName || review.rating || review.text
          );
          data.reviews = validReviews;
        } else {
          data.reviews = [];
        }

        // Compute average rating from valid reviews
        if (data.reviews && data.reviews.length > 0) {
          const ratings = data.reviews.map((review) => parseFloat(review.rating));
          const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
          const averageRating = totalRating / ratings.length;

          // Round according to specified rules
          let roundedRating = Math.floor(averageRating);
          if (averageRating - roundedRating >= 0.5) {
            roundedRating += 1;
          }

          data.rating = roundedRating.toString();

          // Update rating in the database
          const tutorRatingRef = ref(db, `tutors/${tutorId}/rating`);
          set(tutorRatingRef, data.rating);
        } else {
          data.rating = '0';
          const tutorRatingRef = ref(db, `tutors/${tutorId}/rating`);
          set(tutorRatingRef, data.rating);
        }

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
            if (tutor.id === tutorId) return false;
            if (!tutor.subjects || !data.subjects) return false;
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
    const ratingNumber = parseInt(rating, 10) || 0;
    const fullStars = ratingNumber;
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  };

  const handleReviewInputChange = (event) => {
    const { name, value } = event.target;
    setReviewFormData({ ...reviewFormData, [name]: value });
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();

    const newReview = {
      reviewerName: reviewFormData.reviewerName,
      rating: reviewFormData.rating,
      text: reviewFormData.text,
      date: new Date().toISOString(),
      reviewerImage: '',
    };

    const db = getDatabase(app);
    const reviewsRef = ref(db, `tutors/${tutorId}/reviews`);

    push(reviewsRef, newReview)
      .then(() => {
        setReviewFormData({
          reviewerName: '',
          rating: '',
          text: '',
        });
        setShowReviewForm(false);
      })
      .catch((error) => {
        console.error('Error adding review:', error);
      });
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
                Hourly Rate: {tutorData.price === 'free' ? 'Free' : `$${tutorData.exactPrice}`}
              </p>
              <p className={styles.profileRating}>
                <span>{renderStars(tutorData.rating)}</span>
              </p>
              <div className={styles.profileButtons}>
                <a href={`mailto:${tutorData.email}`}> <button className={styles.emailButton} >Send Email</button> </a>
                
                <a href={`/booking/${tutorData.id}`}>
                  <button className={styles.scheduleButton}>Schedule a Meeting</button>
                </a>
              </div>
            </div>
            <button className={styles.editButton} onClick={() => setShowReviewForm(true)}>Add Review</button>
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
          <div className={styles.previousSessions}>
            <p className={styles.previousSessionsTitle}>Reviews</p>
            <div className={styles.sessionList}>
              {tutorData.reviews && tutorData.reviews.length > 0 ? (
                tutorData.reviews.map((review, index) => (
                  <div className={styles.reviewItem} key={index}>
                    {review.reviewerName || review.rating || review.text ? (
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
                          <p className={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</p>
                          <p className={styles.reviewText}>{review.text}</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className={styles.reviewFormContainer}>
              <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="reviewerName"
                    value={reviewFormData.reviewerName}
                    onChange={handleReviewInputChange}
                    required
                  />
                </label>
                <label>
                  Rating:
                  <select
                    name="rating"
                    value={reviewFormData.rating}
                    onChange={handleReviewInputChange}
                    required
                  >
                    <option value="">Select rating</option>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Terrible</option>
                  </select>
                </label>
                <label>
                  Review:
                  <textarea
                    name="text"
                    value={reviewFormData.text}
                    onChange={handleReviewInputChange}
                    required
                  />
                </label>
                <div className={styles.reviewFormButtons}>
                  <button type="submit">Submit Review</button>
                  <button type="button" onClick={() => setShowReviewForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default TutorProfilePage;
