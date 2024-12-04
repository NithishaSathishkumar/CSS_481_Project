import React, { useState, useEffect } from 'react';
import styles from '../Styling/ProfilePage.module.css';
import { useAuth } from '/AuthContext';
import { auth, db } from '/firebaseConfi'; // Assuming firebase auth is properly initialized
import { ref, get, update } from "firebase/database";
import { updateProfile } from "firebase/auth";

function ProfilePage() {
  const { currentUser } = useAuth(); // Get the current user from AuthContext
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  // Fetch the first name from the database
  useEffect(() => {
    const fetchFirstName = async () => {
      if (currentUser) {
        try {
          const userRef = ref(db, 'account');
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const users = snapshot.val();
            const userEntry = Object.values(users).find(
              (user) => user.uid === currentUser.uid
            );

            if (userEntry) {
              setName(userEntry.firstName || '');
            } else {
              console.error('User data not found in the database');
            }
          } else {
            console.error('No data available in the database');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchFirstName();

    // Populate other fields from Firebase Authentication
    if (currentUser) {
      setUsername(currentUser.displayName || '');
    }
  }, [currentUser]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update Firebase Authentication profile
      if (auth && currentUser) {
        await updateProfile(currentUser, { displayName: username });
      }

      // Update the Realtime Database
      if (db && currentUser) {
        const userRef = ref(db, `account/${currentUser.uid}`);
        await update(userRef, { firstName: name });
      }

      console.log('Profile updated successfully!');
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form className={styles.editProfileForm} onSubmit={handleSubmit}>
        <div className={styles.profileField}>
          <label className={styles.fieldLabel}>First Name:</label>
          <input
            type="text"
            className={styles.fieldInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.profileField}>
          <label className={styles.fieldLabel}>Username:</label>
          <input
            type="text"
            className={styles.fieldInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.saveButton}>Save Changes</button>
      </form>
    </div>
  );
}

export default ProfilePage;
