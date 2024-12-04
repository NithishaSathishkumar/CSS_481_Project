import React, { useState, useEffect } from 'react';
import styles from '../Styling/ProfilePage.module.css';
import { useAuth } from '/AuthContext';
import { auth, db } from '/firebaseConfi';
import { ref, update } from "firebase/database"; 


function ProfilePage() {
  const { currentUser } = useAuth(); 
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('./assets/profile.png');
  const [previewImage, setPreviewImage] = useState(null);

  
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setName(currentUser.firstName || ''); 
      setUsername(currentUser.displayName || '');
      setEmail(currentUser.email || '');
      setProfileImage(currentUser.profileImage || './assets/profile.png');
    }
  }, [currentUser]);

  // Handle profile image changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show a preview
    }
  };

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const updatedProfile = {
        name,
        username,
        email,
        profileImage: previewImage || profileImage,
      };
  
      // Update the Realtime Database
      if (db && currentUser) {
        const userRef = ref(db, `users/${currentUser.uid}`);
        await update(userRef, updatedProfile);
  
        console.log('Profile updated:', updatedProfile);
        alert('Profile updated successfully!');
      } else {
        console.error('No user logged in or database not initialized.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  
  return (
    <div className={styles.pageContainer}>
      <form className={styles.editProfileForm} onSubmit={handleSubmit}>
        <div className={styles.profileImageContainer}>
          <img
            src={previewImage || profileImage}
            className={styles.profileImage}
            alt="Profile"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className={styles.profileField}>
          <label className={styles.fieldLabel}>Name:</label>
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
        <div className={styles.profileField}>
          <label className={styles.fieldLabel}>Email:</label>
          <input
            type="email"
            className={styles.fieldInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.saveButton}>Save Changes</button>
      </form>
    </div>
  );
}

export default ProfilePage;
